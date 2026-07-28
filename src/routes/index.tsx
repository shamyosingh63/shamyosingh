import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FileText, Search, PenLine, Layout, Mail, Sparkles, Quote } from "lucide-react";

import portrait from "../assets/shamyo-main.jpg";
import portraitBw from "../assets/shamyo-portrait-bw.webp";
import monogram from "../assets/ss-monogram.png";
import writerDesk from "../assets/writer-desk.jpg";
import collage from "../assets/storytelling-collage.webp";
const workspaceNotes = "/images/workspace-notes.jpg";
const typewriterHands = "/images/typewriter-hands.jpg";
const paperTexture = "/images/paper-texture.jpg";
import { Testimonials } from "@/components/Testimonials";
import { TypingServices } from "@/components/TypingServices";
import { Gallery } from "@/components/Gallery";
import { VideoBand } from "@/components/VideoBand";
import { Faq, faqs } from "@/components/Faq";
import { Newsletter } from "@/components/Newsletter";
import { useReveal } from "@/hooks/use-reveal";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shamyo Singh — Copywriter & SEO Specialist" },
      { name: "description", content: "Copywriter e SEO specialist: creo contenuti, landing page, email e strategie SEO che trasformano idee in clienti e fanno crescere brand e aziende." },
      { property: "og:title", content: "Shamyo Singh — Copywriter & SEO Specialist" },
      { property: "og:description", content: "Copywriter e SEO specialist: creo contenuti, landing page, email e strategie SEO che trasformano idee in clienti e fanno crescere brand e aziende." },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:title", content: "Shamyo Singh — Copywriter & SEO Specialist" },
      { name: "twitter:description", content: "Copywriter e SEO specialist: creo contenuti, landing page, email e strategie SEO che trasformano idee in clienti e fanno crescere brand e aziende." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: PenLine, title: "Copywriting", description: "Testi strategici per siti web, campagne pubblicitarie e materiali digitali capaci di raccontare il valore di un brand e trasformare visitatori in clienti." },
  { icon: FileText, title: "Blog & Article Writing", description: "Contenuti originali ottimizzati SEO che attirano il pubblico giusto, rispondono a domande reali e costruiscono autorevolezza nel tempo." },
  { icon: Search, title: "SEO Audits & Content Optimization", description: "Analisi di contenuti, struttura e opportunità SEO per migliorare la visibilità sui motori di ricerca e definire una strategia efficace." },
  { icon: Sparkles, title: "AI-Assisted Content", description: "Strumenti AI guidati dalla strategia per velocizzare ricerca, analisi e produzione mantenendo creatività, qualità e voce umana." },
  { icon: Layout, title: "Landing Pages", description: "Pagine strutturate con headline persuasive, storytelling e call to action pensate per un unico obiettivo: convertire." },
  { icon: Mail, title: "Email & Soap Opera Sequences", description: "Sequenze email narrative che accompagnano il lettore dalla curiosità alla fiducia, fino alla decisione d'acquisto." },
];

const method = [
  { step: "01", title: "Analisi", description: "Studio il brand, il pubblico e gli obiettivi. Prima di scrivere, ascolto." },
  { step: "02", title: "Strategia", description: "Definisco messaggio, tono di voce e struttura più efficace per il tuo pubblico." },
  { step: "03", title: "Creazione", description: "Scrivo contenuti progettati per comunicare, emozionare e convertire." },
  { step: "04", title: "Ottimizzazione", description: "Analizzo i risultati e miglioro continuamente la comunicazione." },
];

const featuredWork = [
  { client: "Save the Children", category: "SEO & Copywriting", title: "Contenuti che fanno la differenza", metric: "+45% traffico organico" },
  { client: "Fenice Academy", category: "Funnel & Email", title: "Landing page che convertiono", metric: "+32% conversioni" },
  { client: "Isola del Vento", category: "Content Strategy", title: "Raccontare un territorio", metric: "+2.8x engagement" },
];

const clients = [
  "Save the Children",
  "Tecnocasa",
  "Fenice Academy",
  "Isola del Vento",
  "Lega Navale",
  "Swag Marketing",
  "Travel Agencies",
  "Ristorazione locale",
];

const differentiators = [
  { number: "01", title: "Non scrivo per impressionare. Scrivo per ottenere risultati.", body: "Le belle frasi da sole non vendono. Un buon copy deve avere un obiettivo: generare interesse, creare fiducia e portare all'azione." },
  { number: "02", title: "Unisco creatività e strategia.", body: "La creatività senza strategia è solo intrattenimento. La strategia senza creatività è invisibile. Il mio approccio unisce storytelling, psicologia del cliente, SEO e marketing." },
  { number: "03", title: "Ogni brand ha una voce unica. Io la faccio emergere.", body: "Cerco ciò che rende il tuo brand diverso e lo trasformo in una storia che le persone possono riconoscere e ricordare." },
  { number: "04", title: "Non sono un semplice esecutore. Sono un partner strategico.", body: "Faccio domande, analizzo, propongo idee. Un copywriter efficace non vende parole: vende chiarezza." },
];

