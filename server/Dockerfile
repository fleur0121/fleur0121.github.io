# syntax=docker/dockerfile:1

FROM debian:bookworm-slim AS build-c
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential cmake ca-certificates git && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY SimpleShell /src/SimpleShell
RUN cmake -S /src/SimpleShell -B /src/build && cmake --build /src/build

FROM node:20-slim
ENV NODE_ENV=production
WORKDIR /app
RUN useradd -m appuser
COPY --chown=appuser:appuser server/package.json /app/
RUN npm install --omit=dev && npm cache clean --force
COPY --chown=appuser:appuser server /app
COPY --from=build-c --chown=appuser:appuser /src/build/shell /app/bin/simpleshell
USER appuser
EXPOSE 8080
CMD ["node", "pty-server.js"]
