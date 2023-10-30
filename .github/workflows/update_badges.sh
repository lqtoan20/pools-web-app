#!/bin/bash

badges='<div style="display: flex;">'
badges+=' <a href="https://fyc-pr-'"$1"'.awsacsnp.autotrader.com/cars-for-sale/all-cars" target="_blank"><img alt="Autotrader" src="https://img.shields.io/badge/Autotrader-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=e85b00"/></a>'
# ...
badges+=' </div>\n\n'

if [ -z "$2" ]; then
  echo "GITHUB_TOKEN is not set. Exiting..."
  exit 1
fi

pr_body=$(curl -s -H "Authorization: token $2" -X GET "https://api.github.com/repos/$3/pulls/$1" | jq -r ".body")

# Escape the PR body for JSON
escaped_body=$(echo "$pr_body" | jq -s -R -r @uri)

# Check if the PR body contains the badges and update if not
if ! echo "$escaped_body" | grep -q "$badges"; then
  updated_body="$badges$pr_body"
  escaped_updated_body=$(echo "$updated_body" | jq -s -R -r @uri)
  curl -s -H "Authorization: token $2" -X PATCH "https://api.github.com/repos/$3/pulls/$1" -d '{"body": "'"${escaped_updated_body}"'"}'
else
  echo 'Badges already exist for this PR'
fi
