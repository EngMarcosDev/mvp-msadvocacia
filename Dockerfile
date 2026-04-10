# BUILD
FROM oven/bun:1.1.0 AS build

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

# SERVE
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80