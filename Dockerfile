FROM node:12.13.1-slim

ENV PATH $PATH:/node_modules/.bin

COPY package.json package-lock.json /
RUN npm config set registry http://registry.npmjs.org/ && \
  npm install && \
  npm cache clean --force

WORKDIR /usr/src/app
ENTRYPOINT /bin/bash
EXPOSE 3000 8080