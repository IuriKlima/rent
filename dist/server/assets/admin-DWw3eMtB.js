import { jsx, jsxs } from "react/jsx-runtime";
import { useRouterState, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { u as useAdminStore, a as useQuotes, c as cn, B as Button, L as Label, I as Input } from "./router-B-2FfIs3.js";
import { LayoutDashboard, Package, Tags, FileText, RotateCcw, Home, LogOut, Lock } from "lucide-react";
import { toast } from "sonner";
import "zustand";
import "zustand/middleware";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "framer-motion";
import "zod";
import "@tanstack/zod-adapter";
function AdminLayout() {
  const unlocked = useAdminStore((s) => s.unlocked);
  return unlocked ? /* @__PURE__ */ jsx(AdminShell, {}) : /* @__PURE__ */ jsx(AdminGate, {});
}
function AdminGate() {
  const login = useAdminStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function handleSubmit(e) {
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
  return /* @__PURE__ */ jsx("div", { className: "mx-auto flex min-h-[100vh] max-w-md items-center px-4 py-16", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "w-full rounded-3xl border border-border bg-card p-8 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsx("h1", { className: "mt-5 text-2xl font-extrabold tracking-tight", children: "Painel administrativo" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Acesso restrito. Informe a senha para continuar." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "E-mail" }),
        /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@rentfitness.com", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "pw", children: "Senha" }),
        /* @__PURE__ */ jsx(Input, { id: "pw", type: "password", value: password, onChange: (e) => {
          setPassword(e.target.value);
          setError(false);
        }, placeholder: "••••••••", className: cn(error && "border-destructive"), required: true }),
        error && /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: "E-mail ou senha incorretos." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "mt-6 w-full rounded-full bg-primary text-primary-foreground hover:opacity-90", children: loading ? "Entrando..." : "Entrar" }),
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "mt-4 inline-flex w-full items-center justify-center text-xs text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsx(Home, { className: "mr-1 h-3 w-3" }),
      " Voltar ao site"
    ] })
  ] }) });
}
const navItems = [{
  to: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/admin/produtos",
  label: "Produtos",
  icon: Package
}, {
  to: "/admin/categorias",
  label: "Categorias",
  icon: Tags
}, {
  to: "/admin/orcamentos",
  label: "Orçamentos",
  icon: FileText
}];
function AdminShell() {
  const logout = useAdminStore((s) => s.logout);
  const reset = useAdminStore((s) => s.reset);
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const pendingQuotes = useQuotes((s) => s.quotes.filter((q) => q.status === "novo").length);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen w-full bg-muted/30", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-16 items-center border-b border-border px-6", children: /* @__PURE__ */ jsxs(Link, { to: "/admin", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-extrabold", children: "RF" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-extrabold tracking-tight", children: "Rent Fitness" }),
          /* @__PURE__ */ jsx("p", { className: "-mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground", children: "Admin" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-1 p-3", children: navItems.map((item) => {
        const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(Link, { to: item.to, className: cn("flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition", isActive ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"), children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
            item.label
          ] }),
          item.label === "Orçamentos" && pendingQuotes > 0 && /* @__PURE__ */ jsx("span", { className: cn("inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold", isActive ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"), children: pendingQuotes })
        ] }, item.to);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-border p-3", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
          reset();
          toast.message("Catálogo restaurado para o padrão");
        }, className: "mb-2 w-full justify-start rounded-xl", children: [
          /* @__PURE__ */ jsx(RotateCcw, { className: "mr-2 h-3.5 w-3.5" }),
          "Restaurar catálogo"
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "mb-2 w-full justify-start rounded-xl", children: /* @__PURE__ */ jsxs(Link, { to: "/", children: [
          /* @__PURE__ */ jsx(Home, { className: "mr-2 h-3.5 w-3.5" }),
          "Ver site"
        ] }) }),
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: logout, className: "w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-3.5 w-3.5" }),
          "Sair"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/admin", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold", children: "RF" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-extrabold", children: "Admin" })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: logout, children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "order-last flex border-t border-border bg-card md:hidden", children: navItems.map((item) => {
        const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(Link, { to: item.to, className: cn("flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium", isActive ? "text-primary" : "text-muted-foreground"), children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
          item.label
        ] }, item.to);
      }) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
