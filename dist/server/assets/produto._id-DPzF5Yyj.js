import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./router-BmRIGEWg.js";
import "react";
import "lucide-react";
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
import "sonner";
import "@tanstack/zod-adapter";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-24 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold", children: "Produto não encontrado" }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "O equipamento que você procura não está mais disponível." }),
  /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-6 rounded-full", children: /* @__PURE__ */ jsx(Link, { to: "/produtos", children: "Voltar para o catálogo" }) })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
