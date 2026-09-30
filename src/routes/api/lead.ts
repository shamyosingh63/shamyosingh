import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const opt = (max: number) => z.string().trim().max(max).optional().default("");

const LeadSchema = z.object({
  kind: z.enum(["quote", "copy_check", "chat"]),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(160),
  website: opt(200),
  company: opt(120),
  service: opt(80),
  package: opt(40),
  description: opt(2000),
  goal: opt(600),
  language: opt(20),
  preferredDate: opt(20),
  preferredTime: opt(10),
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

const KIND_LABEL = {
  quote: "Richiesta di preventivo",
  copy_check: "Richiesta 15-Minute Copy Check (da confermare)",
  chat: "Richiesta da Shamyo AI",
} as const;

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

        const rows: [string, string][] = [
          ["Nome", lead.name],
          ["Email", lead.email],
          ["Sito web", lead.website],
          ["Azienda / Brand", lead.company],
          ["Servizio", lead.service],
          ["Pacchetto", lead.package],
          ["Descrizione", lead.description],
          ["Obiettivo", lead.goal],
          ["Lingua preferita", lead.language],
          ["Data preferita", lead.preferredDate],
          ["Ora preferita", lead.preferredTime],
        ];
        const text = [KIND_LABEL[lead.kind], "", ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join("\n");

        if (!resendKey || !to) {
          console.warn("[lead] received (email provider not configured)\n" + text);
          return Response.json({ ok: true, delivered: false });
        }

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
            body: JSON.stringify({
              from: process.env["LEAD_FROM_EMAIL"] ?? "Shamyo Singh <onboarding@resend.dev>",
              to: [to],
              reply_to: lead.email,
              subject: `${KIND_LABEL[lead.kind]} — ${lead.name}`,
              text,
            }),
          });
          if (!res.ok) {
            console.error("[lead] resend error", res.status, await res.text().catch(() => ""));
            console.warn("[lead] fallback log\n" + text);
            return Response.json({ ok: true, delivered: false });
          }
        } catch (error) {
          console.error("[lead] send failed", error);
          console.warn("[lead] fallback log\n" + text);
          return Response.json({ ok: true, delivered: false });
        }

        return Response.json({ ok: true, delivered: true });
      },
    },
  },
});
