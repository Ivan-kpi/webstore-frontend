FROM node:20-slim

WORKDIR /app

# 1. Приймаємо змінну від Railway під час білду
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm install

COPY . .

# 2. Будуємо React із доступом до VITE_API_URL
RUN npm run build

# 3. Простіше нікуди — serve для віддачі статичних файлів
RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]


