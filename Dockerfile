FROM node:10.5.0
WORKDIR /usr/src/app
ENV REST_API_URL http://localhost:8080
RUN npm install -g @angular/cli@6.1.2
COPY package*.json ./
RUN npm install
COPY . .
RUN sed -i 's@REST_API_URL@'"$REST_API_URL"'@' src/app/data.service.ts
RUN ng build
EXPOSE 4200
CMD [ "ng", "serve", "--host","0.0.0.0" ]
