#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

pnpm css
mkdir -p bin
go build -o bin/server ./backend/cmd/server

pnpm css:watch >/dev/null 2>&1 &
CSS_PID=$!
trap 'kill $CSS_PID 2>/dev/null' EXIT INT TERM

echo "→ http://localhost:8080"
SITE_ROOT=. exec ./bin/server
