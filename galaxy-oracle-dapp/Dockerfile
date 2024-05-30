FROM node:14-alpine3.11

WORKDIR /app

COPY package*.json .
RUN npm ci

RUN mkdir src

COPY src ./src

ENTRYPOINT [ "node", "/app/src/oracle.js" ]