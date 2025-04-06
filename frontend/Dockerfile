FROM node:20-alpine
WORKDIR /app

# 依存ファイルだけ先にコピーしてキャッシュ利用
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# 残りをコピーしてビルド
COPY . ./
RUN npm run build
