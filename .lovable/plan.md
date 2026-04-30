
# Plano — MVP Rent Fitness

Site institucional + catálogo de locação de equipamentos para síndicos, com carrinho que envia cotação por WhatsApp.

## Identidade visual

- Paleta: **branco** (fundo), **preto** (texto/superfícies premium) e **laranja** (#FF6A00 aprox., acento e CTAs).
- Tipografia: **Montserrat** (Google Fonts) — pesos 300/400/600/800.
- Estética minimalista estilo Apple: muito espaço em branco, cards com cantos arredondados (rounded-2xl), sombras suaves, glassmorphism nos toasts e no drawer do carrinho.
- Microanimações com Framer Motion (fade/slide nas seções, hover nos cards, drawer animado).
- Tokens semânticos em `src/styles.css` (oklch): `--background`, `--foreground`, `--primary` (laranja), `--accent`, etc. Light mode como padrão; dark opcional não será incluído.

## Arquitetura

Stack já existente: TanStack Start + React + Tailwind v4 + shadcn/ui + Lucide.

- Estado global do carrinho: **Zustand** com persistência em `localStorage`.
- Mock de dados: `src/data/products.ts` (4 categorias: Evo, Select, Peso Livre, Cárdio — ~5 produtos por linha).
- Sem backend / sem Lovable Cloud.
- Notificações: `sonner` (já disponível) estilizado com glassmorphism.

## Estrutura de rotas (TanStack file-based)

```
src/routes/
  __root.tsx              -> Header + Footer + Outlet + Drawer do carrinho + Toaster
  index.tsx               -> Home
  produtos.tsx            -> Catálogo com filtros por categoria (?categoria=evo)
  produto.$id.tsx         -> Detalhe do produto + cross-sell
  contato.tsx             -> Página de contato + WhatsApp
  admin.tsx               -> Painel admin (gate por senha client-side)
```

Cada rota terá `head()` próprio (title, description, og:title, og:description) em PT-BR.

## Componentes principais

```
src/components/
  layout/Header.tsx          -> Logo "Rent Fitness", nav, botão carrinho com badge
  layout/Footer.tsx          -> Links, contato, copyright
  layout/CartDrawer.tsx      -> Sheet shadcn deslizante; lista, qtd +/-, remover, CTA WhatsApp
  home/Hero.tsx              -> Headline + subheadline + CTA "Montar Catálogo"
  home/WhyRent.tsx           -> 4 cards (Wrench, RefreshCw, TrendingDown, Wallet)
  home/CategoriesShowcase.tsx-> 4 blocos linkando /produtos?categoria=...
  product/ProductCard.tsx    -> Card placeholder com gradiente + ícone Lucide
  product/CategoryFilter.tsx -> Chips de filtro
  admin/AdminGate.tsx        -> Modal de senha (senha fixa no código, ex: "rentfit2026")
  admin/ProductsTable.tsx    -> Tabela editável em memória
```

## Estado do carrinho (Zustand)

```ts
// src/store/cart.ts
type CartItem = { id, name, category, quantity }
useCart: { items, addItem, removeItem, updateQty, clear, totalCount }
// persist middleware -> localStorage "rentfit-cart"
```

## Mock de produtos

`src/data/products.ts` exporta:
- `categories`: `[{ slug: "evo", label: "Linha Evo" }, ...]`
- `products`: array tipado com `id, name, category, shortDescription, description, specs[], relatedIds[]`.

Exemplos por linha:
- **Evo**: Leg Press Evo, Supino Reto Evo, Cadeira Extensora Evo, Pulley Evo, Remada Evo.
- **Select**: Crossover Select, Smith Machine Select, Glúteo Select, Abdutor Select, Adutor Select.
- **Peso Livre**: Banco Olímpico, Rack Agachamento, Halteres 1–50kg, Anilhas Olímpicas, Barra Olímpica.
- **Cárdio**: Esteira Pro, Bike Vertical, Bike Horizontal, Elíptico, Remo Ergômetro.

## Carrinho → WhatsApp

Função `buildWhatsappUrl(items)`:
- Número placeholder: `5511999999999` (constante exportada para troca fácil).
- Mensagem: `"Olá, sou síndico e tenho interesse em um projeto de locação para o meu condomínio com os seguintes equipamentos: 1x Leg Press Evo (Linha Evo), 2x Esteira Pro (Cárdio)..."`
- `https://wa.me/<num>?text=<encodeURIComponent(msg)>`.

## Admin

- `/admin` mostra `AdminGate` (modal). Senha fixa `rentfit2026` (apenas barreira visual).
- Após desbloquear, exibe tabela de produtos com edição inline de nome/preço e botão "Inativar" — mutação somente em memória (estado local + Zustand opcional `useAdminProducts`). Avisar via toast que mudanças não persistem.

## SEO

Cada rota com `head()` único em português. Meta og:title/og:description distintos. H1 único por página.

## Detalhes técnicos

- Instalar dependência: `bun add zustand framer-motion`.
- Adicionar Montserrat via `<link>` em `__root.tsx` head + `font-family` no `body` via `styles.css`.
- Tokens em `src/styles.css`: `--primary` ≈ `oklch(0.70 0.19 45)` (laranja vibrante), foreground preto, background branco. Ajustar shadcn variables coerentes.
- Placeholders de imagem: componente `ProductPlaceholder` com gradiente preto→laranja sutil + ícone Lucide grande (Dumbbell, Bike, Activity, Footprints) por categoria.
- Toaster (sonner) com classe customizada glassmorphism (`backdrop-blur bg-white/70 border`).
- Drawer: `Sheet` do shadcn (lado direito).
- Animações: `motion.div` com fade-up nas seções da home; `AnimatePresence` no drawer de itens.

## Ordem de implementação

1. Tokens de cor + Montserrat + Header/Footer no `__root.tsx`.
2. `data/products.ts` + `store/cart.ts` (Zustand persist).
3. `CartDrawer` + integração com Header (badge + abrir drawer).
4. Home (Hero, WhyRent, CategoriesShowcase).
5. Catálogo `/produtos` com filtros via search param.
6. Detalhe `/produto/$id` + cross-sell.
7. Contato `/contato` (form simulado + botão WhatsApp).
8. Admin `/admin` com gate de senha + tabela editável.
9. Polish: animações, SEO meta, responsividade mobile.

## Fora do escopo (MVP)

- Autenticação real, backend, pagamentos, envio real de e-mail/form, upload de imagens, dark mode toggle, i18n.
