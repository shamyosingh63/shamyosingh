export type LeadField = "business" | "need" | "hasWebsite" | "goal" | "timing" | "name" | "email";

export type LeadStep = {
  field: LeadField;
  question: string;
  options?: string[];
  placeholder: string;
  validate?: (value: string) => string | null;
};

export const LEAD_STEPS: LeadStep[] = [
  {
    field: "business",
    question: "Perfetto. Di cosa si occupa la tua attività?",
    placeholder: "Es. studio legale, e-commerce, agenzia…",
  },
  {
    field: "need",
    question: "Di quale servizio hai bisogno?",
    options: ["Copywriting", "Landing page", "SEO", "Email", "Contenuti blog", "Non lo so ancora"],
    placeholder: "Scrivi il servizio",
  },
  {
    field: "hasWebsite",
    question: "Hai già un sito web? Se sì, puoi indicarmi l'indirizzo.",
    options: ["Non ancora", "Sì, ma va migliorato"],
    placeholder: "Es. www.ilmiosito.it",
  },
  {
    field: "goal",
    question: "Qual è l'obiettivo principale del progetto?",
    placeholder: "Es. più richieste di preventivo, più visibilità su Google…",
  },
  {
    field: "timing",
    question: "In che tempi vorresti partire?",
    options: ["Subito", "Entro un mese", "Sto valutando"],
    placeholder: "Scrivi la tempistica",
  },
  {
    field: "name",
    question: "Come ti chiami?",
    placeholder: "Nome e cognome",
  },
  {
    field: "email",
    question: "Ultima cosa: a quale email può risponderti Shamyo?",
    placeholder: "nome@email.it",
    validate: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? null : "Inserisci un'email valida.",
  },
];

export const LEAD_INTRO =
  "Ottimo, raccolgo qualche informazione essenziale così Shamyo può risponderti in modo utile. Sono 7 domande veloci.";

export const LEAD_SUCCESS =
  "Grazie! Ho inviato la tua richiesta a Shamyo: ti risponderà via email il prima possibile.\n\nSe preferisci, puoi anche scrivergli direttamente da /contatti.";

export const LEAD_ERROR =
  "Non riesco a inviare la richiesta in questo momento. Puoi scrivere direttamente a Shamyosingh63@gmail.com oppure dalla pagina /contatti.";
