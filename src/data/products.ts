export type CategorySlug = "evo" | "select" | "peso-livre" | "cardio";

export type Category = {
  slug: CategorySlug;
  label: string;
  short: string;
  description: string;
};

export type Product = {
  id: string;
  sku?: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
  relatedIds: string[];
  active?: boolean;
  monthlyRent?: number; // referência de aluguel mensal (R$)
  image?: string; // base64 ou URL
};

export const categories: Category[] = [
  {
    slug: "evo",
    label: "Linha Evo",
    short: "Evolução em biomecânica",
    description:
      "Equipamentos com curvas de carga progressivas e acabamento premium para academias de condomínios de alto padrão.",
  },
  {
    slug: "select",
    label: "Linha Select",
    short: "Seleção profissional",
    description:
      "Estações compactas e versáteis pensadas para otimizar espaço sem abrir mão da performance profissional.",
  },
  {
    slug: "peso-livre",
    label: "Peso Livre",
    short: "Treino livre e funcional",
    description:
      "Bancos, racks, halteres e anilhas olímpicas com revestimentos antiaderentes e acabamento high-end.",
  },
  {
    slug: "cardio",
    label: "Cárdio",
    short: "Cardio silencioso e premium",
    description:
      "Esteiras, bikes, elípticos e remos com baixo ruído e consoles inteligentes — pensados para áreas comuns.",
  },
];

