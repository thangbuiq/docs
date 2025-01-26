# zsh & zimfw

## setup zsh and zimfw

```bash
sudo apt update && sudo apt install curl zsh -y
chsh -s $(which zsh)
curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
zsh -c "source ~/.zshrc"
```

## setup starship prompt and zim plugins

Open your favourite code editor and edit the file `~/.zimrc`:

```bash
# Sets sane Zsh built-in environment options.
zmodule environment
zmodule git
zmodule input
zmodule termtitle
zmodule utility

# Completion
zmodule zsh-users/zsh-completions --fpath src
zmodule completion

# Customize
zmodule https://github.com/agkozak/zsh-z

# Fish-like syntax highlighting for Zsh.
zmodule zsh-users/zsh-syntax-highlighting
zmodule zsh-users/zsh-history-substring-search
zmodule zsh-users/zsh-autosuggestions
```

Init zimfw modules:

```bash
zimfw uninstall && zimfw install
```