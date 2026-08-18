FROM node:22-alpine AS css
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY css/input.css ./css/input.css
COPY templates ./templates
RUN pnpm css

FROM golang:1.22-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY backend ./backend
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/server ./backend/cmd/server

FROM gcr.io/distroless/static-debian12
WORKDIR /app
COPY --from=build /out/server /app/server
COPY templates /app/templates
COPY static /app/static
COPY --from=css /app/css/output.css /app/css/output.css
ENV PORT=8080
ENV SITE_ROOT=/app
EXPOSE 8080
CMD ["/app/server"]
