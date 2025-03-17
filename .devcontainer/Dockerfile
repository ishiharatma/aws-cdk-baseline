# see: https://mcr.microsoft.com/v2/devcontainers/javascript-node/tags/list
FROM mcr.microsoft.com/devcontainers/typescript-node:22

# Optional: Copy and update certificates for corporate proxy environments
## Copy and update certificates
#COPY .devcontainer/your-root-ca.cer /usr/local/share/ca-certificates/your-root-ca.crt
##RUN update-ca-certificates
## Configure npm certificate location and SSL settings
#RUN npm config set cafile /etc/ssl/certs/ca-certificates.crt \
#    && npm config set registry http://registry.npmjs.org/ \
#    && npm config set strict-ssl false

# Install additional packages required for AWS CDK
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

# Install AWS CDK globally
RUN npm install -g aws-cdk

# Install AWS CLI v2
# https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

# Create and configure dev user
RUN useradd -m -s /bin/bash -G sudo dev \
    && echo "dev ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/dev \
    && chown -R dev:dev /home/dev

USER dev
WORKDIR /home/dev
