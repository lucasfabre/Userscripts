FROM debian:buster

ARG USERNAME=dev
ARG USER_GID=1000
ARG USER_UID=1000

RUN \
    # Install base commands
    apt update && apt install -y git zsh curl gnupg sudo build-essential \
    # Create developement user
    && groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd -s /usr/bin/zsh --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME} \
    # Add sudo support for the non-root user
    && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME} \
    # Dev tools
    # - nodejs
    && curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash - \
    && apt-get install -y nodejs \
    # Clean up
    && apt autoremove -y \
    && apt clean -y \
    && rm -rf /var/lib/apt/lists/*

# Copy the default dotfiles
COPY --chown=${USERNAME}:${USERNAME} default_dotfiles/* /home/${USERNAME}/
