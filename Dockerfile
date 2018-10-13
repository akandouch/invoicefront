FROM node:10.5.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN ng build
COPY . .
EXPOSE 3000
CMD [ "ng", "serve" ]
