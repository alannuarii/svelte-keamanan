FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ARG API_ENDPOINT
ENV API_ENDPOINT=$API_ENDPOINT

EXPOSE 3000

CMD ["npm", "run", "dev"]
