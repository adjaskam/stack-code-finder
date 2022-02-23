FROM node:12-alpine AS builder
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
# copy from node-graph-app (where dockerfile is) to this container /build directory
COPY . .

FROM alpine:3.12
RUN apk add nodejs=12.22.10-r0
RUN addgroup -S node && adduser -S node -G node
USER node

WORKDIR /home/node/code
COPY --from=builder --chown=node:node /build .

CMD ["node", "index.js"]

# root user by default
# ADD also exists (downloading files, unzip automatically)

# 1 -> docker build --rm -t my-node-app:1 .
# 2 -> docker run --init --rm -p 3000:3000 -it my-node-app:1 ash