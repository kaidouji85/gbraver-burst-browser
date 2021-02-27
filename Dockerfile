FROM node:14.16.0-slim
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm ci
CMD [ "npm", "run", "start:production" ]
EXPOSE 3000
