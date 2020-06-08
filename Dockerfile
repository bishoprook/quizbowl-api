FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENV PORT 80
EXPOSE ${PORT}

CMD [ "yarn", "start" ]