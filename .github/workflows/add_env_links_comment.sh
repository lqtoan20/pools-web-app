#!/bin/bash

badges='<div style="display: flex;">'
badges+='<a href="https://fyc-pr-'$1'.awsacsnp.autotrader.com/cars-for-sale/all-cars" target="_blank"><img alt="Autotrader" src="https://img.shields.io/badge/Autotrader-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=e85b00"/></a>'
badges+='<a href="https://fyc-pr-'$1'.awsacsnp.autotrader.com/cars-for-sale/all-cars?brand=kbb" target="_blank"><img alt="KBB" src="https://img.shields.io/badge/KBB-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=1F3E74"/></a>'
badges+='<a href="https://fyc-pr-'$1'.awsacsnp.autotrader.com/cars-for-sale/all-cars?brand=ford" target="_blank"><img alt="Ford" src="https://img.shields.io/badge/Ford-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=234EAE"/></a>'
badges+='<a href="https://cai-jenkins.awsacsnp.autotrader.com/job/find-car/view/change-requests/job/PR-'$1'/" target="_blank"><img alt="Jenkins" src="https://img.shields.io/badge/Jenkins-100000?style=for-the-badge&logo=jenkins&logoColor=000000&labelColor=f0d6b7&color=f0d6b7"/></a>'
badges+='<a href="https://cloud.cypress.io/projects/ro3nwv/runs?branches=%5B%7B%22label%22%3A%22fyc-PR-'$1'%22%2C%22suggested%22%3Afalse%2C%22value%22%3A%22fyc-PR-'$1'%22%7D%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D" target="_blank"><img alt="Cypress" src="https://img.shields.io/badge/Cypress-100000?style=for-the-badge&logo=cypress&logoColor=000000&labelColor=c2f1de&color=c2f1de"/></a>'
badges+='</div>\n\n'

# Check if the comment already exists
if ! curl -s "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$1/comments" | jq -e ".[] | select(.body | contains(\"Environment Links: $badges\"))" > /dev/null; then
  # Add a new comment
  curl -s -H "Authorization: token $GITHUB_TOKEN" -d "{\"body\":\"Environment Links:\n$badges\"}" -X POST "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$1/comments"
else
  echo "Comment already exists for PR $1"
fi
