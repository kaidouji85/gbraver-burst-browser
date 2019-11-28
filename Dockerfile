FROM node:12.13.1-slim as builder
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && \
  npm install
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/ && \
  npm run build:production

FROM node:12.13.1-slim as runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/build/ /usr/src/app/build
COPY --from=builder /usr/src/app/node_modules/ /usr/src/app/node_modules
CMD [ "npm", "run", "serve" ]
EXPOSE 3000