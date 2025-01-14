# gh actions - deploy docker images on tags

Tag with version number should trigger the build and push the image to the docker registry.

> For example: `1.0.0`, `1.0.1`, `1.1.0`, `2.0.0`, etc.

If you want the `v` prefix, you can use the following regex pattern: `v[0-9]+.[0-9]+.[0-9]+`.

```yaml
name: Build Image and Push to GitHub Container Registry
run-name: BUILD - ${{ github.actor }} is trigger build/push with SHA:${{ github.sha }}

on:
  push:
    tags:
      - '[0-9]+.[0-9]+.[0-9]+'

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build_image:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v3

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USER }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build only to test
        if: ${{ !startsWith(github.ref, 'refs/tags/') }}
        uses: docker/build-push-action@v5
        with:
          push: false
          tags: ${{ secrets.DOCKERHUB_USER }}/${{ secrets.DOCKERHUB_REPO }}:${{ github.sha }}

      - name: Get the version
        if: ${{ startsWith(github.ref, 'refs/tags/') }}
        id: get_version
        run: |
          echo "IMAGE_VERSION=$(echo $GITHUB_REF | sed -e 's/refs\/tags\///g')" >> $GITHUB_OUTPUT

      - name: Build and push image to Docker Hub
        if: ${{ startsWith(github.ref, 'refs/tags/') }}
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ secrets.DOCKERHUB_USER }}/${{ secrets.DOCKERHUB_REPO }}:${{ steps.get_version.outputs.IMAGE_VERSION }}
```