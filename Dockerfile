FROM node:10.5.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build
EXPOSE 4200
CMD [ "npm", "start" ]
