# customer-service/Dockerfile
FROM node:18.20.8-alpine

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

CMD ["node", "dist/main"]