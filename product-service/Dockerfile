FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install --force

# Copy source code
COPY src ./src
COPY nest-cli.json ./

# Build and run
RUN npm run build

CMD ["npm", "run", "start:prod"]