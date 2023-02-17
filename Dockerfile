FROM node:16.9.0-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]