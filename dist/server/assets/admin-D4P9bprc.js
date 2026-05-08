import { U as jsxRuntimeExports, $ as Outlet, r as reactExports } from "./worker-entry-B2NUglqf.js";
import { a as createLucideIcon, u as useAdminStore, g as useRouterState, h as useQuotes, L as Link, c as cn, B as Button, t as toast, f as Label, I as Input } from "./router-CYVMDCYh.js";
import { P as Package, T as Tags } from "./tags-Bru2k1dJ.js";
import { F as FileText } from "./file-text-CmGkFKj5.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$4);
const __iconNode$3 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function AdminLayout() {
  const unlocked = useAdminStore((s) => s.unlocked);
  return unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AdminGate, {});
}
function AdminGate() {
  const login = useAdminStore((s) => s.login);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex min-h-[100vh] max-w-md items-center px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "w-full rounded-3xl border border-border bg-card p-8 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-2xl font-extrabold tracking-tight", children: "Painel administrativo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Acesso restrito. Informe a senha para continuar." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@rentfitness.com", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw", children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "pw", type: "password", value: password, onChange: (e) => {
          setPassword(e.target.value);
          setError(false);
        }, placeholder: "••••••••", className: cn(error && "border-destructive"), required: true }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "E-mail ou senha incorretos." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "mt-6 w-full rounded-full bg-primary text-primary-foreground hover:opacity-90", children: loading ? "Entrando..." : "Entrar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-4 inline-flex w-full items-center justify-center text-xs text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "mr-1 h-3 w-3" }),
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 items-center border-b border-border px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold", children: "RF" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-extrabold tracking-tight", children: "Rent Fitness" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "-mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground", children: "Admin" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 p-3", children: navItems.map((item) => {
        const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: cn("flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-medium transition", isActive ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
            item.label
          ] }),
          item.label === "Orçamentos" && pendingQuotes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold", isActive ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"), children: pendingQuotes })
        ] }, item.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
          reset();
          toast.message("Catálogo restaurado para o padrão");
        }, className: "mb-2 w-full justify-start rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-2 h-3.5 w-3.5" }),
          "Restaurar catálogo"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "mb-2 w-full justify-start rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "mr-2 h-3.5 w-3.5" }),
          "Ver site"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: logout, className: "w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-3.5 w-3.5" }),
          "Sair"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold", children: "RF" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-extrabold", children: "Admin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: logout, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "order-last flex border-t border-border bg-card md:hidden", children: navItems.map((item) => {
        const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: cn("flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium", isActive ? "text-primary" : "text-muted-foreground"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          item.label
        ] }, item.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
