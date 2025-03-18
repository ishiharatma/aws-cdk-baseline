#!/bin/bash
set -ex


npm config set strict-ssl false
npm config set registry http://registry.npmjs.org/

cd /workspaces/${localWorkspaceFolderBasename}
test -f package.json && npm install || echo 'No package.json found, skipping npm install'

node -v
aws --version
cdk --version

aws configure list
