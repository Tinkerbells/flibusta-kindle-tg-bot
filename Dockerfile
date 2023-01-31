FROM node:16.17.0-bullseye-slim

RUN apt-get update && \
    apt-get install -y chromium

RUN mkdir -p /home/node/app/node_modules 

RUN mkdir -p /home/books

WORKDIR /home/node/app

COPY package*.json ./

COPY .env ./

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]


