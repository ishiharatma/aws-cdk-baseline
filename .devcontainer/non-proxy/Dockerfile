FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bullseye

# Install additional packages required for AWS CDK
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    jq \
    #git \
    curl \
    wget \
    unzip \
    graphviz \
    #docker.io \
    #docker-compose \
    #docker-compose-plugin \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# install AWS CDK and TypeScript
RUN npm install -g aws-cdk aws-cdk-local typescript

# Install AWS Session Manager Plugin
RUN export CPU="" && \
    if [ $(uname -m) = "x86_64" ]; then \
    export CPU="ubuntu_64bit"; \
    elif [ $(uname -m) = "aarch64" ]; then \
    export CPU="ubuntu_arm64"; \
    fi && \
    if [ -n "$CPU" ]; then \
    curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/${CPU}/session-manager-plugin.deb" \
    -o session-manager-plugin.deb && \
    apt-get update && \
    apt-get install -y ./session-manager-plugin.deb && \
    rm -rf ./session-manager-plugin.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*; \
    else \
    echo "Unknown architecture for AWS Session Manager Plugin installation"; \
    fi

# Grant sudo privileges to the node user
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node

# Set user to node
USER node
WORKDIR /home/node

# install Amazon Q CLI as node user
RUN export OS=$(uname -m) && \
    if [ -n "$OS" ]; then \
    curl --proto '=https' --tlsv1.2 -sSf "https://desktop-release.q.us-east-1.amazonaws.com/latest/q-${OS}-linux-musl.zip" -o "/tmp/q.zip" && \
    cd /tmp && \
    unzip q.zip && \
    cd q && \
    ./install.sh --no-confirm&& \
    cd / && \
    sudo rm -rf /tmp/q && \
    sudo rm -f /tmp/q.zip; \
    fi

# install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
# add .local/bin to PATH
ENV PATH="/home/node/.local/bin:${PATH}"

# Install Python 3.13
RUN uv python install 3.13

# LocalStack CLI
RUN pip3 install --user awscli-local --break-system-packages

ARG LOCALSTACK_VERSION="4.9.1"
RUN export FILE="" && \
    if [ $(uname -m) = "x86_64" ]; then \
        export FILE="localstack-cli-${LOCALSTACK_VERSION}-linux-amd64-onefile.tar.gz"; \
    elif [ $(uname -m) = "aarch64" ]; then \
        export FILE="localstack-cli-${LOCALSTACK_VERSION}-linux-arm64-onefile.tar.gz"; \
    fi && \
    if [ -n "$FILE" ]; then \
        echo "v${LOCALSTACK_VERSION}/Downloading ${FILE}" && \
        curl --output "${FILE}" --location "https://github.com/localstack/localstack-cli/releases/download/v${LOCALSTACK_VERSION}/${FILE}" && \
        sudo tar xvzf "${FILE}" -C /usr/local/bin && \
        rm "${FILE}"; \
    fi