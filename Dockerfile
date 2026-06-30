FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=builder /app/dist ./dist
COPY server.mjs ./server.mjs
COPY package*.json ./
RUN npm install express --omit=dev --legacy-peer-deps
EXPOSE 3000
CMD ["node", "server.mjs"]
