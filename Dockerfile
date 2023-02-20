FROM node:18.13.0

WORKDIR /src/main.ts

COPY package*.json ./

EXPOSE 7000

RUN npm install or yarn install

COPY . .

RUN npm buid or yarn build

CMD [ "node", "dist/main.js" ]