#!/usr/bin/env bash
# Sync backend openapi.json → docs/static/openapi.json (public mirror for FE CI).
# Used by .github/workflows/sync-openapi.yml
set -euo pipefail

ORG="${ORG:-Capstone-Project-Team-B-2026}"
BACKEND_REPO="${BACKEND_REPO:-${ORG}/backend}"
REF="${OPENAPI_REF:-main}"
DEST="static/openapi.json"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "::error::GH_TOKEN required (read private backend + write docs)."
  exit 1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

echo "Fetching openapi.json from ${BACKEND_REPO}@${REF}..."
gh api \
  -H "Accept: application/vnd.github.raw" \
  "/repos/${BACKEND_REPO}/contents/openapi.json?ref=${REF}" \
  > "$TMP"

if [[ ! -s "$TMP" ]] || ! grep -qE '"openapi"[[:space:]]*:' "$TMP"; then
  echo "::error::Downloaded file is not a valid OpenAPI JSON."
  exit 1
fi

set_output() {
  local key="$1" val="$2"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "${key}=${val}" >> "$GITHUB_OUTPUT"
  fi
}

mkdir -p "$(dirname "$DEST")"
if [ -f "$DEST" ] && cmp -s "$TMP" "$DEST"; then
  echo "No change — ${DEST} already matches ${BACKEND_REPO}@${REF}"
  set_output changed false
  exit 0
fi

cp "$TMP" "$DEST"
PATHS=$(python3 -c "import json; print(len(json.load(open('$DEST'))['paths']))")
VER=$(python3 -c "import json; print(json.load(open('$DEST'))['info'].get('version',''))")
echo "Updated ${DEST} (info.version=${VER}, paths=${PATHS})"
set_output changed true
