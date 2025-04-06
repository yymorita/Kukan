FROM node:20-alpine
WORKDIR /app

# 依存ファイルだけ先にコピーしてキャッシュ利用
COPY front/package*.json ./front/
WORKDIR /app/front
RUN npm install

# 残りをコピーしてビルド
COPY front/ ./ 
RUN npm run build
