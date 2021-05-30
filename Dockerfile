FROM node:16.2.0-buster
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm ci
CMD [ "npm", "run", "start:production" ]
EXPOSE 3000
