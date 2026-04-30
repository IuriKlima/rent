import { useCart, buildWhatsappUrl } from "@/store/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, clear } = useCart();
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const whatsappUrl = buildWhatsappUrl(items);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 sm:max-w-md p-0"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Seu orçamento
          </SheetTitle>
          <SheetDescription>
            {totalItems > 0
              ? `${totalItems} ${totalItems === 1 ? "item" : "itens"} selecionado${totalItems === 1 ? "" : "s"}.`
              : "Adicione equipamentos e envie sua cotação pelo WhatsApp."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Seu orçamento está vazio.
              </p>
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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar cotação pelo WhatsApp
            </a>
            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground"
            >
              Limpar orçamento
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
