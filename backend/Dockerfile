FROM node:18-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./package.json
RUN addgroup -g 1001 nodejs
RUN adduser -D -h -u 1001:1001 app
USER app
EXPOSE 5000
CMD ["node", "dist/index.js"]
