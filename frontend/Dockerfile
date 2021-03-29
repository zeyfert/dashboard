FROM node:15-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm run build

RUN npm install -g serve
