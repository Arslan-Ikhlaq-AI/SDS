#!/bin/bash
#
# Runs ON YOUR COMPUTER. Builds the frontend, commits everything and pushes
# to GitHub. The server checks GitHub every 2 minutes and deploys new commits
# on its own (see server-deploy.sh).
#
#   ./deploy.sh "what you changed"

set -euo pipefail

cd "$(dirname "$0")"

message="${1:-}"
if [[ -z "$message" ]]; then
    echo 'Usage: ./deploy.sh "what you changed"'
    exit 1
fi

branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$branch" != "main" ]]; then
    echo "You are on '$branch'. Switch to main first: git checkout main"
    exit 1
fi

echo "→ Getting latest from GitHub"
git pull --rebase --autostash origin main

echo "→ Building frontend"
npm run build

echo "→ Committing"
git add -A
if git diff --cached --quiet; then
    echo "Nothing new to commit."
else
    git commit -m "$message"
fi

echo "→ Pushing to GitHub"
git push origin main

echo
echo "✔ Pushed. The live site updates within about 2 minutes: https://sdsrealestate.ae"
