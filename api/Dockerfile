FROM node:latest

WORKDIR /home/waiter/api

COPY package.json .

RUN yarn

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "dev"]