function HomePage() {
  useReveal();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl animate-float" />
          <div className="absolute -right-32 top-60 h-96 w-96 rounded-full bg-foreground/5 blur-3xl animate-float-slow" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pt-16 pb-20 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Copywriter & SEO Specialist
            </p>
            <h1 className="mt-6 font-heading text-[2.5rem] leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Trasformo idee in{" "}
              <em className="not-italic text-brand">parole che vendono.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ogni brand ha una storia da raccontare. Il mio lavoro è trovare le parole giuste per trasformare attenzione in fiducia, curiosità in relazione e visitatori in clienti.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Attraverso copywriting strategico, contenuti SEO e storytelling, aiuto aziende, professionisti e brand a comunicare meglio e crescere online.
            </p>
            <p className="mt-6 max-w-xl font-heading text-2xl italic text-foreground/90 sm:text-3xl">
              “Le parole non sono solo testo. Sono il ponte tra un brand e le persone.”
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/contatti" className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-xl shadow-brand/25 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/30 active:scale-95">
                Prenota una call gratuita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-background px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground active:scale-95">
                Guarda i risultati
              </Link>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              ⭐ 4.7/5 su 1.864 recensioni verificate · Risposta entro 24h
            </p>

          </div>

          {/* Portrait + floating cards */}
          <div className="relative lg:col-span-5">
            <div className="tilt-card relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-card shadow-2xl">
              <img src={portrait} alt="Ritratto di Shamyo Singh" width={800} height={1000} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
            </div>

            <div className="animate-float absolute -left-4 top-8 hidden rounded-2xl border border-border/60 bg-background/90 p-3 shadow-xl backdrop-blur-md sm:block">
              <img src={monogram} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
            </div>

            <div className="animate-float-slow absolute -bottom-6 -right-2 rounded-2xl border border-border/60 bg-background/95 p-5 shadow-xl backdrop-blur-md sm:-right-6">
              <p className="font-heading text-3xl text-foreground">60+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">brand accompagnati</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE CLIENTS */}
      <section className="border-y border-border/50 bg-card/40 py-8">
        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max gap-16 whitespace-nowrap px-6">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="font-heading text-2xl text-foreground/70 sm:text-3xl">
                {c} <span className="mx-6 text-brand">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVING UP STRATEGY — typing animation */}
      <TypingServices />



      {/* ABOUT ME */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="reveal relative lg:col-span-5">
            <div className="tilt-card relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <img src={typewriterHands} alt="Mani che scrivono su una macchina da scrivere" width={1400} height={1750} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl sm:block">
              <Quote className="h-6 w-6 opacity-70" />
              <p className="mt-3 max-w-[220px] font-heading text-lg italic leading-snug">
                Un buon testo non deve solo essere letto. Deve essere ricordato.
              </p>
            </div>
          </div>

          <div className="reveal lg:col-span-7 lg:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">About me</p>
            <h2 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
              Non scrivo semplicemente contenuti.<br />
              <em className="not-italic text-brand">Creo connessioni.</em>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>Dietro ogni acquisto c'è un'emozione. Dietro ogni cliente c'è una storia. Dietro ogni grande brand c'è una comunicazione capace di lasciare il segno.</p>
              <p>Sono <span className="font-semibold text-foreground">Shamyo Singh</span>, copywriter specializzato nella creazione di contenuti strategici, pagine web persuasive, email marketing e testi ottimizzati per i motori di ricerca.</p>
              <p>Il mio obiettivo è semplice: aiutare aziende e professionisti a comunicare il proprio valore con parole autentiche, chiare e capaci di generare risultati.</p>
            </div>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-foreground underline underline-offset-8 transition-opacity hover:opacity-70">
              Conosci la mia storia
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — parallax band */}
      <section
        className="relative overflow-hidden border-y border-border/50 bg-fixed max-md:bg-scroll"
        style={{
          backgroundImage: `linear-gradient(rgba(245,243,238,0.85), rgba(245,243,238,0.85)), url(${paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">La mia filosofia</p>
          <h2 className="reveal mt-6 font-heading text-4xl leading-[1.1] text-foreground sm:text-6xl">
            Prima ascolto. <em className="not-italic text-brand">Poi scrivo.</em>
          </h2>
          <p className="reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ogni progetto nasce dalla comprensione. Prima di mettere una parola sul foglio studio il pubblico, gli obiettivi, il mercato, la voce dell'azienda e il problema da risolvere. Solo dopo nasce il testo.
          </p>
          <p className="reveal mx-auto mt-6 max-w-2xl font-heading text-2xl italic text-foreground sm:text-3xl">
            Il copywriting efficace non riguarda il riempire una pagina di frasi belle. Riguarda trovare il messaggio giusto per la persona giusta.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Servizi</p>
            <h2 className="mt-3 font-heading text-4xl text-foreground sm:text-5xl">Cosa posso fare per te</h2>
          </div>
          <Link to="/servizi" className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
            Vedi tutti i servizi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="reveal tilt-card group relative overflow-hidden rounded-3xl border border-border/60 bg-background p-8 shadow-sm transition-all hover:shadow-2xl"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-brand/10 blur-2xl" />
              <service.icon className="relative h-8 w-8 text-brand" />
              <h3 className="relative mt-6 font-heading text-2xl text-foreground">{service.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* METHOD + IMAGE */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">
          <div className="reveal order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Metodo di lavoro</p>
            <h2 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
              Un processo semplice.<br />
              <em className="not-italic text-brand">Risultati concreti.</em>
            </h2>
            <div className="mt-10 space-y-6">
              {method.map((item) => (
                <div key={item.step} className="flex gap-6 border-b border-border/60 pb-6 last:border-0">
                  <span className="font-heading text-4xl text-brand">{item.step}</span>
                  <div>
                    <h3 className="font-heading text-xl text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <div className="tilt-card relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <img src={workspaceNotes} alt="Appunti scritti a mano su un quaderno editoriale" width={1600} height={1200} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE BAND */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-6 md:grid-cols-12">
          <figure className="reveal group relative col-span-12 overflow-hidden rounded-[2rem] shadow-xl md:col-span-7">
            <img
              src={collage}
              alt="Collage editoriale: copy, storytelling e bozze di scrittura"
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-8">
              <p className="font-heading text-2xl text-background sm:text-3xl">
                Copy, draft, revisione. <span className="text-brand">Ripetere.</span>
              </p>
            </figcaption>
          </figure>

          <figure className="reveal group relative col-span-6 overflow-hidden rounded-[2rem] shadow-xl md:col-span-5">
            <img
              src={portraitBw}
              alt="Shamyo Singh sorridente, ritratto in bianco e nero"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/70">Dietro le parole</p>
              <p className="mt-2 font-heading text-2xl text-background">Shamyo Singh</p>
            </figcaption>
          </figure>

          <figure className="reveal group relative col-span-6 overflow-hidden rounded-[2rem] shadow-xl md:col-span-5">
            <img
              src={writerDesk}
              alt="Scrittore al lavoro alla scrivania con macchina da scrivere"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 md:aspect-[3/2]"
            />
          </figure>

          <div className="reveal col-span-12 flex flex-col justify-center rounded-[2rem] border border-border/60 bg-card/40 p-8 md:col-span-7 lg:p-12">
            <Quote className="h-8 w-8 text-brand" />
            <p className="mt-5 font-heading text-2xl leading-snug text-foreground sm:text-3xl">
              “Un professionista è un dilettante che non ha mollato.”
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Scrivere è un mestiere di disciplina, non di ispirazione. Ogni riga che leggi sul tuo sito
              può avvicinare o allontanare un cliente: io lavoro perché avvicini.
            </p>
          </div>
        </div>
      </section>



      {/* WHY ME */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Perché scegliere me</p>
          <h2 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Il tuo brand non ha bisogno di altre parole.<br />
            <em className="not-italic text-brand">Ha bisogno delle parole giuste.</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Viviamo in un mondo pieno di contenuti. Tutti scrivono. Tutti pubblicano. Tutti cercano attenzione. Ma pochi riescono davvero a comunicare qualcosa. Il problema non è la mancanza di contenuti: è la mancanza di strategia.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <div
              key={d.number}
              className="reveal tilt-card group relative overflow-hidden rounded-3xl border border-border/60 bg-card/30 p-8 shadow-sm transition-all hover:bg-background hover:shadow-xl sm:p-10"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-5xl text-brand">{d.number}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-6 font-heading text-2xl text-foreground">{d.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Portfolio</p>
              <h2 className="mt-3 font-heading text-4xl text-foreground sm:text-5xl">Progetti selezionati</h2>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
              Vedi tutti i progetti <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredWork.map((work, index) => (
              <article
                key={index}
                className="reveal tilt-card group relative overflow-hidden rounded-3xl border border-border/60 bg-background p-8 shadow-sm transition-all hover:shadow-2xl"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{work.category}</p>
                <h3 className="mt-4 font-heading text-2xl text-foreground">{work.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{work.client}</p>
                <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-5">
                  <span className="text-sm font-semibold text-brand">{work.metric}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <Gallery />

      {/* TESTIMONIALS CAROUSEL */}
      <Testimonials />

      {/* VIDEO BAND */}
      <VideoBand />


      {/* FAQ */}
      <Faq />

      {/* NEWSLETTER */}
      <Newsletter />

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-primary-foreground shadow-2xl sm:p-16 lg:p-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">Il prossimo passo</p>

              <h2 className="mt-4 font-heading text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
                Quanto ti costa continuare a<br />
                <em className="not-italic text-brand">comunicare nel modo sbagliato?</em>
              </h2>
              <p className="mt-6 text-primary-foreground/80 sm:text-lg">
                Ogni giorno di copy confuso è un cliente che sceglie qualcun altro. Raccontami il tuo
                progetto in due righe: ti rispondo entro 24 ore con una prima idea concreta, gratis e
                senza impegno.
              </p>
              <p className="mt-5 text-sm text-primary-foreground/60">
                Posti limitati ogni mese — lavoro su pochi progetti alla volta.
              </p>
            </div>
            <Link to="/contatti" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95">
              Raccontami il tuo progetto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
