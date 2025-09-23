FROM node:20

WORKDIR /site
COPY package.json .
RUN npm install
COPY . .
CMD npm start