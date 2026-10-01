import type { Lang } from "@/lib/i18n";

export type ChatLink = { to: string; label: string; hash?: string; search?: Record<string, string> };

export type QuickAction = {
  label: string;
  /** Testo mostrato come messaggio utente (default: label). */
  say?: string;
  /** Risposta scriptata (senza chiamare l'AI). */
  reply?: string;
  links?: ChatLink[];
  /** Avvia il flusso di qualificazione (4 domande). */
  startQualify?: boolean;
  /** Valore di una risposta del flusso di qualificazione. */
  value?: string;
};

export function QuickActions({
  actions,
  onSelect,
  disabled,
}: {
  actions: QuickAction[];
  onSelect: (action: QuickAction) => void;
  disabled?: boolean;
}) {
  if (actions.length === 0) return null;
  return (
    <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(action)}
          className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-50"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

export const CHAT_COPY = {
  it: {
    welcome:
      "Ciao! 👋 Sono l'assistente di Shamyo.\n\nPosso aiutarti a capire quale servizio o percorso potrebbe essere più adatto al tuo progetto.",
    title: "Shamyo's AI Copy Assistant",
    subtitle: "Assistente AI · non è Shamyo",
    placeholder: "Scrivi un messaggio…",
    disclaimer: "Assistente virtuale: può commettere errori e non sostituisce Shamyo.",
    open: "Apri l'assistente AI di Shamyo",
    close: "Chiudi la chat",
    reset: "Ricomincia la conversazione",
    send: "Invia messaggio",
    inputLabel: "Scrivi un messaggio all'assistente",
    rate: "Stai scrivendo un po' troppo veloce: attendi qualche secondo e riprova.",
    error: "Ho un problema tecnico momentaneo. Puoi riprovare tra poco o scrivere a Shamyo da /contatti.",
    empty: "Non ho una risposta utile su questo. Per un confronto diretto puoi scrivere a Shamyo da /contatti.",
    qIntro: "Ti faccio 4 domande veloci.",
    recommend: (pkg: string) => `In base a quello che mi hai raccontato, ${pkg} potrebbe essere un buon punto di partenza.`,
    why: "Perché?",
    viewPackage: "Vedi il pacchetto",
    quote: "Richiedi un preventivo",
    copyCheck: "Prenota il Copy Check gratuito",
  },
  en: {
    welcome:
      "Hi! 👋 I'm Shamyo's AI assistant.\n\nI can help you figure out which service or package could be the right fit for your project.",
    title: "Shamyo's AI Copy Assistant",
    subtitle: "AI assistant · not Shamyo",
    placeholder: "Type a message…",
    disclaimer: "Virtual assistant: it can make mistakes and doesn't replace Shamyo.",
    open: "Open Shamyo's AI assistant",
    close: "Close chat",
    reset: "Restart conversation",
    send: "Send message",
    inputLabel: "Write a message to the assistant",
    rate: "You're typing a little fast — wait a few seconds and try again.",
    error: "I'm having a temporary technical issue. Try again shortly or write to Shamyo via /contatti.",
    empty: "I don't have a useful answer on that. To talk it through, write to Shamyo via /contatti.",
    qIntro: "Four quick questions.",
    recommend: (pkg: string) => `Based on what you've told me, ${pkg} could be a good place to start.`,
    why: "Why?",
    viewPackage: "View package",
    quote: "Request a quote",
    copyCheck: "Book the free Copy Check",
  },
} satisfies Record<Lang, unknown>;

export const QUESTIONS: Record<Lang, { q: string; options: [string, string][] }[]> = {
  it: [
    { q: "Cosa vorresti migliorare?", options: [["website", "Sito web"], ["landing", "Landing page"], ["seo", "SEO"], ["email", "Email"], ["brand", "Brand messaging"], ["content", "Contenuti"], ["unsure", "Non sono sicuro"]] },
    { q: "Qual è il tuo obiettivo principale?", options: [["clarity", "Più chiarezza"], ["conversions", "Più conversioni"], ["traffic", "Più traffico"], ["brand", "Brand più forte"], ["content", "Contenuti migliori"], ["unsure", "Non sono sicuro"]] },
    { q: "Hai già un sito o una presenza online?", options: [["yes", "Sì"], ["no", "No"], ["building", "Lo sto costruendo"]] },
    { q: "Quanto è grande il progetto?", options: [["small", "Piccolo"], ["medium", "Medio"], ["large", "Grande"], ["unsure", "Non so"]] },
  ],
  en: [
    { q: "What would you like to improve?", options: [["website", "Website"], ["landing", "Landing page"], ["seo", "SEO"], ["email", "Email"], ["brand", "Brand messaging"], ["content", "Content"], ["unsure", "I'm not sure"]] },
    { q: "What's your main goal?", options: [["clarity", "More clarity"], ["conversions", "More conversions"], ["traffic", "More traffic"], ["brand", "Stronger brand"], ["content", "Better content"], ["unsure", "I'm not sure"]] },
    { q: "Do you already have a website or online presence?", options: [["yes", "Yes"], ["no", "No"], ["building", "I'm building one"]] },
    { q: "How big is the project?", options: [["small", "Small"], ["medium", "Medium"], ["large", "Large"], ["unsure", "Not sure"]] },
  ],
};

type Pkg = "START" | "GROW" | "AUTHORITY" | "SEO";
const PKG_NAME: Record<Pkg, string> = {
  START: "START — Make It Clear",
  GROW: "GROW — Make It Convert",
  AUTHORITY: "AUTHORITY — Build Your Voice",
  SEO: "SEO — Get Found",
};

const REASONS: Record<Lang, Record<Pkg, string[]>> = {
  it: {
    START: ["Parte da ciò che hai già e lo rende più chiaro", "Lavora su headline, CTA e messaggio principale", "È un primo passo contenuto e concreto"],
    GROW: ["È pensato per trasformare l'attenzione in azione", "Include landing page copy, struttura e CTA", "Si concentra su un messaging orientato alla conversione"],
    AUTHORITY: ["Costruisce una voce di brand coerente", "Copre più punti di contatto: sito, email, contenuti", "Adatto a progetti più ampi e strutturati"],
    SEO: ["Parte da audit e keyword research", "Individua i gap nei contenuti", "Punta a migliorare la presenza organica"],
  },
  en: {
    START: ["It builds on what you already have and sharpens it", "It focuses on headlines, CTAs and your core message", "It's a focused, practical first step"],
    GROW: ["It's built to turn attention into action", "It covers landing page copy, structure and CTAs", "It centres on conversion-focused messaging"],
    AUTHORITY: ["It shapes a consistent brand voice", "It spans several touchpoints: site, email, content", "It suits broader, more structured projects"],
    SEO: ["It starts with an audit and keyword research", "It uncovers content gaps", "It aims to strengthen your organic presence"],
  },
};

/** Suggerisce un pacchetto in base alle 4 risposte (mai una garanzia). */
export function recommendPackage(answers: string[]): Pkg {
  const [improve, goal, , size] = answers;
  if (improve === "seo" || goal === "traffic") return "SEO";
  if (improve === "brand" || goal === "brand" || size === "large" || improve === "email" || improve === "content" || goal === "content") return "AUTHORITY";
  if (improve === "landing" || goal === "conversions") return "GROW";
  return "START";
}

export function buildRecommendation(lang: Lang, answers: string[]) {
  const pkg = recommendPackage(answers);
  const c = CHAT_COPY[lang];
  const content = `${c.recommend(PKG_NAME[pkg])}\n\n${c.why}\n${REASONS[lang][pkg].map((r) => `• ${r}`).join("\n")}`;
  const links: ChatLink[] = [
    { to: "/pacchetti", hash: pkg.toLowerCase(), label: c.viewPackage },
    { to: "/contatti", search: { package: pkg }, label: c.quote },
    { to: "/copy-check", label: c.copyCheck },
  ];
  return { content, links };
}

export function initialActions(lang: Lang): QuickAction[] {
  const it = lang === "it";
  const c = CHAT_COPY[lang];
  return [
    { label: it ? "🌐 Migliorare il mio sito" : "🌐 Improve my website", say: it ? "Vorrei migliorare il mio sito" : "I'd like to improve my website" },
    { label: it ? "✍️ Scrivere contenuti" : "✍️ Create content", say: it ? "Mi servono contenuti" : "I need content" },
    { label: it ? "🚀 Aumentare le conversioni" : "🚀 Increase conversions", say: it ? "Voglio aumentare le conversioni" : "I want more conversions" },
    { label: it ? "🔎 Migliorare la SEO" : "🔎 Improve SEO", say: it ? "Voglio migliorare la SEO" : "I want to improve my SEO" },
    {
      label: it ? "📦 Vedere i pacchetti" : "📦 View packages",
      reply: it
        ? "Ci sono 4 pacchetti professionali — START, GROW, AUTHORITY e SEO — tutti con preventivo su misura, più il Copy Check gratuito di 15 minuti. Se vuoi, ti aiuto a capire quale potrebbe fare per te con 4 domande."
        : "There are 4 professional packages — START, GROW, AUTHORITY and SEO — each with a tailored quote, plus the free 15-minute Copy Check. If you like, I can help you narrow it down with 4 quick questions.",
      links: [{ to: "/pacchetti", label: c.viewPackage }],
    },
    {
      label: it ? "🎁 Fare il Copy Check gratuito" : "🎁 Book the free Copy Check",
      reply: it
        ? "The 15-Minute Copy Check è una sessione gratuita di 15 minuti con Shamyo: parlate del tuo progetto e ricevi indicazioni concrete sui prossimi passi. Nessun impegno."
        : "The 15-Minute Copy Check is a free 15-minute session with Shamyo: you talk through your project and leave with concrete next steps. No commitment.",
      links: [{ to: "/copy-check", label: c.copyCheck }],
    },
    {
      label: it ? "💬 Contattare Shamyo" : "💬 Contact Shamyo",
      reply: it
        ? "Puoi richiedere un preventivo dal form contatti, oppure conoscere Shamyo con il Copy Check gratuito di 15 minuti."
        : "You can request a quote through the contact form, or meet Shamyo first with the free 15-minute Copy Check.",
      links: [{ to: "/contatti", label: c.quote }, { to: "/copy-check", label: c.copyCheck }],
    },
    { label: it ? "🧭 Non so cosa scegliere" : "🧭 Not sure what to pick", startQualify: true },
  ];
}

export function followUpActions(lang: Lang): QuickAction[] {
  return lang === "it"
    ? [{ label: "🧭 Aiutami a scegliere", startQualify: true }, { label: "Quanto costa?" }, { label: "Come funziona il processo?" }]
    : [{ label: "🧭 Help me choose", startQualify: true }, { label: "How much does it cost?" }, { label: "How does the process work?" }];
}
