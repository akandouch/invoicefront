FROM node:10.5.0
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build
EXPOSE 3000
CMD [ "ng", "serve" ]
