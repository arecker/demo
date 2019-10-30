#!/usr/bin/env bash

set -e

sudo apt-get update

sudo apt-get install -y \
     build-essential \
     curl \
     git \
     libbz2-dev \
     libffi-dev \
     liblzma-dev \
     libncurses5-dev \
     libncursesw5-dev \
     libreadline-dev \
     libsqlite3-dev \
     libssl-dev \
     llvm \
     make \
     python-openssl \
     tk-dev \
     wget \
     xz-utils \
     zlib1g-dev 

git clone https://github.com/pyenv/pyenv.git ~/.pyenv

for plugin in doctor installer update virtualenv which-ext; do
    git clone https://github.com/pyenv/pyenv-${plugin}.git ~/.pyenv/plugins/pyenv-${plugin}
done

cat >> $HOME/.bashrc <<"EOF"

# pyenv settings
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
EOF

PYENV="$HOME/.pyenv/bin/pyenv"
$PYENV install 3.7.3
$PYENV global 3.7.3

$HOME/.pyenv/shims/pip install --upgrade pip ipython ipdb
