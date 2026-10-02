import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { SYSTEM_PROMPT } from "@/data/shamyoKnowledge";

const MAX_MESSAGE_LENGTH = 1200;
const MAX_MESSAGES_PER_SESSION = 40;
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;

const BodySchema = z.object({
  lang: z.enum(["it", "en"]).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(MAX_MESSAGE_LENGTH),
      }),
    )
    .min(1)
    .max(MAX_MESSAGES_PER_SESSION),
});

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "unknown";

        if (rateLimited(ip)) {
          return new Response(JSON.stringify({ error: "rate_limited" }), {
            status: 429,
            headers: { "content-type": "application/json" },
          });
        }

        let parsed: z.infer<typeof BodySchema>;
        try {
          parsed = BodySchema.parse(await request.json());
        } catch {
          return new Response(JSON.stringify({ error: "invalid_request" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          console.error("[shamyo-ai] Missing LOVABLE_API_KEY");
          return new Response(JSON.stringify({ error: "unavailable" }), {
            status: 503,
            headers: { "content-type": "application/json" },
          });
        }

        const input = parsed.messages.slice(-20).map((m) => ({
          role: m.role,
          content: [
            {
              type: m.role === "assistant" ? "output_text" : "input_text",
              text: m.content,
            },
          ],
        }));

        let upstream: Response;
        try {
          upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              model: "openai/gpt-5.6-sol",
              instructions: `${SYSTEM_PROMPT}\n\nThe site language currently selected is ${parsed.lang === "en" ? "English" : "Italian"}: reply in that language unless the user writes in another one.`,
              input,
              stream: true,
            }),
          });
        } catch (error) {
          console.error("[shamyo-ai] gateway fetch failed", error);
          return new Response(JSON.stringify({ error: "unavailable" }), {
            status: 502,
            headers: { "content-type": "application/json" },
          });
        }

        if (!upstream.ok || !upstream.body) {
          const detail = await upstream.text().catch(() => "");
          console.error("[shamyo-ai] gateway error", upstream.status, detail);
          return new Response(JSON.stringify({ error: "unavailable" }), {
            status: upstream.status === 429 ? 429 : 502,
            headers: { "content-type": "application/json" },
          });
        }

        // Re-emit only the assistant text deltas as a plain text stream.
        const stream = new ReadableStream<Uint8Array>({
          async start(controller) {
            const reader = upstream.body!.getReader();
            const decoder = new TextDecoder();
            const encoder = new TextEncoder();
            let buffer = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";
                for (const line of lines) {
                  if (!line.startsWith("data:")) continue;
                  const payload = line.slice(5).trim();
                  if (!payload || payload === "[DONE]") continue;
                  try {
                    const event = JSON.parse(payload) as {
                      type?: string;
                      delta?: string;
                    };
                    if (event.type === "response.output_text.delta" && event.delta) {
                      controller.enqueue(encoder.encode(event.delta));
                    }
                  } catch {
                    // ignore malformed SSE chunk
                  }
                }
              }
            } catch (error) {
              console.error("[shamyo-ai] stream error", error);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store",
            "x-robots-tag": "noindex",
          },
        });
      },
    },
  },
});
