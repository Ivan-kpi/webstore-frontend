# Use Node 20 (required for react-router v7)
FROM node:20-slim

# Create working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies (npm ci deliberately NOT used)
RUN npm install

# Copy all app files
COPY . .

# Build React app
RUN npm run build

# Install static server globally
RUN npm install -g serve

# Expose port (Railway will override automatically)
EXPOSE 3000

# Start production server
CMD ["serve", "-s", "build", "-l", "3000"]
