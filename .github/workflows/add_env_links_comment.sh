#!/bin/bash

# This script generates and updates PR content
# You can customize this logic as needed

pr_number=$1

badges_html=$(cat <<HTML
<div style="display: flex;">
<a href="https://fyc-pr-${pr_number}.awsacsnp.autotrader.com/cars-for-sale/all-cars" target="_blank"><img alt="Autotrader" src="https://img.shields.io/badge/Autotrader-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=e85b00"/></a>
<a href="https://fyc-pr-${pr_number}.awsacsnp.autotrader.com/cars-for-sale/all-cars?brand=kbb" target="_blank"><img alt="KBB" src="https://img.shields.io/badge/KBB-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=1F3E74"/></a>
<a href="https://fyc-pr-${pr_number}.awsacsnp.autotrader.com/cars-for-sale/all-cars?brand=ford" target="_blank"><img alt="Ford" src="https://img.shields.io/badge/Ford-100000?style=for-the-badge&logo=&logoColor=F08A23&labelColor=FFFFFF&color=234EAE"/></a>
<!-- Add more badges as needed -->
</div>
HTML
)

if [[ -z "$pr_number" ]]; then
  echo "PR number is missing."
  exit 1
fi

# Check if the comment already exists
if ! curl -s "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$pr_number/comments" | jq -e ".[] | select(.body | contains(\"Environment Links: $badges_html\"))" > /dev/null; then
  # Add a new comment
  curl -s -H "Authorization: token $GITHUB_TOKEN" -d "{\"body\":\"Environment Links:\n$badges_html\"}" -X POST "https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$1/comments"
else
  echo "Comment already exists for PR $pr_number"
fi

# Replace this with your logic
echo "PR content for PR $pr_number:"
echo "$badges_html"

# Exit with a status code (0 for success, non-zero for failure)
exit 0
