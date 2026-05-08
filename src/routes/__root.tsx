import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import { useAnalytics } from "@/store/analytics";
import { useAdminStore } from "@/store/admin";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rent Fitness — Locação de academias premium para condomínios" },
      {
        name: "description",
        content:
          "Locação de equipamentos de academia profissional para condomínios de alto padrão. Manutenção inclusa, atualização contínua e custo fixo.",
      },
      { name: "author", content: "Rent Fitness" },
      { property: "og:title", content: "Rent Fitness — Academias premium para condomínios" },
      {
        property: "og:description",
        content:
          "Eleve o padrão do seu condomínio com uma academia profissional sob locação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const trackVisit = useAnalytics((s) => s.trackVisit);
  const initialize = useAdminStore((s) => s.initialize);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    // Inicializa Supabase
    initialize();
    
    // Não conta visitas dentro do painel admin
    if (!isAdmin) trackVisit(pathname);
  }, [pathname, isAdmin, trackVisit, initialize]);

  // Admin tem layout próprio (sem header/footer/cart do site)
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "glass !rounded-2xl !border-border !text-foreground !shadow-xl",
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              "glass !rounded-2xl !border-border !text-foreground !shadow-xl",
          },
        }}
      />
    </div>
  );
}
