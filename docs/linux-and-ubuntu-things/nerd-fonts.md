# nerd fonts

Go to <a href="https://www.nerdfonts.com/font-downloads" target="_blank">nerdfonts.com</a> and select your favourite font, then replace the `FONT_URL`.

For example with `JetBrainsMono v3.3.0`:

```bash
FONT_URL="https://github.com/ryanoasis/nerd-fonts/releases/download/v3.3.0/JetBrainsMono.zip"
FONT_DIR="$HOME/.local/share/fonts"
TMP_DIR="/tmp/nerd-fonts"

mkdir -p "$TMP_DIR"
curl -Lo "$TMP_DIR/JetBrainsMono.zip" "$FONT_URL"
unzip -o "$TMP_DIR/JetBrainsMono.zip" -d "$TMP_DIR"
mkdir -p "$FONT_DIR"
find "$TMP_DIR" -name "*.ttf" -exec cp {} "$FONT_DIR" \;
fc-cache -f -v
rm -rf "$TMP_DIR"
```