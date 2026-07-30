import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";

const TITLE = "Blog — Guide di copywriting e SEO | Shamyo Singh";
const DESCRIPTION =
  "Guide pratiche su copywriting, SEO e content strategy: come scrivere testi che convertono e farsi trovare su Google.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog/#blog`,
          name: "Blog di Shamyo Singh",
          url: `${SITE_URL}/blog`,
          description: DESCRIPTION,
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "it-IT",
        }),
      },
    ],
  }),
  component: BlogIndex,
});

const posts = [
  {
    to: "/blog/cosa-fa-un-copywriter",
    title: "Copywriter: cosa fa davvero e quando ti serve",
    excerpt:
      "Il lavoro quotidiano di un copywriter, il valore strategico dei testi e come scegliere il professionista giusto per il tuo progetto.",
    readingTime: "8 min di lettura",
  },
];

function BlogIndex() {
  useReveal();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Blog</p>
      <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
        Guide di copywriting, <em className="not-italic text-brand">SEO</em> e content strategy
      </h1>
      <p className="mt-6 max-w-2xl text-muted-foreground sm:text-lg">
        Approfondimenti pratici per capire come funzionano le parole che vendono e come farsi trovare
        dalle persone giuste su Google.
      </p>

      <div className="reveal mt-14 divide-y divide-border/60 border-y border-border/60">
        {posts.map((post) => (
          <Link key={post.to} to={post.to} className="group block py-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{post.readingTime}</p>
            <h2 className="mt-3 font-heading text-2xl text-foreground transition-colors group-hover:text-brand sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
              Leggi la guida <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
