# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Limitar memória do Node para evitar OOM kill
ENV NODE_OPTIONS="--max-old-space-size=512"

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

# Build args para Supabase
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# Stage 2: Production (imagem mínima)
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
