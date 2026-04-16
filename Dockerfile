# BUILD
FROM oven/bun:1.1.0 AS build

WORKDIR /app

# Aceita env vars como build args para bake no Vite
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_GOOGLE_PLACE_ID
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_PLACE_ID=$VITE_GOOGLE_PLACE_ID

COPY . .

RUN bun install
RUN bun run build

# SERVE
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80