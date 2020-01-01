#!/bin/bash

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ $# -ne 1 ]
then
  >&2 echo "Usage: ./deploy.sh VERSION"
  exit 1
fi

version="${1}"

echo -e "${BLUE}Replacing version in package.json...${NC}"
sed -i.bak "s/\"version\": \".*\",/\"version\": \"${version}\",/" package.json
rm package.json.bak
echo -e "${BLUE}Creating a new dist${NC}"
npm run build
echo -e "${BLUE}Committing the new dist...${NC}"
git add .
git commit -m "VERSION ${version}"
echo -e  "${BLUE}Pushing commit...${NC}"
git push origin master
git subtree push --prefix dist origin gh-pages
echo -e  "${GREEN}Version ${version} released${NC}"
