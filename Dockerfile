FROM node:12-stretch

USER node

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

CMD ["node", "index.js"]

# root user by default
# ADD also exists (downloading files, unzip automatically)