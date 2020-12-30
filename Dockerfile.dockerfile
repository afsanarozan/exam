FROM node:latest

RUN mkdir -p /usr/sampleapp

WORKDIR /usr/sampleapp

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "yarn", "run", "start" ]