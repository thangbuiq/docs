# mkdocs terminal theme

```bash
pip install mkdocs-terminal
```

Then init mkdocs project at your folder:

```bash
mkdocs new .
```

Then add to `mkdocs.yml`:

```yaml
theme:
  name: terminal
  palette: dark # or light
```

if you want to use the `tokyonight` theme like my current site, you can use custom css, refer to <a href="https://github.com/thangbuiq/docs/blob/main/docs/assets/styles.css" target="_blank">here</a>, then add the extra css files to `mkdocs.yml`:

```yaml
extra_css:
  - assets/styles.css
```

Then run the server:

```bash
mkdocs serve
```

## references

- https://github.com/ntno/mkdocs-terminal?tab=readme-ov-file

## notes

some mkdocs-material extensions or plugins may not work with this theme, so you may need to disable them in `mkdocs.yml`, for copy button and highlight code, you can use the default theme, or clone my repo for easy setup.

```bash
git clone https://github.com/thangbuiq/docs.git
cd docs
find docs/* -not -path "docs/assets*" -exec rm -rf {} +
touch docs/index.md
```

then add your own docs to the `docs` folder.
