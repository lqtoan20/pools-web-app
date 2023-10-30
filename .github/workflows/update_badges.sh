#!/bin/bash

badges='<div style="display: flex;">'
badges+=' <a href="https://fyc-pr-'"$PR_NUMBER"'.awsacsnp.autotrader.com/cars-for-sale/all-cars" target="_blank"><img alt="Autotrader" src="https://img.shields.io/badge/Autotrader-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=e85b00"/></a>'
badges+=' <a href="https://fyc-pr-'"$PR_NUMBER"'.awsacsnp.autotrader.com/cars-for-sale/all-cars?brand=kbb" target="_blank"><img alt="KBB" src="https://img.shields.io/badge/KBB-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=1F3E74"/></a>'
badges+=' <a href="https://fyc-pr-'"$PR_NUMBER"'.awsacsnp.autotrader.com/cars-for-sale/all-cars?brand=ford" target="_blank"><img alt="Ford" src="https://img.shields.io/badge/Ford-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=234EAE"/></a>'
badges+=' <a href="https://cai-jenkins.awsacsnp.autotrader.com/job/find-car/view/change-requests/job/PR-'"$PR_NUMBER"'/" target="_blank"><img alt="Jenkins" src="https://img.shields.io/badge/Jenkins-100000?style=for-the-badge&logo=jenkins&logoColor=000000&labelColor=f0d6b7&color=f0d6b7"/></a>'
badges+=' <a href="https://cloud.cypress.io/projects/ro3nwv/runs?branches=%5B%7B%22label%22%3A%22fyc-PR-'"$PR_NUMBER"'%22%2C%22suggested%22%3Afalse%2C%22value%22%3A%22fyc-PR-'"$PR_NUMBER"'%22%7D%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D" target="_blank"><img alt="Cypress" src="https://img.shields.io/badge/Cypress-100000?style=for-the-badge&logo=cypress&logoColor=000000&labelColor=c2f1de&color=c2f1de"/></a>'
badges+=' </div>\n\n'

if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN is not set. Exiting..."
  exit 1
fi

# Check if the PR body contains the badges and update if not
if ! curl -s -H "Authorization: token $GITHUB_TOKEN" -X GET "https://api.github.com/repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER" | jq -e ".body" | grep -q "$badges"; then
  updated_body="$badges$(curl -s -H "Authorization: token $GITHUB_TOKEN" -X GET "https://api.github.com/repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER" | jq -r ".body")"
  curl -s -H "Authorization: token $GITHUB_TOKEN" -X PATCH "https://api.github.com/repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER" -d '{"body": "'"${updated_body}"'"}'
else
  echo 'Badges already exist for this PR'
fi
