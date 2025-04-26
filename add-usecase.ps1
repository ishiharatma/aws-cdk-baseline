# Usage: 
# Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
#.\add-usecase.ps1 my-usecase
# Description: Initialize a new CDK usecase project with the specified name

param(
   [Parameter(Mandatory=$true)]
   [string]$workspaces_name
)

npm init -w "workspaces\$workspaces_name" -y
Set-Location "workspaces\$workspaces_name"
Remove-Item package.json -Force
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
cdk init app --language typescript
Set-Location ..\..\
Copy-Item tsconfig_usecases.json .\workspaces\$workspaces_name\tsconfig.json -Force
Copy-Item README_usecase_template.md .\workspaces\$workspaces_name\README.md -Force
Copy-Item overview_template.drawio.svg .\workspaces\$workspaces_name\overview.drawio.svg -Force
npm install -w workspaces\$workspaces_name --save aws-cdk-lib constructs constructs change-case-commonjs
npm install -w workspaces\sample --save-dev cdk-nag cross-env @types/js-yaml

exit 0