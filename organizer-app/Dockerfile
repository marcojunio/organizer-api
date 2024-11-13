FROM node:21.4-alpine

WORKDIR /user/app/web

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm","run","start"]