FROM node:alpine

WORKDIR /home/service

copy . .

RUN yarn

CMD yarn dev