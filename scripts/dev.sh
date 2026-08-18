#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

pnpm css
mkdir -p bin
go build -o bin/server ./backend/cmd/server

echo "→ http://localhost:8080"
SITE_ROOT=. exec ./bin/server
