FROM node:18-alpine
 
WORKDIR /fr
COPY package*.json ./
RUN npm install
RUN npm prune --production
COPY . .
EXPOSE 3000
CMD ["npm", "run dev"]