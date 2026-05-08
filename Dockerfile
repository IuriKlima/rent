# Imagem mínima — apenas roda o servidor já buildado
FROM node:22-alpine
WORKDIR /app

# Copia apenas o output pré-buildado (sem node_modules, sem source)
COPY .output ./.output

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
