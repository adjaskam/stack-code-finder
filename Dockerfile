FROM node:16-alpine
WORKDIR /home/app
COPY ["package.json",  "package-lock.json", "./"]
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]