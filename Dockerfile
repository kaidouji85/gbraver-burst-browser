FROM node:12.18.2-slim as builder
ARG HOW_TO_PLAY_URL
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm config set registry http://registry.npmjs.org/ && \
  npm ci && \
  npm run build:production

FROM node:12.18.2-slim as runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
CMD [ "npm", "run", "serve" ]
EXPOSE 3000