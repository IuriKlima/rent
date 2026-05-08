import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buildWhatsappContactUrl } from "@/store/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Fale com um consultor — Rent Fitness" },
      {
        name: "description",
        content:
          "Fale com um consultor especialista da Rent Fitness e receba uma proposta sob medida para o seu condomínio.",
      },
      { property: "og:title", content: "Fale com um consultor — Rent Fitness" },
      {
        property: "og:description",
        content:
          "Atendimento dedicado para projetos de academia de condomínios premium.",
      },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Mensagem enviada", {
        description:
          "Recebemos sua solicitação. Um consultor entrará em contato em breve.",
      });
    }, 800);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Contato
        </span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
          Fale com um consultor especialista.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Envie sua mensagem ou inicie uma conversa direta no WhatsApp. Vamos
          desenhar a academia perfeita para o seu condomínio.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        {/* INFOS */}
        <aside className="lg:col-span-2">
          <div className="rounded-3xl bg-secondary p-8 text-secondary-foreground">
            <h2 className="text-xl font-extrabold tracking-tight">
              Rent Fitness
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Atendimento exclusivo para síndicos e administradoras.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    E-mail
                  </p>
                  <p className="text-sm font-semibold">
                    contato@rentfitness.com.br
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Telefone
                  </p>
                  <p className="text-sm font-semibold">+55 11 92491-3426</p>
                  <p className="text-sm text-muted-foreground">Seg a Sex, 9h às 18h</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Endereço
                  </p>
                  <p className="text-sm font-semibold">
                    Av. Paulista, 1000 — São Paulo, SP
                  </p>
                </div>
              </li>
            </ul>

            <a
              href={buildWhatsappContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Falar agora pelo WhatsApp
            </a>
          </div>
        </aside>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-8 lg:col-span-3"
        >
          <h2 className="text-xl font-extrabold tracking-tight">
            Envie sua mensagem
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Responderemos em até 1 dia útil.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" required placeholder="Seu nome" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="condo">Condomínio</Label>
              <Input
                id="condo"
                name="condo"
                placeholder="Nome do empreendimento"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="voce@email.com"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" name="phone" placeholder="(11) 99999-9999" />
            </div>
          </div>

          <div className="mt-5 grid gap-1.5">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Conte um pouco sobre o seu projeto, número de moradores, espaço disponível..."
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto"
          >
            <Send className="mr-1.5 h-4 w-4" />
            {submitting ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </form>
      </div>
    </div>
  );
}
