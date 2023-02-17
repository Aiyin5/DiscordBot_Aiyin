FROM node:16.9.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD node deploy.js;node index.js