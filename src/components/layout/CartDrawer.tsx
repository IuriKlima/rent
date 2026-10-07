import { useState } from "react";
import { useCart, buildWhatsappUrl, type WhatsappLead } from "@/store/cart";
import { useQuotes } from "@/store/quotes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  condominio: z
    .string()
    .trim()
    .min(2, "Informe o nome do condomínio.")
    .max(120, "Nome do condomínio muito longo."),
  phone: z.string().trim().min(8, "Informe um telefone válido.").max(20, "Telefone inválido."),
  email: z.string().trim().email("E-mail inválido.").max(160, "E-mail muito longo."),
});

const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

type Step = "items" | "lead";
type FieldErrors = Partial<Record<keyof WhatsappLead, string>>;

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, clear } = useCart();
  const addQuote = useQuotes((s) => s.addQuote);

  const [step, setStep] = useState<Step>("items");
  const [lead, setLead] = useState<WhatsappLead>({
    name: "",
    condominio: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  function setField(key: keyof WhatsappLead, value: string) {
    setLead((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    if (items.length === 0) {
      setStep("items");
      toast.error("Adicione ao menos um equipamento ao orçamento.");
      return;
    }
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof WhatsappLead;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const safeLead = parsed.data;

    const url = buildWhatsappUrl(items, safeLead);
    // Abra durante o gesto do usuário para evitar bloqueio de pop-up.
    const opened = window.open(url, "_blank");
    if (opened) opened.opener = null;
    setFallbackUrl(opened ? null : url);

    if (isSupabaseConfigured) {
      setSaving(true);
      try {
        await addQuote({ lead: safeLead, items: [...items] });
      } catch {
        toast.error("O orçamento não foi salvo no painel. Seus itens continuam aqui.");
        setSaving(false);
        return;
      }
      setSaving(false);
    }

    toast.info(
      opened ? "WhatsApp aberto. Revise e envie a mensagem." : "Use o link para abrir o WhatsApp.",
    );
  }

  function handleOpenChange(open: boolean) {
    setOpen(open);
    if (!open) {
      // reset wizard ao fechar
      setStep("items");
      setErrors({});
      setFallbackUrl(null);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md p-0">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <ShoppingBag className="h-5 w-5 text-primary" />
            {step === "items" ? "Seu orçamento" : "Seus dados"}
          </SheetTitle>
          <SheetDescription>
            {step === "items"
              ? totalItems > 0
                ? `${totalItems} ${totalItems === 1 ? "item" : "itens"} selecionado${totalItems === 1 ? "" : "s"}.`
                : "Adicione equipamentos e envie sua cotação pelo WhatsApp."
              : "Para finalizar, informe os dados do responsável."}
          </SheetDescription>
        </SheetHeader>

        {/* STEP 1: ITEMS */}
        {step === "items" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Seu orçamento está vazio.</p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-4 rounded-full"
                    onClick={() => setOpen(false)}
                  >
                    <Link to="/produtos">Ver catálogo</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{item.name}</p>
                          <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
                            {item.categoryLabel}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-border bg-background p-1">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-6 text-center text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Remover item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border bg-background/95 px-6 py-5">
                <Button
                  type="button"
                  onClick={() => setStep("lead")}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:opacity-90"
                  size="lg"
                >
                  Continuar
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Limpar orçamento
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: LEAD */}
        {step === "lead" && (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <button
                type="button"
                onClick={() => setStep("items")}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Voltar aos itens
              </button>

              <div className="mt-5 grid gap-4">
                <Field
                  id="lead-name"
                  label="Seu nome"
                  value={lead.name}
                  onChange={(v) => setField("name", v)}
                  error={errors.name}
                  placeholder="Ex: João Silva"
                  autoComplete="name"
                />
                <Field
                  id="lead-condominio"
                  label="Condomínio"
                  value={lead.condominio}
                  onChange={(v) => setField("condominio", v)}
                  error={errors.condominio}
                  placeholder="Ex: Edifício Vista Park"
                />
                <Field
                  id="lead-phone"
                  label="Telefone / WhatsApp"
                  value={lead.phone}
                  onChange={(v) => setField("phone", v)}
                  error={errors.phone}
                  placeholder="(11) 99999-9999"
                  type="tel"
                  autoComplete="tel"
                />
                <Field
                  id="lead-email"
                  label="E-mail"
                  value={lead.email}
                  onChange={(v) => setField("email", v)}
                  error={errors.email}
                  placeholder="voce@email.com"
                  type="email"
                  autoComplete="email"
                />
              </div>

              <p className="mt-5 text-xs text-muted-foreground">
                O WhatsApp abrirá com a mensagem preenchida. Revise e envie por lá. Seus dados são
                usados para retorno comercial.
              </p>
              {fallbackUrl && (
                <a
                  href={fallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-semibold text-primary underline underline-offset-4"
                >
                  Abrir mensagem no WhatsApp
                </a>
              )}
            </div>

            <div className="border-t border-border bg-background/95 px-6 py-5">
              <Button
                type="submit"
                disabled={saving}
                size="lg"
                className="w-full rounded-full bg-primary text-primary-foreground hover:opacity-90"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {saving ? "Registrando orçamento..." : "Abrir cotação no WhatsApp"}
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(error && "border-destructive focus-visible:ring-destructive")}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
