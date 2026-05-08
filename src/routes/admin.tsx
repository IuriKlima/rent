import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminStore } from "@/store/admin";
import { useQuotes } from "@/store/quotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Lock,
  LogOut,
  LayoutDashboard,
  Package,
  Tags,
  FileText,
  Home as HomeIcon,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — Rent Fitness" },
      { name: "description", content: "Gestão completa do site Rent Fitness." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const unlocked = useAdminStore((s) => s.unlocked);
  return unlocked ? <AdminShell /> : <AdminGate />;
}

/* ===========================
 * Login (gate)
 * =========================== */
function AdminGate() {
  const login = useAdminStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso");
    } catch (err) {
      setError(true);
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[100vh] max-w-md items-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight">
          Painel administrativo
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesso restrito. Informe a senha para continuar.
        </p>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rentfitness.com"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="pw">Senha</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className={cn(error && "border-destructive")}
              required
            />
            {error && <p className="text-xs text-destructive">E-mail ou senha incorretos.</p>}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:opacity-90"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <Link
          to="/"
          className="mt-4 inline-flex w-full items-center justify-center text-xs text-muted-foreground hover:text-foreground"
        >
          <HomeIcon className="mr-1 h-3 w-3" /> Voltar ao site
        </Link>
      </form>
    </div>
  );
}

/* ===========================
 * Shell (sidebar + outlet)
 * =========================== */

const navItems = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/produtos" as const, label: "Produtos", icon: Package },
  { to: "/admin/categorias" as const, label: "Categorias", icon: Tags },
  { to: "/admin/orcamentos" as const, label: "Orçamentos", icon: FileText },
];

function AdminShell() {
  const logout = useAdminStore((s) => s.logout);
  const reset = useAdminStore((s) => s.reset);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pendingQuotes = useQuotes((s) => s.quotes.filter((q) => q.status === "novo").length);

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-xs font-extrabold">RF</span>
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-tight">Rent Fitness</p>
              <p className="-mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                Admin
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.to
              : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.label === "Orçamentos" && pendingQuotes > 0 && (
                  <span
                    className={cn(
                      "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                      isActive
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    {pendingQuotes}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              reset();
              toast.message("Catálogo restaurado para o padrão");
            }}
            className="mb-2 w-full justify-start rounded-xl"
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Restaurar catálogo
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-2 w-full justify-start rounded-xl"
          >
            <Link to="/">
              <HomeIcon className="mr-2 h-3.5 w-3.5" />
              Ver site
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="mr-2 h-3.5 w-3.5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile topbar */}
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-[10px] font-extrabold">RF</span>
            </div>
            <span className="text-sm font-extrabold">Admin</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>

        {/* Mobile bottom nav */}
        <nav className="order-last flex border-t border-border bg-card md:hidden">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.to
              : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
