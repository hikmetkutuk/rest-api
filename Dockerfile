FROM node:16.14
EXPOSE 5000
WORKDIR /src
COPY package.json package-lock*.json ./
RUN npm install
COPY . .
CMD npm run build && npm run start
