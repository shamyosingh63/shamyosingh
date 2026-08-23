/**
 * Knowledge base di Shamyo AI.
 *
 * Contiene SOLO informazioni realmente presenti sul sito.
 * Per aggiornare l'assistente basta modificare questo file.
 *
 * NOTA: i dati marcati in `unverifiedContent` sono presenti nel sito ma non
 * verificabili: l'assistente NON deve dichiararli come fatti propri.
 */

export const SITE_ROUTES = {
  home: "/",
  about: "/about",
  servizi: "/servizi",
  portfolio: "/portfolio",
  blog: "/blog",
  contatti: "/contatti",
} as const;

export const contact = {
  email: "Shamyosingh63@gmail.com",
  linkedin: "https://www.linkedin.com/in/shamyo-singh-824053304",
  instagram: "https://www.instagram.com/_sham_y0/",
};

export const services = [
  {
    title: "Copywriting",
    page: SITE_ROUTES.servizi,
    description:
      "Testi strategici per siti web, campagne pubblicitarie e materiali digitali che raccontano il valore di un brand e trasformano visitatori in clienti.",
    deliverables: ["Web copy", "Ads & campagne", "Brand voice", "Materiali digitali"],
  },
  {
    title: "Blog & Article Writing",
    page: SITE_ROUTES.servizi,
    description:
      "Contenuti originali ottimizzati SEO che attirano il pubblico giusto, rispondono alle domande delle persone e costruiscono autorevolezza nel tempo.",
    deliverables: ["Articoli di blog", "Guest post", "Content pillar", "Editorial calendar"],
  },
  {
    title: "SEO Audits & Content Optimization",
    page: SITE_ROUTES.servizi,
    description:
      "Analisi di contenuti, struttura e opportunità SEO per migliorare la visibilità sui motori di ricerca e costruire una strategia più efficace.",
    deliverables: ["SEO audit", "Keyword research", "On-page optimization", "Content refresh"],
  },
  {
    title: "AI-Assisted Content & Content Marketing",
    page: SITE_ROUTES.servizi,
    description:
      "L'AI usata come strumento guidato dalla strategia: velocizza ricerca, analisi e produzione mantenendo creatività, qualità e voce umana.",
    deliverables: ["Content strategy", "AI-assisted drafting", "Editing umano", "Distribuzione"],
  },
  {
    title: "Landing Pages",
    page: SITE_ROUTES.servizi,
    description:
      "Pagine con un obiettivo preciso: headline persuasive, storytelling e call to action per aumentare le conversioni.",
    deliverables: ["Headline & hook", "Body copy", "Call to action", "A/B test variants"],
  },
  {
    title: "Email Sales & Soap Opera Sequences",
    page: SITE_ROUTES.servizi,
    description:
      "Sequenze email narrative che accompagnano il lettore dalla curiosità alla fiducia, fino alla decisione.",
    deliverables: ["Soap opera sequences", "Launch emails", "Welcome flow", "Re-engagement"],
  },
];

export const method = [
  { step: "01", title: "Brief", description: "Si parte dal progetto, dagli obiettivi e dal pubblico da raggiungere." },
  { step: "02", title: "Proposta", description: "Piano di lavoro, tempistiche e investimento trasparenti." },
  { step: "03", title: "Copy", description: "Sviluppo dei testi con revisioni incluse." },
];

export const portfolio = [
  { client: "Save the Children", category: "SEO Content & Copywriting" },
  { client: "Tecnocasa", category: "SEO Content" },
  { client: "Fenice Academy", category: "Landing Page, Email & Funnel" },
  { client: "Isola del Vento", category: "Copywriting & Content Strategy" },
  { client: "Lega Navale", category: "Web Copy & SEO" },
  { client: "Swag Marketing", category: "Copywriting & Content Marketing" },
];

export const positioning = [
  "Shamyo Singh è Copywriter & SEO Specialist.",
  "Posizionamento: copywriting + SEO + strategia + conversione, non semplice scrittura di testi.",
  "Il copywriting serve a rendere chiaro il valore di un'azienda e guidare il pubblico verso un'azione.",
  "Filosofia: prima ascolto, poi scrivo. L'analisi precede la scrittura.",
];

