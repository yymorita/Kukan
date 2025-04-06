FROM node:20-alpine
WORKDIR /app

# 依存ファイルだけ先にコピーしてキャッシュ利用
COPY package*.json ./
RUN npm install

# 残りをコピーしてビルド
COPY frontend/ ./ 
RUN npm run build
