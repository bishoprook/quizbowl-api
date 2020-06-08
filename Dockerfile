FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000
EXPOSE 8080
EXPOSE 8081

CMD [ "yarn", "start" ]