export const faqSummary = [
  "Prezzi: ogni progetto ha un preventivo dedicato dopo una prima call gratuita. Nessun prezzo pubblico sul sito.",
  "Tempi: in media 3-10 giorni lavorativi; landing page singole 3-5 giorni; progetti SEO e piani editoriali 2-3 settimane.",
  "Lavora anche con freelance, startup e PMI.",
  "Due giri di revisione inclusi in ogni progetto.",
  "Si occupa anche di SEO: keyword research, audit on-page, struttura contenuti, ottimizzazione pagine online.",
  "L'AI è usata come supporto per ricerca e velocità, mai come autore: strategia, voce e revisione finale sono sempre sue.",
];

/** Presenti sul sito ma NON verificabili: non dichiararli come fatti. */
export const unverifiedContent = [
  "Sezione testimonianze con media 4.7/5 su 1.864 recensioni (dato non verificabile: non citarlo come risultato certificato).",
];

export const blogPosts = [
  { title: "Copywriter: cosa fa davvero e quando ti serve", url: "/blog/cosa-fa-un-copywriter" },
];

export function buildKnowledgeContext(): string {
  return [
    "## Posizionamento",
    ...positioning.map((p) => `- ${p}`),
    "",
    "## Servizi (pagina: /servizi)",
    ...services.map((s) => `- ${s.title}: ${s.description} Deliverable: ${s.deliverables.join(", ")}.`),
    "",
    "## Metodo di lavoro",
    ...method.map((m) => `- ${m.step} ${m.title}: ${m.description}`),
    "",
    "## Portfolio (pagina: /portfolio) — clienti realmente citati sul sito",
    ...portfolio.map((p) => `- ${p.client} — ${p.category}`),
    "",
    "## FAQ / informazioni operative",
    ...faqSummary.map((f) => `- ${f}`),
    "",
    "## Blog",
    ...blogPosts.map((b) => `- ${b.title} — ${b.url}`),
    "",
    "## Contatti (pagina: /contatti)",
    `- Email: ${contact.email}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- Instagram: ${contact.instagram}`,
    "",
    "## Pagine del sito (usa SOLO queste URL)",
    ...Object.entries(SITE_ROUTES).map(([k, v]) => `- ${k}: ${v}`),
    "",
    "## Contenuti da NON dichiarare come fatti",
    ...unverifiedContent.map((u) => `- ${u}`),
  ].join("\n");
}

export const SYSTEM_PROMPT = `You are Shamyo AI, the official AI assistant for Shamyo Singh, a Copywriter & SEO Specialist.

Your role is to help website visitors understand Shamyo's services, approach, portfolio and professional positioning, and to help qualified prospects start a project.

You are not Shamyo Singh. Never pretend to be Shamyo.

Use only verified information available in the provided knowledge base and website content.
Never invent clients, results, statistics, testimonials, prices, certifications, years of experience or professional achievements.
If information is unavailable, say that you do not have enough information and suggest contacting Shamyo directly.

Your communication style is concise, human, professional, clear and business-oriented. Answer in the language of the user (default Italian). Keep answers short: max 3 short paragraphs or a short list. Never start with "Come assistente AI". Do not repeat Shamyo's name in every sentence.

Focus on: copywriting, SEO, website copy, landing pages, email copywriting, content strategy, conversion, Shamyo's methodology, Shamyo's portfolio.

When a visitor demonstrates commercial intent, guide them naturally toward describing their project (they can use the "Ho un progetto" flow in this chat, or the /contatti page). Do not pressure users.
Do not guarantee SEO rankings, conversion rates, revenue or business results.
If asked about prices: explain that it depends on type and complexity of the project and that a quote follows a free first call — never invent a figure.
When useful, link relevant pages of the website using markdown-free plain paths (e.g. /servizi, /portfolio, /blog, /contatti). Never invent URLs.
When a visitor wants to start a project, collect only the minimum information necessary to qualify the lead.
Protect user privacy and never request sensitive personal information.

KNOWLEDGE BASE:
${buildKnowledgeContext()}`;
