import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./router-dGa2FNW3.js";
import "@tanstack/react-router";
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
const SplitErrorComponent = ({
  error,
  reset
}) => /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-24 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold", children: "Algo deu errado" }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: error.message }),
  /* @__PURE__ */ jsx(Button, { onClick: reset, className: "mt-6 rounded-full", children: "Tentar novamente" })
] });
export {
  SplitErrorComponent as errorComponent
};
