import type { Lang } from "@/lib/i18n";

export type PackageId = "START" | "GROW" | "AUTHORITY" | "SEO";

export type PackageDef = {
  id: PackageId;
  subtitle: string;
  description: Record<Lang, string>;
  includes: Record<Lang, string[]>;
  cta: Record<Lang, string>;
};

export const PACKAGES: PackageDef[] = [
  {
    id: "START",
    subtitle: "Make It Clear",
    description: {
      it: "Per chi ha già un sito o una presenza online, ma sente che il proprio messaggio non è abbastanza chiaro.",
      en: "For businesses that already have a website or online presence, but feel their message isn't landing clearly enough.",
    },
    includes: {
      it: ["Revisione del copy della homepage", "Headline & subheadline", "Revisione delle CTA", "Raccomandazioni sul messaging", "Suggerimenti sul tone of voice", "Raccomandazioni SEO di base"],
      en: ["Homepage copy review", "Headline & subheadline", "CTA review", "Messaging recommendations", "Tone of voice suggestions", "Basic SEO recommendations"],
    },
    cta: { it: "Richiedi un preventivo", en: "Request a quote" },
  },
  {
    id: "GROW",
    subtitle: "Make It Convert",
    description: {
      it: "Per chi vuole trasformare meglio l'attenzione dei visitatori in interesse, fiducia e azione.",
      en: "For those who want to turn visitor attention into interest, trust and action — more consistently.",
    },
    includes: {
      it: ["Copy strategy", "Copy per landing page", "Headline", "Subheadline", "CTA", "Messaging orientato alla conversione", "Struttura della pagina", "Revisioni"],
      en: ["Copy strategy", "Landing page copy", "Headlines", "Subheadlines", "CTAs", "Conversion-focused messaging", "Page structure", "Revisions"],
    },
    cta: { it: "Richiedi un preventivo", en: "Request a quote" },
  },
  {
    id: "AUTHORITY",
    subtitle: "Build Your Voice",
    description: {
      it: "Per brand e professionisti che vogliono costruire una comunicazione coerente, riconoscibile e professionale.",
      en: "For brands and professionals ready to build communication that's consistent, recognisable and polished.",
    },
    includes: {
      it: ["Brand messaging", "Tone of voice", "Website copy", "Content strategy", "Landing page", "Email copy", "Microcopy"],
      en: ["Brand messaging", "Tone of voice", "Website copy", "Content strategy", "Landing page", "Email copy", "Microcopy"],
    },
    cta: { it: "Richiedi un preventivo", en: "Request a quote" },
  },
  {
    id: "SEO",
    subtitle: "Get Found",
    description: {
      it: "Per aziende, professionisti e brand che vogliono migliorare la propria presenza organica e la qualità dei propri contenuti.",
      en: "For companies, professionals and brands that want stronger organic visibility and better content.",
    },
    includes: {
      it: ["SEO audit", "Keyword research", "Content gap analysis", "Raccomandazioni on-page", "Content strategy", "Raccomandazioni di SEO copy"],
      en: ["SEO audit", "Keyword research", "Content gap analysis", "On-page recommendations", "Content strategy", "SEO copy recommendations"],
    },
    cta: { it: "Richiedi un'analisi", en: "Request an analysis" },
  },
];

export const SERVICE_OPTIONS: Record<Lang, string[]> = {
  it: ["Website Copy", "Landing Page", "SEO", "Email Copy", "Content Strategy", "Brand Messaging", "Non sono sicuro"],
  en: ["Website Copy", "Landing Page", "SEO", "Email Copy", "Content Strategy", "Brand Messaging", "I'm not sure"],
};
