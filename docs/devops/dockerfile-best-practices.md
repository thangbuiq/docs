# dockerfile best practices

## never build image with root user at runtime

> please keep in mind that default Dockerfile will ALWAYS run as root user

what happens if you run a container with root user, and deploy it to production?

**A process running as root user inside a container is actually a process running as root user on the host machine**. This means that if an attacker manages to exploit a vulnerability in your dockerize application, they will have root access to the host machine.

instead, use a non-root user but with the sudo privilege to prevent this:

> Remove the sudo support part if you don't need it in runtime

```dockerfile
ARG USERNAME=user-name-goes-here
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    # [Optional] Add sudo support for the non-root user
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
```

> this is mainly refer from [code.visualstudio.com/remote/advancedcontainers/add-nonroot-user](https://code.visualstudio.com/remote/advancedcontainers/add-nonroot-user)

you can also read this post (vietnamese), really well written and clear explanation:

<a href="https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw" target="_blank">Tại sao nên chạy ứng dụng container với non-root user?</a>

## use multi-stage builds

multi-stage builds are useful to reduce the size of the final image by using a smaller image to build the application and then copy the build artifacts to a smaller image

for example in a node.js application, you just want to deliver the build artifacts (the dist folder) and not the big boy node_modules folder

```dockerfile
# build stage
FROM node:22 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# deploy stage (smaller image)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

> You can reduce the size from multiple GBs to just a few MBs :D

## use .dockerignore file

Docker will copy all files in the build context to the image, for example when you run `COPY . .` in the Dockerfile, Docker will copy all files in the build context to the image, including the `md` files or `node_modules` folder,... which is not needed in the image

to prevent this, you can use a .dockerignore file to exclude files and folders from the build context

```bash
*.md
node_modules
docker-compose.yml
# ...
```

## RUN multiple commands in a single RUN

More layers in the image means more space, so it's better to combine multiple commands in a single `RUN` instruction

- Method 1: using `&&` and `\` as a line continuation character

```dockerfile
RUN apt-get update && apt-get install -y \
    package1 \
    package2 \
    package3
```

- Method 2: using `<<EOF...EOF` as escape characters

```dockerfile
RUN <<EOF
apt-get update
apt-get install -y \
    package1 \
    package2 \
    package3
EOF
```

## use ARG instead of ENV

Best practice is to use `ARG` instead of `ENV` to pass build-time variables to the Dockerfile

For example the node version use case:

```dockerfile
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}
```

And with this, you can build the image with a different node version:

```bash
docker build --build-arg NODE_VERSION=20 -t my-node-app .
```
