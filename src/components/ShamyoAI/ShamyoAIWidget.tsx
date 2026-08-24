import { useCallback, useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, RotateCcw } from "lucide-react";

import { ChatMessage, TypingIndicator, type ChatMessageData } from "./ChatMessage";
import {
  QuickActions,
  INITIAL_ACTIONS,
  EMPTY_STATE_ACTIONS,
  getSuggestions,
  type QuickAction,
} from "./QuickActions";
import { LEAD_STEPS, LEAD_INTRO, LEAD_SUCCESS, LEAD_ERROR, type LeadField } from "./leadFlow";
import { trackChatEvent } from "./analytics";

const WELCOME =
  "Ciao! Sono Shamyo AI, l'assistente di Shamyo Singh — Copywriter & SEO Specialist.\n\nPosso spiegarti i servizi, il metodo di lavoro o aiutarti a impostare il tuo progetto. Da dove vuoi partire?";

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

export function ShamyoAIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [actions, setActions] = useState<QuickAction[]>(INITIAL_ACTIONS);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [turn, setTurn] = useState(0);
  const [leadStep, setLeadStep] = useState<number | null>(null);
  const leadData = useRef<Partial<Record<LeadField, string>>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const push = useCallback((message: Omit<ChatMessageData, "id">) => {
    setMessages((prev) => [...prev, { id: nextId(), ...message }]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, leadStep]);

  useEffect(() => {
    if (open && messages.length === 0) {
      push({ role: "assistant", content: WELCOME });
      trackChatEvent("chatbot_open");
    }
  }, [open, messages.length, push]);

  const askAI = useCallback(
    async (history: ChatMessageData[]) => {
      setLoading(true);
      const assistantId = nextId();
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: history
              .filter((m) => m.content.trim().length > 0)
              .slice(-20)
              .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) })),
          }),
        });

        if (!response.ok || !response.body) {
          const fallback =
            response.status === 429
              ? "Stai scrivendo un po' troppo veloce: attendi qualche secondo e riprova."
              : "Ho un problema tecnico momentaneo. Puoi riprovare tra poco o scrivere a Shamyo da /contatti.";
          setLoading(false);
          push({ role: "assistant", content: fallback });
          return;
        }

        setLoading(false);
        setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let text = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: text } : m)),
          );
        }
        if (!text.trim()) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      "Non ho una risposta utile su questo. Per un confronto diretto puoi scrivere a Shamyo da /contatti.",
                  }
                : m,
            ),
          );
        }
      } catch {
        setLoading(false);
        push({
          role: "assistant",
          content:
            "Connessione interrotta. Riprova tra poco oppure scrivi a Shamyo dalla pagina /contatti.",
        });
      } finally {
        setTurn((t) => t + 1);
      }
    },
    [push],
  );

  const startLead = useCallback(() => {
    leadData.current = {};
    setActions([]);
    setLeadStep(0);
    push({ role: "assistant", content: `${LEAD_INTRO}\n\n${LEAD_STEPS[0].question}` });
    trackChatEvent("chatbot_lead_started");
  }, [push]);

  const submitLead = useCallback(
    async (data: Record<string, string>) => {
      setLoading(true);
      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
        setLoading(false);
        if (!response.ok) {
          push({ role: "assistant", content: LEAD_ERROR });
          return;
        }
        push({
          role: "assistant",
          content: LEAD_SUCCESS,
          link: { to: "/contatti", label: "Vai ai contatti" },
        });
        trackChatEvent("chatbot_lead_submitted");
      } catch {
        setLoading(false);
        push({ role: "assistant", content: LEAD_ERROR });
      } finally {
        setActions(getSuggestions(turn));
      }
    },
    [push, turn],
  );

  const handleLeadAnswer = useCallback(
    (value: string) => {
      const step = leadStep ?? 0;
      const current = LEAD_STEPS[step];
      const error = current.validate?.(value);
      push({ role: "user", content: value });
      if (error) {
        push({ role: "assistant", content: `${error}\n\n${current.question}` });
        return;
      }
      leadData.current[current.field] = value.trim();
      const next = step + 1;
      if (next < LEAD_STEPS.length) {
        setLeadStep(next);
        push({ role: "assistant", content: LEAD_STEPS[next].question });
        return;
      }
      setLeadStep(null);
      void submitLead(leadData.current as Record<string, string>);
    },
    [leadStep, push, submitLead],
  );

  const sendText = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || loading) return;
      if (leadStep !== null) {
        handleLeadAnswer(value);
        return;
      }
      trackChatEvent("chatbot_message");
      const userMessage: ChatMessageData = { id: nextId(), role: "user", content: value };
      const history = [...messages, userMessage];
      setMessages(history);
      setActions(getSuggestions(turn + 1));
      void askAI(history);
    },
    [askAI, handleLeadAnswer, leadStep, loading, messages, turn],
  );

  const handleAction = useCallback(
    (action: QuickAction) => {
      if (action.startLead) {
        push({ role: "user", content: action.say ?? action.label });
        startLead();
        return;
      }
      if (action.reply) {
        trackChatEvent("chatbot_service_click", { label: action.label });
        push({ role: "user", content: action.say ?? action.label });
        push({ role: "assistant", content: action.reply, link: action.link });
        setActions(action.next ?? getSuggestions(turn + 1));
        setTurn((t) => t + 1);
        return;
      }
      sendText(action.say ?? action.label);
    },
    [push, sendText, startLead, turn],
  );

  const reset = () => {
    setMessages([]);
    setActions(INITIAL_ACTIONS);
    setLeadStep(null);
    setInput("");
    leadData.current = {};
    setTurn(0);
  };

  const leadOptions: QuickAction[] =
    leadStep !== null
      ? (LEAD_STEPS[leadStep].options ?? []).map((option) => ({ label: option }))
      : [];

  const visibleActions = leadStep !== null ? leadOptions : messages.length <= 1 ? (actions.length ? actions : EMPTY_STATE_ACTIONS) : actions;

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Chiudi Shamyo AI" : "Apri Shamyo AI, assistente virtuale"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Shamyo AI"
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(78vh,640px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[400px]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
            <div>
              <p className="font-heading text-lg leading-none text-foreground">Shamyo AI</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Assistente di Shamyo Singh · Copywriting & SEO
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={reset}
                aria-label="Ricomincia la conversazione"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi la chat"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading ? <TypingIndicator /> : null}
          </div>

          <div className="space-y-3 border-t border-border/70 px-4 py-3">
            <QuickActions actions={visibleActions} onSelect={handleAction} disabled={loading} />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendText(input);
                setInput("");
                inputRef.current?.focus();
              }}
              className="flex items-end gap-2"
            >
              <label htmlFor="shamyo-ai-input" className="sr-only">
                Scrivi un messaggio a Shamyo AI
              </label>
              <textarea
                id="shamyo-ai-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={1200}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendText(input);
                    setInput("");
                  }
                }}
                placeholder={
                  leadStep !== null ? LEAD_STEPS[leadStep].placeholder : "Scrivi un messaggio…"
                }
                className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand"
              />
              <button
                type="submit"
                disabled={loading || input.trim().length === 0}
                aria-label="Invia messaggio"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Shamyo AI è un assistente virtuale: può commettere errori e non sostituisce Shamyo.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
