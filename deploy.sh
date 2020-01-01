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
target_branch="release"

echo -e "${BLUE}Replacing version in package.json...${NC}"
sed -i.bak "s/\"version\": \".*\",/\"version\": \"${version}\",/" package.json
rm package.json.bak
echo -e "${BLUE}Committing package.json...${NC}"
git add package.json
git commit -m "VERSION ${version}"
echo -e  "${BLUE}Pushing commit...${NC}"
git push origin master
echo -e  "${BLUE}Checking out '${target_branch}' branch...${NC}"
git checkout ${target_branch}
echo -e  "${BLUE}Pulling '${target_branch}' branch...${NC}"
git pull origin ${target_branch}
echo -e  "${BLUE}Merging 'master' branch into '${target_branch}'...${NC}"
git merge master -m "Merging from 'master' to release version ${version}"
echo -e  "${BLUE}Release version ${version} pushing '${target_branch}' branch...${NC}"
git push origin ${target_branch}
git checkout master
echo -e  "${GREEN}Version ${version} released${NC}"
