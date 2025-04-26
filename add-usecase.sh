#!/bin/bash
# filepath: /workspaces/aws-cdk-cdp/add-usecase.sh

# Usage: ./add-usecase.sh my-usecase
# Description: Initialize a new CDK usecase project with the specified name

if [ -z "$1" ]; then
    echo "Error: workspaces_name parameter is required."
    exit 1
fi

workspaces_name=$1
npm init -w workspaces/${workspaces_name} -y
cd workspaces/${workspaces_name}
rm package.json
cdk init app --language typescript
cd ../../
cp -f tsconfig_usecases.json ./workspaces/${workspaces_name}/tsconfig.json
cp -f README_usecase_template.md ./workspaces/${workspaces_name}/README.md
cp -f overview_template.drawio.svg ./workspaces/${workspaces_name}/overview.drawio.svg
npm install -w workspaces/${workspaces_name} --save aws-cdk-lib constructs change-case-commonjs
npm install -w workspaces/sample --save-dev cdk-nag cross-env @types/js-yaml

exit 0