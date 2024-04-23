FROM node:20-alpine
ENV appName = Innoview
RUN npm install -g @angular/cli
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build
WORKDIR /app/backend
EXPOSE 4200
EXPOSE 5050
CMD ["node","index.js"]