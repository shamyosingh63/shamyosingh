import { Link } from "@tanstack/react-router";

import { SITE_ROUTES } from "@/data/shamyoKnowledge";
import type { ChatLink } from "./QuickActions";

export type ChatRole = "user" | "assistant";

export type ChatMessageData = {
  id: string;
  role: ChatRole;
  content: string;
  /** Link interni suggeriti (route reali del sito). */
  links?: ChatLink[];
};

const KNOWN_PATHS = Object.values(SITE_ROUTES) as string[];

/** Rende i path interni citati dall'AI come link cliccabili. */
function renderContent(content: string) {
  const parts = content.split(/(\/(?:about|servizi|pacchetti|copy-check|portfolio|blog|contatti)\b)/g);
  return parts.map((part, i) =>
    KNOWN_PATHS.includes(part) ? (
      <Link key={i} to={part} className="font-medium text-brand underline underline-offset-2">
        {part}
      </Link>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? "bg-brand text-brand-foreground" : "border border-border/60 bg-card text-foreground"
        }`}
      >
        {isUser ? message.content : renderContent(message.content)}
        {!isUser && message.links?.length ? (
          <div className="mt-3 flex flex-col gap-1.5">
            {message.links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                search={l.search as never}
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand hover:underline"
              >
                {l.label} <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="…">
      <div className="flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
