FROM node:18-bullseye-slim

RUN apt-get update && \
    apt-get install -y chromium

RUN mkdir -p /home/node/app/node_modules 

RUN mkdir -p /home/books

WORKDIR /home/node/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY package*.json ./

RUN npm install

RUN npx prisma generate 

COPY . .

CMD [ "npm", "run", "start" ]


