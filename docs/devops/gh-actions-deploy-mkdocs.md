# deploy mkdocs to github pages

create file .github/workflows/mkdocs.yml

## normal deploy (with requirements.txt)

```yaml
name: deploy
on:
  push:
    branches: [main, master]
permissions:
    contents: write
jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v4
        - name: Configure Git Credentials
            run: |
            git config user.name github-actions[bot]
            git config user.email 41898282+github-actions[bot]@users.noreply.github.com
        - uses: actions/setup-python@v5
            with:
            python-version: 3.x
        - run: pip install -r requirements.txt
        - run: mkdocs gh-deploy --force
```

## deploy with uv like me

```yaml
name: deploy
on:
  push:
    branches: [main, master]
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: curl -LsSf https://astral.sh/uv/install.sh | sh
      - run: uv sync
      - run: uv run mkdocs gh-deploy --force
```