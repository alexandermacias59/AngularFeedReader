FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli && npm install
COPY . .
RUN ng build
#--------------------------------------------------------
FROM nginx:alpine
COPY --from=build-stage /app/dist/AngularFeedReader/browser/ /usr/share/nginx/html/
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
