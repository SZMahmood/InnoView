FROM node:20-alpine
ENV appName = Innoview
RUN npm install -g @angular/cli
#RUN npm install mongoose
RUN npm install jsonwebtoken
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build
WORKDIR /app/backend
EXPOSE 4200
CMD ["node","index.js"]
