FROM node:12.18.2-slim
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm config set registry http://registry.npmjs.org/ && \
  npm ci
CMD [ "npm", "run", "start:production" ]
EXPOSE 3000