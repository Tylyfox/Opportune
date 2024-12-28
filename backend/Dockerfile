FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install

RUN apk --update --no-cache add curl

COPY src src
COPY tsconfig.json tsconfig.json

CMD yarn start:dev 