export const products: Product[] = [
  // ===== EVO =====
  {
    id: "evo-leg-press",
    name: "Leg Press 45° Evo",
    category: "evo",
    shortDescription: "Leg Press 45° com curva biomecânica otimizada.",
    description:
      "O Leg Press 45° Evo entrega uma curva de carga linear com pegada ergonômica, apoio lombar reforçado e plataforma antiderrapante de grande área. Estrutura em aço carbono com pintura eletrostática preta fosca.",
    specs: [
      { label: "Carga máxima", value: "500 kg" },
      { label: "Dimensões", value: "210 × 110 × 150 cm" },
      { label: "Peso", value: "245 kg" },
      { label: "Acabamento", value: "Aço carbono, pintura epóxi preta" },
    ],
    relatedIds: ["evo-supino", "evo-extensora", "evo-pulley"],
    monthlyRent: 890,
  },
  {
    id: "evo-supino",
    name: "Supino Reto Evo",
    category: "evo",
    shortDescription: "Supino reto com trajetória guiada e contrabalanço.",
    description:
      "Supino reto guiado com sistema de contrabalanço para descarga suave. Pegadas múltiplas em aço inox e estofado de alta densidade.",
    specs: [
      { label: "Carga máxima", value: "200 kg" },
      { label: "Dimensões", value: "180 × 160 × 130 cm" },
      { label: "Peso", value: "165 kg" },
    ],
    relatedIds: ["evo-leg-press", "evo-extensora", "evo-remada"],
    monthlyRent: 690,
  },
  {
    id: "evo-extensora",
    name: "Cadeira Extensora Evo",
    category: "evo",
    shortDescription: "Extensora com came elíptica para resistência uniforme.",
    description:
      "Cadeira extensora com came elíptica que entrega resistência uniforme em toda a amplitude. Banco com regulagem rápida em 8 posições.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "120 × 90 × 150 cm" },
      { label: "Peso", value: "140 kg" },
    ],
    relatedIds: ["evo-leg-press", "evo-supino", "evo-pulley"],
    monthlyRent: 590,
  },
  {
    id: "evo-pulley",
    name: "Pulley Frontal Evo",
    category: "evo",
    shortDescription: "Pulley frontal com polias rolamentadas premium.",
    description:
      "Pulley com polias rolamentadas, cabo de aço revestido e múltiplas posições de barra. Apoio de coxa ajustável.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "140 × 110 × 220 cm" },
      { label: "Peso", value: "180 kg" },
    ],
    relatedIds: ["evo-remada", "evo-supino", "evo-extensora"],
    monthlyRent: 620,
  },
  {
    id: "evo-remada",
    name: "Remada Sentada Evo",
    category: "evo",
    shortDescription: "Remada sentada com apoio peitoral ajustável.",
    description:
      "Remada sentada com apoio peitoral ajustável e pegadas neutras/pronadas. Ideal para fortalecimento de dorsais.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "150 × 90 × 160 cm" },
      { label: "Peso", value: "170 kg" },
    ],
    relatedIds: ["evo-pulley", "evo-supino", "evo-leg-press"],
    monthlyRent: 610,
  },

  // ===== SELECT =====
  {
    id: "select-crossover",
    name: "Crossover Select",
    category: "select",
    shortDescription: "Crossover dual ajustável de 12 alturas.",
    description:
      "Crossover com duas torres ajustáveis em 12 alturas, polias 1:1 para movimentos funcionais e pull-up bar superior.",
    specs: [
      { label: "Carga", value: "2× 90 kg em placas" },
      { label: "Dimensões", value: "320 × 130 × 230 cm" },
      { label: "Peso", value: "320 kg" },
    ],
    relatedIds: ["select-smith", "select-gluteo", "select-abdutor"],
    monthlyRent: 1290,
  },
  {
    id: "select-smith",
    name: "Smith Machine Select",
    category: "select",
    shortDescription: "Smith Machine com trilhos lineares de baixo atrito.",
    description:
      "Smith machine com trilhos lineares de baixo atrito, sistema de travamento giratório e suportes de segurança ajustáveis.",
    specs: [
      { label: "Carga máxima", value: "300 kg" },
      { label: "Dimensões", value: "220 × 170 × 220 cm" },
      { label: "Peso", value: "280 kg" },
    ],
    relatedIds: ["select-crossover", "select-gluteo", "peso-rack"],
    monthlyRent: 990,
  },
  {
    id: "select-gluteo",
    name: "Glúteo 4 em 1 Select",
    category: "select",
    shortDescription: "Estação para glúteos com 4 padrões de movimento.",
    description:
      "Estação dedicada para glúteos com 4 padrões de movimento e apoios estofados de alta densidade.",
    specs: [
      { label: "Carga", value: "100 kg em placas" },
      { label: "Dimensões", value: "150 × 110 × 140 cm" },
      { label: "Peso", value: "175 kg" },
    ],
    relatedIds: ["select-abdutor", "select-adutor", "select-crossover"],
    monthlyRent: 690,
  },
  {
    id: "select-abdutor",
    name: "Abdutor Select",
    category: "select",
    shortDescription: "Abdutor com regulagem rápida de amplitude.",
    description:
      "Cadeira abdutora com regulagem rápida de amplitude, estofado anatômico e apoio lombar reforçado.",
    specs: [
      { label: "Carga", value: "80 kg em placas" },
      { label: "Dimensões", value: "120 × 100 × 150 cm" },
      { label: "Peso", value: "150 kg" },
    ],
    relatedIds: ["select-adutor", "select-gluteo", "select-crossover"],
    monthlyRent: 540,
  },
  {
    id: "select-adutor",
    name: "Adutor Select",
    category: "select",
    shortDescription: "Adutor com curva de resistência otimizada.",
    description:
      "Cadeira adutora com curva de resistência otimizada, ideal para trabalho de adutores em academias premium.",
    specs: [
      { label: "Carga", value: "80 kg em placas" },
      { label: "Dimensões", value: "120 × 100 × 150 cm" },
      { label: "Peso", value: "150 kg" },
    ],
    relatedIds: ["select-abdutor", "select-gluteo", "select-crossover"],
    monthlyRent: 540,
  },

  // ===== PESO LIVRE =====
  {
    id: "peso-banco",
    name: "Banco Olímpico Ajustável",
    category: "peso-livre",
    shortDescription: "Banco ajustável de 7 posições, plano a inclinado.",
    description:
      "Banco olímpico ajustável em 7 posições com estofado de alta densidade, base reforçada e roldanas de transporte.",
    specs: [
      { label: "Carga máxima", value: "350 kg" },
      { label: "Posições", value: "7 reclinações" },
      { label: "Peso", value: "45 kg" },
    ],
    relatedIds: ["peso-rack", "peso-halteres", "peso-anilhas"],
    monthlyRent: 290,
  },
  {
    id: "peso-rack",
    name: "Rack de Agachamento Profissional",
    category: "peso-livre",
    shortDescription: "Rack com gaiola de segurança e barra fixa superior.",
    description:
      "Rack com gaiola de segurança, barra fixa superior, suportes em J e ganchos para anilhas. Estrutura 75 × 75 mm.",
    specs: [
      { label: "Carga máxima", value: "500 kg" },
      { label: "Dimensões", value: "180 × 140 × 230 cm" },
      { label: "Peso", value: "180 kg" },
    ],
    relatedIds: ["peso-banco", "peso-barra", "peso-anilhas"],
    monthlyRent: 690,
  },
  {
    id: "peso-halteres",
    name: "Kit Halteres 1–50 kg",
    category: "peso-livre",
    shortDescription: "Conjunto completo emborrachado, 1 a 50 kg.",
    description:
      "Conjunto completo de halteres emborrachados de 1 kg a 50 kg, em pares, com suporte triplo em aço.",
    specs: [
      { label: "Faixa", value: "1 a 50 kg (pares)" },
      { label: "Material", value: "Borracha cromada" },
      { label: "Inclui", value: "Suporte triplo" },
    ],
    relatedIds: ["peso-banco", "peso-rack", "peso-anilhas"],
    monthlyRent: 1490,
  },
  {
    id: "peso-anilhas",
    name: "Kit Anilhas Olímpicas",
    category: "peso-livre",
    shortDescription: "Anilhas olímpicas emborrachadas, 1,25 a 25 kg.",
    description:
      "Kit de anilhas olímpicas emborrachadas de 1,25 a 25 kg, com furo de 50 mm e cabos integrados.",
    specs: [
      { label: "Faixa", value: "1,25 a 25 kg" },
      { label: "Furo", value: "50 mm olímpico" },
      { label: "Acabamento", value: "Borracha preta" },
    ],
    relatedIds: ["peso-rack", "peso-barra", "peso-halteres"],
    monthlyRent: 590,
  },
  {
    id: "peso-barra",
    name: "Barra Olímpica 20 kg",
    category: "peso-livre",
    shortDescription: "Barra olímpica 20 kg com rolamentos premium.",
    description:
      "Barra olímpica de 20 kg com rolamentos de agulha, knurling médio e capacidade dinâmica de 700 kg.",
    specs: [
      { label: "Peso", value: "20 kg" },
      { label: "Comprimento", value: "2,20 m" },
      { label: "Capacidade", value: "700 kg dinâmico" },
    ],
    relatedIds: ["peso-anilhas", "peso-rack", "peso-banco"],
    monthlyRent: 190,
  },

  // ===== CÁRDIO =====
  {
    id: "cardio-esteira",
    name: "Esteira Pro Silent",
    category: "cardio",
    shortDescription: "Esteira profissional com tecnologia de baixo ruído.",
    description:
      "Esteira profissional com motor AC 4 HP, tecnologia de amortecimento dinâmico e console touch 15\". Operação ultra-silenciosa, ideal para áreas comuns de condomínios.",
    specs: [
      { label: "Motor", value: "4 HP AC contínuo" },
      { label: "Velocidade", value: "1 a 22 km/h" },
      { label: "Console", value: "Touch 15\" Android" },
      { label: "Carga máx.", value: "180 kg" },
    ],
    relatedIds: ["cardio-bike-vert", "cardio-eliptico", "cardio-remo"],
    monthlyRent: 1290,
  },
  {
    id: "cardio-bike-vert",
    name: "Bike Vertical Pro",
    category: "cardio",
    shortDescription: "Bike vertical com resistência magnética silenciosa.",
    description:
      "Bike vertical com sistema magnético de 32 níveis, console com programas pré-definidos e suporte para tablet.",
    specs: [
      { label: "Resistência", value: "Magnética 32 níveis" },
      { label: "Roda", value: "13 kg" },
      { label: "Carga máx.", value: "150 kg" },
    ],
    relatedIds: ["cardio-bike-horiz", "cardio-esteira", "cardio-eliptico"],
    monthlyRent: 690,
  },
  {
    id: "cardio-bike-horiz",
    name: "Bike Horizontal Confort",
    category: "cardio",
    shortDescription: "Bike horizontal com encosto ergonômico premium.",
    description:
      "Bike horizontal com encosto ergonômico, ajuste de banco assistido por gás e console com 12 programas.",
    specs: [
      { label: "Resistência", value: "Magnética 24 níveis" },
      { label: "Carga máx.", value: "150 kg" },
      { label: "Console", value: "LCD 7\"" },
    ],
    relatedIds: ["cardio-bike-vert", "cardio-esteira", "cardio-remo"],
    monthlyRent: 690,
  },
  {
    id: "cardio-eliptico",
    name: "Elíptico Cross Pro",
    category: "cardio",
    shortDescription: "Elíptico com passada longa e movimento suave.",
    description:
      "Elíptico com passada de 50 cm, sistema magnético de 24 níveis e console LCD 10\". Movimento articulado para baixo impacto.",
    specs: [
      { label: "Passada", value: "50 cm" },
      { label: "Resistência", value: "Magnética 24 níveis" },
      { label: "Carga máx.", value: "150 kg" },
    ],
    relatedIds: ["cardio-esteira", "cardio-bike-vert", "cardio-remo"],
    monthlyRent: 890,
  },
  {
    id: "cardio-remo",
    name: "Remo Ergômetro Air",
    category: "cardio",
    shortDescription: "Remo ergômetro com resistência por ar.",
    description:
      "Remo ergômetro com resistência por ar, monitor PM5 e estrutura dobrável. Treino completo de corpo inteiro.",
    specs: [
      { label: "Resistência", value: "Por ar (variável)" },
      { label: "Monitor", value: "PM5" },
      { label: "Carga máx.", value: "150 kg" },
    ],
    relatedIds: ["cardio-eliptico", "cardio-esteira", "cardio-bike-vert"],
    monthlyRent: 590,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}
