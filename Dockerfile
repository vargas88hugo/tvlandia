FROM node:14-alpine3.10

WORKDIR /app

COPY package.json /app/package.json

RUN npm config set registry http://registry.npmjs.org

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start" ]