import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE_URL, OG_IMAGE_URL } from "../lib/seo";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina non trovata</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Questa pagina non si è caricata
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Qualcosa è andato storto. Puoi riprovare o tornare alla home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Riprova
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Torna alla home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shamyo Singh — Copywriter & SEO Specialist" },
      { name: "description", content: "Copywriter e SEO specialist: creo contenuti, landing page, email e strategie SEO che trasformano idee in clienti e fanno crescere brand e aziende." },
      { name: "author", content: "Shamyo Singh" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "Shamyo Singh" },
      { property: "og:locale", content: "it_IT" },
      { property: "og:title", content: "Shamyo Singh — Copywriter & SEO Specialist" },
      { property: "og:description", content: "Copywriter e SEO specialist: creo contenuti, landing page, email e strategie SEO che trasformano idee in clienti e fanno crescere brand e aziende." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shamyo Singh — Copywriter & SEO Specialist" },
      { name: "twitter:description", content: "Copywriter e SEO specialist: creo contenuti, landing page, email e strategie SEO che trasformano idee in clienti e fanno crescere brand e aziende." },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://shamyosingh.vercel.app/#organization",
              name: "Shamyo Singh",
              alternateName: "Shamyo Singh Copywriter & SEO Specialist",
              url: "https://shamyosingh.vercel.app",
              email: "mailto:Shamyosingh63@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/shamyo-singh-824053304",
                "https://www.instagram.com/_sham_y0",
              ],
              logo: {
                "@type": "ImageObject",
                url: OG_IMAGE_URL,
              },
              description:
                "Copywriter e SEO specialist specializzato in contenuti strategici, landing page, email marketing e storytelling per brand e aziende.",
            },
            {
              "@type": "Person",
              "@id": "https://shamyosingh.vercel.app/#person",
              name: "Shamyo Singh",
              jobTitle: "Copywriter & SEO Specialist",
              url: "https://shamyosingh.vercel.app",
              email: "mailto:Shamyosingh63@gmail.com",
              image: OG_IMAGE_URL,
              knowsAbout: [
                "Copywriting",
                "SEO copywriting",
                "Content strategy",
                "Landing page copywriting",
                "Email marketing",
              ],
              sameAs: [
                "https://www.linkedin.com/in/shamyo-singh-824053304",
                "https://www.instagram.com/_sham_y0",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://shamyosingh.vercel.app/#website",
              name: "Shamyo Singh — Copywriter & SEO Specialist",
              url: "https://shamyosingh.vercel.app",
              publisher: { "@id": "https://shamyosingh.vercel.app/#organization" },
              inLanguage: "it-IT",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
