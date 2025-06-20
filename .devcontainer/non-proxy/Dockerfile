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

# Install AWS CLI v2
RUN npm install -g typescript \
    && npm install -g aws-cdk

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

# install Amazon Q CLI (修正版)
RUN wget https://desktop-release.q.us-east-1.amazonaws.com/latest/amazon-q.deb && \
    apt-get install -y ./amazon-q.deb && \
    rm -f amazon-q.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Grant sudo privileges to the node user
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/node

# Set user to node
USER node
WORKDIR /home/node

# install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
# add .local/bin to PATH
ENV PATH="/home/node/.local/bin:${PATH}"

# Install Python 3.13
RUN uv python install 3.13
