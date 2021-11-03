FROM node:alpine

WORKDIR /services


copy . .

RUN yarn

CMD yarn dev