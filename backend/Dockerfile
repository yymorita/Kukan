FROM node:20-bullseye
WORKDIR /app
COPY package.json ./
RUN apt-get update && apt-get install -y python3 make g++ && npm install
COPY . .
CMD ["node", "ws-server.js"]
