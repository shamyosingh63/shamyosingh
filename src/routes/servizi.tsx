import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Search, PenLine, Layout, Mail, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

export const Route = createFileRoute("/servizi")({
  head: () => ({
    meta: [
      { title: "Servizi — Shamyo Singh Copywriter" },
      { name: "description", content: "Copywriting, SEO, AI-assisted content, landing page ed email marketing. Servizi su misura per far crescere il tuo brand con le parole giuste." },
      { property: "og:title", content: "Servizi — Shamyo Singh Copywriter" },
      { property: "og:description", content: "Copywriting, SEO, AI-assisted content, landing page ed email marketing." },
      { property: "og:url", content: `${SITE_URL}/servizi` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:title", content: "Servizi — Shamyo Singh Copywriter" },
      { name: "twitter:description", content: "Copywriting, SEO, AI-assisted content, landing page ed email marketing." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/servizi` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://shamyosingh.lovable.app/servizi/#service",
          name: "Servizi di Copywriting e SEO — Shamyo Singh",
          description:
            "Servizi professionali di copywriting strategico, SEO, content marketing, landing page, email sales e AI-assisted content per brand e aziende.",
          url: "https://shamyosingh.lovable.app/servizi",
          provider: { "@id": "https://shamyosingh.lovable.app/#organization" },
          areaServed: { "@type": "Country", name: "Italy" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Servizi di copywriting e content strategy",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Copywriting",
                  description:
                    "Testi strategici per siti web, campagne pubblicitarie e materiali digitali che raccontano il valore del brand.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Blog & Article Writing",
                  description:
                    "Contenuti originali ottimizzati SEO per costruire autorevolezza e attirare il pubblico giusto.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "SEO Audits & Content Optimization",
                  description:
                    "Analisi contenuti, struttura e opportunità SEO per migliorare la visibilità sui motori di ricerca.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "AI-Assisted Content & Content Marketing",
                  description:
                    "Strumenti AI guidati dalla strategia per velocizzare ricerca, analisi e produzione mantenendo la voce umana.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Landing Pages",
                  description:
                    "Pagine strutturate con headline persuasive, storytelling e call to action per aumentare le conversioni.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Email Sales & Soap Opera Sequences",
                  description:
                    "Sequenze email narrative che accompagnano il lettore dalla curiosità alla fiducia fino all'acquisto.",
                },
              },
            ],
          },
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: PenLine,
    title: "Copywriting",
    description: "Le parole possono convincere, emozionare e guidare una scelta. Creo testi strategici per siti web, campagne pubblicitarie e materiali digitali capaci di raccontare il valore di un brand e trasformare visitatori in clienti.",
    deliverables: ["Web copy", "Ads & campagne", "Brand voice", "Materiali digitali"],
  },
  {
    icon: FileText,
    title: "Blog & Article Writing",
    description: "Un articolo non deve essere solo informativo: deve attirare il pubblico giusto, rispondere alle domande delle persone e costruire autorevolezza nel tempo. Creo contenuti originali ottimizzati SEO.",
    deliverables: ["Articoli di blog", "Guest post", "Content pillar", "Editorial calendar"],
  },
  {
    icon: Search,
    title: "SEO Audits & Content Optimization",
    description: "Essere online non basta. Analizzo contenuti, struttura e opportunità SEO per migliorare la visibilità sui motori di ricerca e creare una strategia più efficace.",
    deliverables: ["SEO audit", "Keyword research", "On-page optimization", "Content refresh"],
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Content & Content Marketing",
    description: "L'intelligenza artificiale è uno strumento potente quando viene guidata dalla strategia. Uso AI per velocizzare ricerca, analisi e produzione mantenendo creatività, qualità e voce umana.",
    deliverables: ["Content strategy", "AI-assisted drafting", "Editing umano", "Distribuzione"],
  },
  {
    icon: Layout,
    title: "Landing Pages",
    description: "Una landing page deve avere un obiettivo preciso: convincere una persona ad agire. Creo pagine strutturate con headline persuasive, storytelling e call to action per aumentare le conversioni.",
    deliverables: ["Headline & hook", "Body copy", "Call to action", "A/B test variants"],
  },
  {
    icon: Mail,
    title: "Email Sales & Soap Opera Sequences",
    description: "Le email non devono essere semplici messaggi: devono creare una relazione. Creo sequenze narrative che accompagnano il lettore dalla curiosità alla fiducia, fino alla decisione d'acquisto.",
    deliverables: ["Soap opera sequences", "Launch emails", "Welcome flow", "Re-engagement"],
  },
];

function ServicesPage() {
  useReveal();

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl animate-float-slow" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Servizi</p>
          <h1 className="reveal mt-4 max-w-3xl font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Tutto ciò di cui le tue parole <em className="not-italic text-brand">hanno bisogno.</em>
          </h1>
          <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Dalla strategia al singolo articolo, offro un approccio flessibile: posso seguirti su un progetto specifico o diventare il tuo copywriter di riferimento.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="reveal tilt-card group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/30 p-8 shadow-sm transition-all hover:bg-background hover:shadow-2xl"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-brand/10 blur-2xl" />
              <service.icon className="relative h-8 w-8 text-brand" />
              <h2 className="relative mt-6 font-heading text-2xl text-foreground">{service.title}</h2>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <ul className="relative mt-6 space-y-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1 w-1 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <h2 className="reveal font-heading text-4xl text-foreground sm:text-5xl">Come lavoriamo insieme</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Brief", description: "Partiamo dal tuo progetto, i tuoi obiettivi e il pubblico che vuoi raggiungere." },
              { step: "02", title: "Proposta", description: "Ti presento un piano di lavoro, tempistiche e investimento trasparenti." },
              { step: "03", title: "Copy", description: "Sviluppo i testi con revisioni incluse, fino a quando non sarai soddisfatto." },
            ].map((item, i) => (
              <div key={item.step} className="reveal relative pl-12" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="absolute left-0 top-0 font-heading text-5xl text-brand/70">{item.step}</span>
                <h3 className="font-heading text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-primary-foreground shadow-2xl sm:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl">Pronto a iniziare?</h2>
              <p className="mt-4 max-w-lg text-primary-foreground/80">
                Scrivimi per raccontarmi il tuo progetto. Risponderò entro 24 ore con una proposta su misura.
              </p>
            </div>
            <Link to="/contatti" className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-xl transition-all hover:-translate-y-1">
              Richiedi una proposta
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
