#!/usr/bin/env bash
# Promote [Contract]/[UI]/[Test] items whose sprint has started: Icebox → Backlog.
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
      sprint: field(name:"Sprint") {
        ... on ProjectV2IterationField {
          id
          configuration {
            iterations { id title startDate duration }
          }
        }
      }
    }
  }
}' -f org="$ORG" -F n="$PROJECT_NUMBER")

PROJECT_ID=$(echo "$META" | jq -r '.data.organization.projectV2.id')
STATUS_FIELD=$(echo "$META" | jq -r '.data.organization.projectV2.field.id')
BACKLOG_ID=$(echo "$META" | jq -r '.data.organization.projectV2.field.options[] | select(.name=="Backlog") | .id')
TODAY=$(date -u +%F)

echo "Today (UTC): $TODAY"
echo "$META" | jq -r --arg today "$TODAY" '
  .data.organization.projectV2.sprint.configuration.iterations[]
  | select(.startDate <= $today)
  | "due\t\(.id)\t\(.title)\t\(.startDate)"
'

echo "$META" | jq -r --arg today "$TODAY" '
  .data.organization.projectV2.sprint.configuration.iterations[]
  | select(.startDate <= $today)
  | .id
' > /tmp/due_ids.txt

CURSOR=""
PROMOTED=0
SCANNED=0
: > /tmp/to_promote.txt

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
          fieldValues(first:30) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field { ... on ProjectV2FieldCommon { name } }
              }
              ... on ProjectV2ItemFieldIterationValue {
                iterationId
                title
                field { ... on ProjectV2FieldCommon { name } }
              }
            }
          }
          content {
            ... on Issue { title }
            ... on DraftIssue { title }
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
          fieldValues(first:30) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field { ... on ProjectV2FieldCommon { name } }
              }
              ... on ProjectV2ItemFieldIterationValue {
                iterationId
                title
                field { ... on ProjectV2FieldCommon { name } }
              }
            }
          }
          content {
            ... on Issue { title }
            ... on DraftIssue { title }
          }
        }
      }
    }
  }
}' -f org="$ORG" -F n="$PROJECT_NUMBER" -f c="$CURSOR" > /tmp/page.json
  fi

  python3 - <<'PY'
import json, re
due = set(open("/tmp/due_ids.txt").read().split())
page = json.load(open("/tmp/page.json"))
items = page["data"]["organization"]["projectV2"]["items"]["nodes"]
info = page["data"]["organization"]["projectV2"]["items"]["pageInfo"]
open("/tmp/scanned.txt", "w").write(str(len(items)))
open("/tmp/has_next.txt", "w").write("1" if info["hasNextPage"] else "0")
open("/tmp/cursor.txt", "w").write(info.get("endCursor") or "")
with open("/tmp/to_promote.txt", "a") as out:
    for it in items:
        title = ((it.get("content") or {}).get("title")) or ""
        status = None
        sprint_id = None
        for fv in it.get("fieldValues", {}).get("nodes") or []:
            if not fv or "field" not in fv:
                continue
            fname = fv["field"]["name"]
            if fname == "Status" and "name" in fv:
                status = fv["name"]
            if fname == "Sprint" and "iterationId" in fv:
                sprint_id = fv["iterationId"]
        if status == "Icebox" and sprint_id in due and re.match(r"^\[(Contract|UI|Test)\]", title):
            out.write(it["id"] + "\n")
PY

  SCANNED=$((SCANNED + $(cat /tmp/scanned.txt)))
  if [ "$(cat /tmp/has_next.txt)" != "1" ]; then
    break
  fi
  CURSOR=$(cat /tmp/cursor.txt)
done

sort -u /tmp/to_promote.txt -o /tmp/to_promote.txt
while read -r ITEM_ID; do
  [ -z "$ITEM_ID" ] && continue
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
    -f option="$BACKLOG_ID" >/dev/null
  PROMOTED=$((PROMOTED + 1))
  echo "Promoted $ITEM_ID -> Backlog"
done < /tmp/to_promote.txt

echo "Scanned nodes: $SCANNED"
echo "Promoted to Backlog: $PROMOTED"
