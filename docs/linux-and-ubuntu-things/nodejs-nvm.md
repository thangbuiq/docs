# nodejs & nvm

## install nodejs standalone


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
