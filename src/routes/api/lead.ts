import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const LeadSchema = z.object({
  business: z.string().min(1).max(80),
  need: z.string().min(1).max(80),
  hasWebsite: z.string().min(1).max(120),
  goal: z.string().min(1).max(600),
  timing: z.string().min(1).max(80),
  name: z.string().min(1).max(80),
  email: z.string().email().max(160),
});

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "unknown";
        if (rateLimited(ip)) {
          return Response.json({ error: "rate_limited" }, { status: 429 });
        }

        let lead: z.infer<typeof LeadSchema>;
        try {
          lead = LeadSchema.parse(await request.json());
        } catch {
          return Response.json({ error: "invalid_request" }, { status: 400 });
        }

        const to = process.env["LEAD_EMAIL"];
        const resendKey = process.env["RESEND_API_KEY"];

        const text = [
          "Nuova richiesta di progetto da Shamyo AI",
          "",
          `Attività: ${lead.business}`,
          `Servizio: ${lead.need}`,
          `Sito web: ${lead.hasWebsite}`,
          `Obiettivo: ${lead.goal}`,
          `Tempistica: ${lead.timing}`,
          `Nome: ${lead.name}`,
          `Email: ${lead.email}`,
        ].join("\n");

        if (!resendKey || !to) {
          // Email provider not configured yet: keep the lead in server logs so
          // nothing is lost, and confirm to the visitor.
          console.warn("[shamyo-ai] lead received (email provider not configured)\n" + text);
          return Response.json({ ok: true, delivered: false });
        }

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              authorization: `Bearer ${resendKey}`,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              from: process.env["LEAD_FROM_EMAIL"] ?? "Shamyo AI <onboarding@resend.dev>",
              to: [to],
              reply_to: lead.email,
              subject: `Nuovo progetto: ${lead.need} — ${lead.name}`,
              text,
            }),
          });
          if (!res.ok) {
            console.error("[shamyo-ai] resend error", res.status, await res.text().catch(() => ""));
            console.warn("[shamyo-ai] lead fallback log\n" + text);
            return Response.json({ ok: true, delivered: false });
          }
        } catch (error) {
          console.error("[shamyo-ai] lead send failed", error);
          console.warn("[shamyo-ai] lead fallback log\n" + text);
          return Response.json({ ok: true, delivered: false });
        }

        return Response.json({ ok: true, delivered: true });
      },
    },
  },
});
