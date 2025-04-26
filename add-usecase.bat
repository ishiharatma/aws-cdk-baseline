@echo off
rem Usage: init-usecase.bat my-usecase
rem Description: Initialize a new CDK usecase project with the specified name

IF "%1"=="" (
    echo Error: workspaces_name parameter is required.
    exit /b 1
)

SET workspaces_name=%1
npm init -w workspaces\%workspaces_name% -y
cd workspaces\%workspaces_name%
del package.json
cdk init app --language typescript
cd ../../
copy /y tsconfig_usecases.json .\workspaces\%workspaces_name%\tsconfig.json
copy /y README_usecase_template.md .\workspaces\%workspaces_name%\README.md
copy /y overview_template.drawio.svg .\workspaces\%workspaces_name%\overview.drawio.svg
npm install -w workspaces\%workspaces_name% --save aws-cdk-lib constructs
npm install -w workspaces\%workspaces_name% --save-dev cdk-nag cross-env @types/js-yaml

exit /b 0