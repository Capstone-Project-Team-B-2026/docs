#!/usr/bin/env bash
# Move closed issues / merged PRs on the org project to Status = Done.
# Safety net when built-in "Item closed" / "Pull request merged" workflows no-op
# (common after customizing Status options).
set -euo pipefail

ORG="${ORG:-Capstone-Project-Team-B-2026}"
PROJECT_NUMBER="${PROJECT_NUMBER:-2}"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "::error::Missing GH_TOKEN / PROJECT_TOKEN (needs org Projects write)."
  exit 1
fi

META=$(gh api graphql -f query='
query($org:String!, $n:Int!) {
  organization(login:$org) {
    projectV2(number:$n) {
      id
      field(name:"Status") {
        ... on ProjectV2SingleSelectField {
          id
          options { id name }
        }
      }
    }
  }
}' -f org="$ORG" -F n="$PROJECT_NUMBER")

PROJECT_ID=$(echo "$META" | jq -r '.data.organization.projectV2.id')
STATUS_FIELD=$(echo "$META" | jq -r '.data.organization.projectV2.field.id')
DONE_ID=$(echo "$META" | jq -r '.data.organization.projectV2.field.options[] | select(.name=="Done") | .id')

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "null" ] || [ -z "$DONE_ID" ] || [ "$DONE_ID" = "null" ]; then
  echo "::error::Could not resolve project Status/Done option."
  echo "$META" | jq .
  exit 1
fi

CURSOR=""
MOVED=0
SCANNED=0
: > /tmp/to_done.txt

while true; do
  if [ -z "$CURSOR" ]; then
    gh api graphql -f query='
query($org:String!, $n:Int!) {
  organization(login:$org) {
    projectV2(number:$n) {
      items(first:100) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          fieldValues(first:20) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field { ... on ProjectV2FieldCommon { name } }
              }
            }
          }
          content {
            ... on Issue { number title state repository { nameWithOwner } }
            ... on PullRequest { number title state merged repository { nameWithOwner } }
          }
        }
      }
    }
  }
}' -f org="$ORG" -F n="$PROJECT_NUMBER" > /tmp/page.json
  else
    gh api graphql -f query='
query($org:String!, $n:Int!, $c:String!) {
  organization(login:$org) {
    projectV2(number:$n) {
      items(first:100, after:$c) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          fieldValues(first:20) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field { ... on ProjectV2FieldCommon { name } }
              }
            }
          }
          content {
            ... on Issue { number title state repository { nameWithOwner } }
            ... on PullRequest { number title state merged repository { nameWithOwner } }
          }
        }
      }
    }
  }
}' -f org="$ORG" -F n="$PROJECT_NUMBER" -f c="$CURSOR" > /tmp/page.json
  fi

  python3 - <<'PY'
import json
page = json.load(open("/tmp/page.json"))
items = page["data"]["organization"]["projectV2"]["items"]["nodes"]
info = page["data"]["organization"]["projectV2"]["items"]["pageInfo"]
open("/tmp/scanned.txt", "w").write(str(len(items)))
open("/tmp/has_next.txt", "w").write("1" if info["hasNextPage"] else "0")
open("/tmp/cursor.txt", "w").write(info.get("endCursor") or "")
with open("/tmp/to_done.txt", "a") as out:
    for it in items:
        content = it.get("content") or {}
        if not content:
            continue
        status = None
        for fv in it.get("fieldValues", {}).get("nodes") or []:
            if not fv or "field" not in fv:
                continue
            if fv["field"]["name"] == "Status" and "name" in fv:
                status = fv["name"]
        if status == "Done":
            continue
        state = content.get("state")
        merged = content.get("merged")
        # CLOSED issues (incl. auto-closed by merged PR) or MERGED / merged PRs
        if state == "CLOSED" or state == "MERGED" or merged is True:
            repo = (content.get("repository") or {}).get("nameWithOwner") or "?"
            num = content.get("number")
            title = content.get("title") or ""
            out.write(f"{it['id']}\t{repo}#{num}\t{status}\t{title}\n")
PY

  SCANNED=$((SCANNED + $(cat /tmp/scanned.txt)))
  if [ "$(cat /tmp/has_next.txt)" != "1" ]; then
    break
  fi
  CURSOR=$(cat /tmp/cursor.txt)
done

sort -u /tmp/to_done.txt -o /tmp/to_done.txt
while IFS=$'\t' read -r ITEM_ID REF OLD_STATUS TITLE; do
  [ -z "${ITEM_ID:-}" ] && continue
  gh api graphql -f query='
mutation($project:ID!, $item:ID!, $field:ID!, $option:String!) {
  updateProjectV2ItemFieldValue(input: {
    projectId: $project
    itemId: $item
    fieldId: $field
    value: { singleSelectOptionId: $option }
  }) { projectV2Item { id } }
}' \
    -f project="$PROJECT_ID" \
    -f item="$ITEM_ID" \
    -f field="$STATUS_FIELD" \
    -f option="$DONE_ID" >/dev/null
  MOVED=$((MOVED + 1))
  echo "Done ← ${OLD_STATUS}: ${REF} — ${TITLE}"
done < /tmp/to_done.txt

echo "Scanned nodes: $SCANNED"
echo "Moved to Done: $MOVED"
