import { useCallback, useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, RotateCcw } from "lucide-react";

import { ChatMessage, TypingIndicator, type ChatMessageData } from "./ChatMessage";
import {
  QuickActions,
  CHAT_COPY,
  QUESTIONS,
  buildRecommendation,
  initialActions,
  followUpActions,
  type QuickAction,
} from "./QuickActions";
import { trackChatEvent } from "./analytics";
import { useLang, type Lang } from "@/lib/i18n";

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

export function ShamyoAIWidget() {
  const { lang: siteLang } = useLang();
  const [lang, setLang] = useState<Lang>(siteLang);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [actions, setActions] = useState<QuickAction[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [qStep, setQStep] = useState<number | null>(null);
  const answers = useRef<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const c = CHAT_COPY[lang];

  useEffect(() => setLang(siteLang), [siteLang]);

  const push = useCallback((m: Omit<ChatMessageData, "id">) => {
    setMessages((prev) => [...prev, { id: nextId(), ...m }]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, qStep]);

  useEffect(() => {
    if (open && messages.length === 0) {
      push({ role: "assistant", content: CHAT_COPY[lang].welcome });
      setActions(initialActions(lang));
      trackChatEvent("chatbot_open");
    }
  }, [open, messages.length, push, lang]);

  const askAI = useCallback(
    async (history: ChatMessageData[]) => {
      setLoading(true);
      const assistantId = nextId();
      const cc = CHAT_COPY[lang];
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            lang,
            messages: history
              .filter((m) => m.content.trim().length > 0)
              .slice(-20)
              .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) })),
          }),
        });
        if (!response.ok || !response.body) {
          setLoading(false);
          push({ role: "assistant", content: response.status === 429 ? cc.rate : cc.error });
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
          setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: text } : m)));
        }
        if (!text.trim()) {
          setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: cc.empty } : m)));
        }
      } catch {
        setLoading(false);
        push({ role: "assistant", content: cc.error });
      }
    },
    [push, lang],
  );

  const askQuestion = useCallback(
    (step: number, intro?: string) => {
      const q = QUESTIONS[lang][step];
      setQStep(step);
      push({ role: "assistant", content: intro ? `${intro}\n\n${q.q}` : q.q });
      setActions(q.options.map(([value, label]) => ({ label, value })));
    },
    [lang, push],
  );

  const handleAction = useCallback(
    (action: QuickAction) => {
      if (!(qStep !== null && action.value) && !action.startQualify && !action.reply) {
        sendTextRef.current(action.say ?? action.label);
        return;
      }
      push({ role: "user", content: action.say ?? action.label });
      if (qStep !== null && action.value) {
        answers.current[qStep] = action.value;
        const next = qStep + 1;
        if (next < QUESTIONS[lang].length) {
          askQuestion(next);
        } else {
          setQStep(null);
          const rec = buildRecommendation(lang, answers.current);
          push({ role: "assistant", content: rec.content, links: rec.links });
          setActions(followUpActions(lang));
          trackChatEvent("chatbot_lead_started");
        }
        return;
      }
      if (action.startQualify) {
        answers.current = [];
        askQuestion(0, CHAT_COPY[lang].qIntro);
        return;
      }
      if (action.reply) {
        push({ role: "assistant", content: action.reply, links: action.links });
        setActions(followUpActions(lang));
        return;
      }
    },
    [askQuestion, lang, push, qStep],
  );

  const sendText = (text: string) => {
    const value = text.trim();
    if (!value || loading) return;
    setQStep(null);
    trackChatEvent("chatbot_message");
    const userMessage: ChatMessageData = { id: nextId(), role: "user", content: value };
    const history = [...messages, userMessage];
    setMessages(history);
    setActions(followUpActions(lang));
    void askAI(history);
  };

  const sendTextRef = useRef(sendText);
  sendTextRef.current = sendText;

  const reset = (nextLang: Lang = lang) => {
    setMessages([]);
    setQStep(null);
    setInput("");
    answers.current = [];
    setLang(nextLang);
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? c.close : c.open}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={c.title}
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(78vh,640px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[400px]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-heading text-lg leading-none text-foreground">{c.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              <div role="group" aria-label="Lingua / Language" className="flex text-[11px] font-semibold">
                {(["it", "en"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={lang === l}
                    onClick={() => lang !== l && reset(l)}
                    className={`rounded px-1.5 py-1 uppercase ${lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => reset()} aria-label={c.reset} className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label={c.close} className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {loading ? <TypingIndicator /> : null}
          </div>

          <div className="space-y-3 border-t border-border/70 px-4 py-3">
            <QuickActions actions={actions} onSelect={handleAction} disabled={loading} />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendText(input);
                setInput("");
                inputRef.current?.focus();
              }}
              className="flex items-end gap-2"
            >
              <label htmlFor="shamyo-ai-input" className="sr-only">{c.inputLabel}</label>
              <textarea
                id="shamyo-ai-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={1200}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendText(input);
                    setInput("");
                  }
                }}
                placeholder={c.placeholder}
                className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-base text-foreground outline-none transition-colors focus:border-brand sm:text-sm"
              />
              <button
                type="submit"
                disabled={loading || input.trim().length === 0}
                aria-label={c.send}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-[11px] leading-snug text-muted-foreground">{c.disclaimer}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
