import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { b as buildWhatsappContactUrl, L as Label, I as Input, B as Button } from "./router-DfdIkmYe.js";
import { T as Textarea } from "./textarea-YReb0JVK.js";
import { toast } from "sonner";
import "@tanstack/react-router";
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
function ContatoPage() {
  const [submitting, setSubmitting] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      e.target.reset();
      toast.success("Mensagem enviada", {
        description: "Recebemos sua solicitação. Um consultor entrará em contato em breve."
      });
    }, 800);
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("header", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Contato" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-balance", children: "Fale com um consultor especialista." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Envie sua mensagem ou inicie uma conversa direta no WhatsApp. Vamos desenhar a academia perfeita para o seu condomínio." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid gap-10 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsx("aside", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-secondary p-8 text-secondary-foreground", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold tracking-tight", children: "Rent Fitness" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/60", children: "Atendimento exclusivo para síndicos e administradoras." }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-8 space-y-5", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary", children: /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-white/40", children: "E-mail" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "contato@rentfitness.com.br" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary", children: /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-white/40", children: "Telefone" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "+55 11 99999-9999" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary", children: /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-white/40", children: "Endereço" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "Av. Paulista, 1000 — São Paulo, SP" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: buildWhatsappContactUrl(), target: "_blank", rel: "noopener noreferrer", className: "mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
          "Falar agora pelo WhatsApp"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "rounded-3xl border border-border bg-card p-8 lg:col-span-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold tracking-tight", children: "Envie sua mensagem" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Responderemos em até 1 dia útil." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nome" }),
            /* @__PURE__ */ jsx(Input, { id: "name", name: "name", required: true, placeholder: "Seu nome" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "condo", children: "Condomínio" }),
            /* @__PURE__ */ jsx(Input, { id: "condo", name: "condo", placeholder: "Nome do empreendimento" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "E-mail" }),
            /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", required: true, placeholder: "voce@email.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Telefone" }),
            /* @__PURE__ */ jsx(Input, { id: "phone", name: "phone", placeholder: "(11) 99999-9999" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "message", children: "Mensagem" }),
          /* @__PURE__ */ jsx(Textarea, { id: "message", name: "message", rows: 5, placeholder: "Conte um pouco sobre o seu projeto, número de moradores, espaço disponível...", required: true })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", size: "lg", disabled: submitting, className: "mt-6 w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto", children: [
          /* @__PURE__ */ jsx(Send, { className: "mr-1.5 h-4 w-4" }),
          submitting ? "Enviando..." : "Enviar mensagem"
        ] })
      ] })
    ] })
  ] });
}
export {
  ContatoPage as component
};
