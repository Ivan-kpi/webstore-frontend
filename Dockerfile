# Use Node 20 (рекомендовано для сучасних CRA додатків)
FROM node:20-slim AS build

WORKDIR /app

# ==== ENVIRONMENT VARIABLES (Railway передає їх у ARG) ====
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Копіюємо пакети окремо (кеш npm install)
COPY package*.json ./

# Install deps (npm ci не використовуємо спеціально!)
RUN npm install

# Копіюємо решту проєкту
COPY . .

# ==== BUILD REACT APP (CRA) ====
RUN npm run build


# ==== ПРОДАКШН СЕРВЕР ДЛЯ СТАТИКИ ====
FROM node:20-slim AS production

WORKDIR /app

RUN npm install -g serve

# Копіюємо build з попередньої стадії
COPY --from=build /app/build ./build

EXPOSE 3000

# serve -s build — офіційний спосіб сервити CRA в продакшені
CMD ["serve", "-s", "build", "-l", "3000"]




