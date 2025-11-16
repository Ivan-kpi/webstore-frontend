FROM node:20-slim

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# debug
RUN echo "DEBUG: VITE_API_URL = $VITE_API_URL"

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "DEBUG2: VITE_API_URL = $VITE_API_URL"

RUN npm run build

RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]



