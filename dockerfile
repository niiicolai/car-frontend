FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY package.json .
COPY src/ ./src/

RUN npm run build

EXPOSE 3000 80 443

CMD [ "npm", "start" ]
