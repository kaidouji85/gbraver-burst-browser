FROM node:12.13.1-slim

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && \
  npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/ && \
  npm run build:production

CMD [ "npm", "run", "serve" ]

EXPOSE 3000