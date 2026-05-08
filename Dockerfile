# Imagem mínima — apenas roda o servidor já buildado
FROM node:22-alpine
WORKDIR /app

# Copia o output pré-buildado (sem node_modules, sem source)
COPY dist ./dist

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY server.mjs ./server.mjs
COPY package.json ./package.json
RUN npm install express --omit=dev --legacy-peer-deps

EXPOSE 3000

CMD ["node", "server.mjs"]
