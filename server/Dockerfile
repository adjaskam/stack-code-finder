FROM node:16-alpine
WORKDIR /app
# puppeteer -> custom chromium instance is required to start headless browser in docker container
RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss
COPY ["package.json",  "package-lock.json", "./"]
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]