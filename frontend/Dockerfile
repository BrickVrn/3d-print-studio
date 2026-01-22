FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=0 /app/.next /app/.next
COPY --from=0 /app/public /app/public
COPY --from=0 /app/node_modules /app/node_modules
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
