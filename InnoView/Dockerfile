FROM node:20-alpine
ENV appName = Innoview
RUN npm install -g @angular/cli
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build
EXPOSE 4200
CMD ["ng","serve","--host", "0.0.0.0"]
