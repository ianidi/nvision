#FROM node:current-alpine3.10
FROM node:10

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

#RUN apk add --update python make g++\
#   && rm -rf /var/cache/apk/*

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]