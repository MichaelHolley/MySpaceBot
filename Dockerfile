# --- Stage 1: Install deps ---
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# --- Stage 2: Build ---
FROM deps AS build
WORKDIR /app
COPY . .
RUN bun build index.ts --target bun --outfile dist/bot.js

# --- Stage 3: Production ---
FROM oven/bun:1-slim
WORKDIR /app
COPY --from=build /app/dist/bot.js ./bot.js


CMD ["bun", "bot.js"]