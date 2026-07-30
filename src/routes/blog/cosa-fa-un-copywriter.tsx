import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

const URL = `${SITE_URL}/blog/cosa-fa-un-copywriter`;
const TITLE = "Copywriter: cosa fa davvero e quando ti serve | Guida 2026";
const DESCRIPTION =
  "Cosa fa un copywriter: attività quotidiane, tipi di testi, differenze con il content writer, quanto costa e come scegliere il professionista giusto.";

const faqs = [
  {
    q: "Cosa fa esattamente un copywriter?",
    a: "Un copywriter scrive testi persuasivi con un obiettivo commerciale preciso: far capire il valore di un prodotto e spingere il lettore a compiere un'azione. Il lavoro comprende ricerca sul pubblico, analisi dei competitor, definizione del messaggio, scrittura e revisione di siti, landing page, email, annunci e contenuti social.",
  },
  {
    q: "Che differenza c'è tra copywriter e content writer?",
    a: "Il copywriter scrive per convertire (vendere, generare contatti, far cliccare); il content writer scrive per informare e costruire autorevolezza nel tempo, ad esempio con articoli di blog e guide. Nella pratica le due figure si sovrappongono spesso: una buona strategia usa entrambi gli approcci.",
  },
  {
    q: "Quanto costa un copywriter in Italia?",
    a: "I prezzi variano per esperienza e tipo di progetto: una landing page può andare da poche centinaia di euro a diverse migliaia, mentre articoli SEO e piani editoriali si valutano a pacchetto mensile. Il criterio corretto non è il costo a parola ma il ritorno che il testo genera.",
  },
  {
    q: "Quando conviene assumere un copywriter?",
    a: "Quando il traffico c'è ma non converte, quando stai lanciando un nuovo prodotto o sito, quando le email non vengono aperte o quando non riesci a spiegare in modo chiaro cosa fai. In tutti questi casi il problema è quasi sempre il messaggio, non il canale.",
  },
  {
    q: "Un copywriter si occupa anche di SEO?",
    a: "Un buon copywriter conosce le basi della SEO: keyword research, intento di ricerca, struttura degli heading, meta title e description, link interni. Scrivere bene senza farsi trovare limita fortemente i risultati.",
  },
];

export const Route = createFileRoute("/blog/cosa-fa-un-copywriter")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${URL}/#article`,
              headline: "Copywriter: cosa fa davvero e quando ti serve",
              description: DESCRIPTION,
              inLanguage: "it-IT",
              mainEntityOfPage: URL,
              image: OG_IMAGE_URL,
              author: { "@type": "Person", name: "Shamyo Singh", url: `${SITE_URL}/about` },
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
                { "@type": "ListItem", position: 3, name: "Cosa fa un copywriter", item: URL },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": `${URL}/#faq`,
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  useReveal();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="transition-colors hover:text-foreground">Blog</Link>
      </nav>

      <h1 className="mt-6 font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl">
        Copywriter: cosa fa davvero e <em className="not-italic text-brand">quando ti serve</em>
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        “Copywriter” è una di quelle parole che tutti usano e pochi definiscono. In questa guida trovi
        cosa fa concretamente un copywriter ogni giorno, quali testi produce, in cosa si distingue da
        un content writer e come capire se ti serve davvero.
      </p>

      <h2 className="mt-14 font-heading text-3xl text-foreground">Chi è un copywriter</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Un copywriter è un professionista che scrive testi con un obiettivo commerciale: vendere un
        prodotto, generare richieste di contatto, far iscrivere qualcuno a una newsletter. Non è un
        “scrittore creativo”: è una figura strategica che parte dai dati, dal pubblico e dagli
        obiettivi di business, e solo alla fine mette le parole sulla pagina.
      </p>

      <h2 className="mt-12 font-heading text-3xl text-foreground">Cosa fa un copywriter ogni giorno</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        La scrittura è l'ultima fase del lavoro. Prima arrivano ricerca, ascolto e struttura.
      </p>

      <h3 className="mt-8 font-heading text-2xl text-foreground">1. Ricerca e analisi</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Interviste al cliente, studio del pubblico, lettura delle recensioni, analisi dei competitor e
        keyword research per capire come le persone cercano quel prodotto o servizio.
      </p>

      <h3 className="mt-8 font-heading text-2xl text-foreground">2. Strategia e messaggio</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Definizione della promessa centrale, del tono di voce e delle obiezioni da sciogliere. È qui
        che si decide cosa dire — e soprattutto cosa non dire.
      </p>

      <h3 className="mt-8 font-heading text-2xl text-foreground">3. Scrittura</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Headline, body copy, call to action. Landing page, pagine sito, email, annunci, script video,
        articoli di blog ottimizzati per la ricerca.
      </p>

      <h3 className="mt-8 font-heading text-2xl text-foreground">4. Ottimizzazione</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Test delle varianti, analisi dei risultati, riscrittura delle parti che non funzionano. Un
        testo pubblicato non è un testo finito.
      </p>

      <h2 className="mt-12 font-heading text-3xl text-foreground">
        Copywriter, content writer e SEO copywriter: le differenze
      </h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Il <strong className="text-foreground">copywriter</strong> scrive per convertire. Il{" "}
        <strong className="text-foreground">content writer</strong> scrive per informare e costruire
        fiducia nel tempo. Il <strong className="text-foreground">SEO copywriter</strong> unisce i due
        approcci: testi persuasivi costruiti attorno all'intento di ricerca reale delle persone, con
        struttura degli heading, link interni e metadati curati.
      </p>

      <h2 className="mt-12 font-heading text-3xl text-foreground">Quando ti serve un copywriter</h2>
      <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
        <li>• Il sito riceve visite ma quasi nessuno compila il form o acquista.</li>
        <li>• Stai lanciando un nuovo prodotto, servizio o sito da zero.</li>
        <li>• Le tue email hanno tassi di apertura e clic bassi.</li>
        <li>• Non riesci a spiegare in una frase chiara cosa fai e per chi.</li>
        <li>• Investi in advertising ma il costo per contatto continua a salire.</li>
      </ul>

      <h2 className="mt-12 font-heading text-3xl text-foreground">Come scegliere il professionista giusto</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Guarda i risultati, non solo il portfolio: chiedi quali obiettivi avevano i testi e cosa è
        cambiato dopo. Valuta il metodo (quante domande ti fa prima di scrivere?), la chiarezza del
        preventivo, i tempi e il numero di revisioni incluse. Un buon copywriter ti dirà anche quando
        il problema non sono le parole.
      </p>

      <h2 className="mt-12 font-heading text-3xl text-foreground">Domande frequenti</h2>
      <div className="mt-6 divide-y divide-border/60 border-y border-border/60">
        {faqs.map((f) => (
          <div key={f.q} className="py-6">
            <h3 className="font-heading text-xl text-foreground">{f.q}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-border/60 bg-card p-8 sm:p-10">
        <h2 className="font-heading text-3xl text-foreground">Hai un progetto in mente?</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Scopri i <Link to="/servizi" className="text-brand underline underline-offset-4">servizi di copywriting e SEO</Link>{" "}
          o guarda i <Link to="/portfolio" className="text-brand underline underline-offset-4">progetti realizzati</Link>.
        </p>
        <Link
          to="/contatti"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground transition-all hover:-translate-y-0.5"
        >
          Prenota una call gratuita
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
