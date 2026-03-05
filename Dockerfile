# --- Étape 1 : Build ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts prisma.config.ts
RUN npm install
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate
COPY . .
RUN npm run build

# --- Étape 2 : Runtime ---
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts prisma.config.ts
RUN npm install --include=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated

EXPOSE 3000
CMD ["sh", "-c", "npm run db:deploy && npm run start"]