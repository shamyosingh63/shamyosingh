export type QuickAction = {
  label: string;
  /** Testo mostrato come messaggio utente (default: label). */
  say?: string;
  /** Risposta scriptata (senza chiamare l'AI). */
  reply?: string;
  /** Quick actions successive. */
  next?: QuickAction[];
  /** Avvia il flusso di qualificazione lead. */
  startLead?: boolean;
  link?: { to: string; label: string };
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
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(action)}
          className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

const copywritingAction: QuickAction = {
  label: "✍️ Copywriting",
  say: "Copywriting",
  reply:
    "Posso aiutarti con website copy, landing page, email copywriting, brand voice e contenuti persuasivi.\n\nChe tipo di contenuto ti serve?",
  link: { to: "/servizi", label: "Scopri i servizi" },
  next: [
    { label: "Website", say: "Mi serve il copy del sito web" },
    { label: "Landing page", say: "Mi serve una landing page" },
    { label: "Email", say: "Mi serve email copywriting" },
    { label: "Brand voice", say: "Mi serve definire la brand voice" },
    { label: "Altro", say: "Altro tipo di contenuto" },
  ],
};

const seoAction: QuickAction = {
  label: "🔎 SEO",
  say: "SEO",
  reply:
    "Shamyo lavora anche sul lato SEO, combinando strategia, contenuti e copywriting per aiutare aziende e professionisti a farsi trovare dalle persone giuste.\n\nCosa vuoi migliorare?",
  link: { to: "/servizi", label: "Scopri il servizio SEO" },
  next: [
    { label: "Posizionamento Google", say: "Voglio migliorare il posizionamento su Google" },
    { label: "Contenuti SEO", say: "Mi servono contenuti SEO" },
    { label: "SEO copywriting", say: "Mi interessa la SEO copywriting" },
    { label: "SEO audit", say: "Mi serve un SEO audit" },
    { label: "Non so da dove iniziare", say: "Non so da dove iniziare con la SEO" },
  ],
};

const projectAction: QuickAction = {
  label: "🚀 Ho un progetto",
  say: "Ho un progetto",
  startLead: true,
};

const aboutAction: QuickAction = {
  label: "👤 Conosci Shamyo",
  say: "Chi è Shamyo Singh?",
};

export const INITIAL_ACTIONS: QuickAction[] = [
  copywritingAction,
  seoAction,
  projectAction,
  aboutAction,
];

export const EMPTY_STATE_ACTIONS: QuickAction[] = [
  copywritingAction,
  seoAction,
  { ...copywritingAction, label: "Landing Page", say: "Mi serve una landing page", reply: undefined, next: undefined, link: undefined },
  { label: "Email", say: "Mi serve email copywriting" },
  projectAction,
];

const SUGGESTION_POOL = [
  "Quanto costa?",
  "Puoi aiutarmi con il mio sito?",
  "Fai SEO?",
  "Voglio migliorare le conversioni.",
  "Come posso iniziare?",
  "Con che tipo di clienti lavori?",
  "In quanto tempo consegni?",
  "Come funziona il tuo metodo?",
];

/** Suggerimenti contestuali, ruotati per non mostrare sempre gli stessi. */
export function getSuggestions(turn: number): QuickAction[] {
  const start = (turn * 3) % SUGGESTION_POOL.length;
  return [0, 1, 2].map((i) => ({ label: SUGGESTION_POOL[(start + i) % SUGGESTION_POOL.length] }));
}
