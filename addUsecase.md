# Add usecase

## 環境に合わせてワークスペース追加を実施

- linux

```sh
./add-usecase.sh sample
```

- Windows

```bat
.\add-usecase.bat sample
```

```PowerShell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\add-usecase.ps1 sample
```

## 各ワークスペース内の package.jsonに追加

`scripts` に以下を追記します。

`win:xxx`はWindows環境用、`linux:xxx`はLinux環境用です。

```json
    "win:cdk:bootstrap": "cdk bootstrap --termination-protection true -c env=%npm_config_env% -c project=%npm_config_project% --profile %npm_config_project%-%npm_config_env%",
    "win:cdk:synth": "cdk synth --version-reporting false --path-metadata false --asset-metadata false -c project=%npm_config_project% -c env=%npm_config_env% --profile %npm_config_project%-%npm_config_env%",
    "win:cdk:diff:all": "cdk diff --all --version-reporting false --path-metadata false --asset-metadata false -c project=%npm_config_project% -c env=%npm_config_env% --profile %npm_config_project%-%npm_config_env%",
    "win:cdk:deploy:all": "cdk deploy --all --version-reporting false --path-metadata false --asset-metadata false -c project=%npm_config_project% -c env=%npm_config_env% --profile %npm_config_project%-%npm_config_env%",
    "win:cdk:destroy:all": "cdk destroy --all -c project=%npm_config_project% -c env=%npm_config_env% --profile %npm_config_project%-%npm_config_env%",
```

```json
    "linux:cdk:bootstrap": "cdk bootstrap --termination-protection true -c env=$npm_config_env -c project=$npm_config_project --profile $npm_config_project-$npm_config_env",
    "linux:cdk:synth": "cdk synth --version-reporting false --path-metadata false --asset-metadata false -c project=$npm_config_project -c env=$npm_config_env --profile $npm_config_project-$npm_config_env",
    "linux:cdk:diff:all": "cdk diff --all --version-reporting false --path-metadata false --asset-metadata false -c project=$npm_config_project -c env=$npm_config_env --profile $npm_config_project-$npm_config_env",
    "linux:cdk:deploy:all": "cdk deploy --all --version-reporting false --path-metadata false --asset-metadata false -c project=$npm_config_project -c env=$npm_config_env --profile $npm_config_project-$npm_config_env",
    "linux:cdk:destroy:all": "cdk destroy --all -c project=$npm_config_project -c env=$npm_config_env --profile $npm_config_project-$npm_config_env"
```
