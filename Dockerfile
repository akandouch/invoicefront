FROM node:10.5.0
WORKDIR /usr/src/app
RUN npm install -g @angular/cli@6.1.2
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build
EXPOSE 4200
CMD [ "ng", "serve" ]
