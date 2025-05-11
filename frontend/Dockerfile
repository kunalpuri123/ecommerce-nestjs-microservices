FROM node:18 AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile  # Allow lockfile updates

# Build the application
COPY . .
RUN pnpm build

# ... rest of the Dockerfile remains the same