FROM node:9.4.0

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json package.json

RUN npm install -qy --silent

EXPOSE 3000

CMD ["npm", "start"]