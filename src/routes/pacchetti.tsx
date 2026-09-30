import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

import { PACKAGES } from "@/data/packages";
import { useCopy, useLang } from "@/lib/i18n";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

const TITLE = "Pacchetti copywriting & SEO — Shamyo Singh";
const DESC =
  "Pacchetti di copywriting, website copy, landing page copy, brand messaging e SEO copywriting con preventivo su misura. Più un Copy Check gratuito di 15 minuti.";

export const Route = createFileRoute("/pacchetti")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/pacchetti` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/pacchetti` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Pacchetti — Shamyo Singh",
          url: `${SITE_URL}/pacchetti`,
          itemListElement: [
            ...PACKAGES.map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: `${p.id} — ${p.subtitle}`, description: p.description.it },
            })),
            {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
              itemOffered: { "@type": "Service", name: "The 15-Minute Copy Check" },
            },
          ],
        }),
      },
    ],
  }),
  component: PackagesPage,
});

const COPY = {
  it: {
    eyebrow: "Pacchetti",
    title: "Scegli da dove partire.",
    intro:
      "Quattro percorsi professionali, ognuno con un preventivo su misura dopo una prima conversazione. Nessun pagamento online: prima parliamo, poi decidi.",
    includes: "Include",
    quoteNote: "Preventivo personalizzato",
    free: {
      badge: "Gratis",
      headline: "15 minuti. Un problema. Idee concrete.",
      lead: "Non sai da dove iniziare?",
      body: "Prenota una sessione gratuita di 15 minuti con Shamyo. Raccontami il tuo progetto, cosa vuoi migliorare e quali sono i tuoi obiettivi. Durante la sessione analizzeremo insieme il problema e ti darò alcune indicazioni concrete e opzioni basate sulle tue esigenze.",
      points: ["15 minuti", "Gratis", "Personalizzato", "Nessun impegno"],
      cta: "Prenota il tuo Copy Check",
      how: "Come funziona?",
      steps: [
        "Compili un breve form e proponi giorno e ora.",
        "Shamyo ti conferma la sessione via email.",
        "In 15 minuti parliamo del tuo progetto e di cosa migliorare.",
        "Esci con indicazioni concrete sui prossimi passi. Nessun obbligo.",
      ],
    },
    unsure: "Non sai quale pacchetto fa per te? Chiedi all'assistente AI in basso a destra o",
    unsureLink: "scrivi a Shamyo",
  },
  en: {
    eyebrow: "Packages",
    title: "Pick your starting point.",
    intro:
      "Four professional paths, each with a tailored quote after a first conversation. No online checkout: we talk first, then you decide.",
    includes: "Includes",
    quoteNote: "Custom quote",
    free: {
      badge: "Free",
      headline: "15 minutes. One problem. Clear next steps.",
      lead: "Not sure where to start?",
      body: "Book a free 15-minute session with Shamyo. Tell me about your project, what you'd like to improve and where you want to go. Together we'll look at the problem, and you'll leave with concrete pointers and options shaped around your needs.",
      points: ["15 minutes", "Free", "Tailored to you", "No commitment"],
      cta: "Book your Copy Check",
      how: "How does it work?",
      steps: [
        "Fill in a short form and suggest a day and time.",
        "Shamyo confirms the session by email.",
        "We spend 15 minutes on your project and what to improve.",
        "You leave with clear next steps. No strings attached.",
      ],
    },
    unsure: "Not sure which package fits? Ask the AI assistant in the corner or",
    unsureLink: "write to Shamyo",
  },
};

function PackagesPage() {
  const c = useCopy(COPY);
  const { lang } = useLang();
  const [howOpen, setHowOpen] = useState(false);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{c.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">{c.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{c.intro}</p>
      </section>

      <section id="packages" aria-label={c.eyebrow} className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <article
              key={p.id}
              id={p.id.toLowerCase()}
              className="group flex flex-col rounded-3xl border border-border/60 bg-card/30 p-8 transition-all hover:-translate-y-0.5 hover:border-border hover:bg-background hover:shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">{p.id}</p>
              <h2 className="mt-3 font-heading text-3xl text-foreground">{p.subtitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description[lang]}</p>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">{c.includes}</h3>
              <ul className="mt-3 flex-1 space-y-2">
                {p.includes[lang].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-6">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.quoteNote}</span>
                <Link
                  to="/contatti"
                  search={{ package: p.id }}
                  className="rounded-full border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  {p.cta[lang]}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <article
          id="copy-check"
          className="relative mt-10 overflow-hidden rounded-3xl border-2 border-brand/40 bg-brand/5 p-8 sm:p-12"
        >
          <span className="inline-flex rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-foreground">
            {c.free.badge}
          </span>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">The 15-Minute Copy Check</p>
              <h2 className="mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl">{c.free.headline}</h2>
              <p className="mt-5 font-medium text-foreground">{c.free.lead}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{c.free.body}</p>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <ul className="grid grid-cols-2 gap-3">
                {c.free.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Check aria-hidden className="h-4 w-4 text-brand" /> {pt}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/copy-check"
                  className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5"
                >
                  {c.free.cta}
                </Link>
                <button
                  type="button"
                  aria-expanded={howOpen}
                  aria-controls="copy-check-how"
                  onClick={() => setHowOpen((v) => !v)}
                  className="rounded-full border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-foreground"
                >
                  {c.free.how}
                </button>
              </div>
            </div>
          </div>
          {howOpen ? (
            <ol id="copy-check-how" className="mt-8 grid gap-4 border-t border-brand/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {c.free.steps.map((s, i) => (
                <li key={s} className="text-sm leading-relaxed text-muted-foreground">
                  <span className="block font-heading text-2xl text-brand">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          ) : null}
        </article>

        <p className="mt-10 text-sm text-muted-foreground">
          {c.unsure}{" "}
          <Link to="/contatti" className="font-medium text-foreground underline underline-offset-4">
            {c.unsureLink}
          </Link>
          .
        </p>
      </section>
    </>
  );
}
