# nodejs & nvm

## install nodejs standalone

Replace `20` with your desired node version

```bash
sudo apt update && sudo apt install -y curl
curl -sL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt update && install -y nodejs
```

## install nodejs with nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

add to `~/.zshrc` or `~/.bashrc`:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

install a node LTS version:

```bash
nvm install --lts
```

check for installed nodes and use:

```bash
nvm ls
nvm use <>
```
