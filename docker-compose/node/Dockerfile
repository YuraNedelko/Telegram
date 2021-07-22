FROM node:16.4.0
WORKDIR /var/www

COPY package*.json ./
COPY ./node ./node
RUN npm install

EXPOSE 2223

CMD [ "node", "./node/server.js" ]
