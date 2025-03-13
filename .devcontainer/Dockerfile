FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bullseye

# AWS CDKに必要な追加パッケージをインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    python3 \
    python3-pip \
    jq \
    git \
    curl \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /home/node