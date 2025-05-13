# E-Commerce Microservices System

A distributed system built with NestJS microservices, RabbitMQ, PostgreSQL, and Docker.

## Architecture Overview

### System Architecture
```mermaid
graph TD
    subgraph Frontend
    A[Next.js Frontend]
    end
    
    subgraph Microservices
    B[Product Service]
    D[Customer Service]
    end
    
    subgraph Data Stores
    E[(PostgreSQL Products)]
    F[(PostgreSQL Customers)]
    end
    
    subgraph Messaging
    C[(RabbitMQ)]
    end
    
    A -->|HTTP POST /orders| B
    B -->|Emit 'order_created' event| C
    C -->|Consume 'order_created'| D
    B -->|CRUD Operations| E
    D -->|Update Customer Data| F
```
# E-Commerce Microservices System

## 🧩 Services Overview

### 1. **Product Service**
- **Port:** `3001`
- **Responsibilities:**
  - Order management
  - Product catalog
  - Event emission to RabbitMQ
- **Tech Stack:**
  - NestJS
  - TypeORM
  - PostgreSQL
  - RabbitMQ client

### 2. **Customer Service**
- **Port:** `3002`
- **Responsibilities:**
  - Customer profile management
  - Order statistics
  - Event consumption from RabbitMQ
- **Tech Stack:**
  - NestJS
  - TypeORM
  - PostgreSQL
  - RabbitMQ consumer

### 3. **Message Broker**
- **RabbitMQ**
  - **Queue:** `order_created`
  - **Management UI:** [http://localhost:15672](http://localhost:15672)
  - **Credentials:** `[SET_IN_ENVIRONMENT]`

---

## 🔁 Architecture Diagram

```mermaid
graph TD
  A[Client] --> B[Product Service]
  A --> C[Customer Service]
  B -->|Emit Event| D[RabbitMQ]
  D -->|Consume Event| C
  B --> E[PostgreSQL - Products DB]
  C --> F[PostgreSQL - Customers DB]
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js 18+](https://nodejs.org/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

---

## 🛠 Installation

```bash
git clone https://github.com/your-repo/ecommerce-system.git
cd ecommerce-system
docker compose up --build
```

---

## 🌐 Environment Variables

Create a `.env` file or configure environment variables for each service.

```env
# Product Service
DB_HOST=postgres-products
DB_PORT=5432
DB_USER=[SET_DATABASE_USER]
DB_PASSWORD=[SET_DATABASE_PASSWORD]
DB_NAME=products_db
RABBITMQ_URL=amqp://[RABBITMQ_USER]:[RABBITMQ_PASSWORD]@rabbitmq:5672

# Customer Service
DB_HOST=postgres-customers
DB_PORT=5432
DB_USER=[SET_DATABASE_USER]
DB_PASSWORD=[SET_DATABASE_PASSWORD]
DB_NAME=customers_db
RABBITMQ_URL=amqp://[RABBITMQ_USER]:[RABBITMQ_PASSWORD]@rabbitmq:5672
```

---

## 🔗 API Endpoints

### 🛒 Product Service

| Method | Endpoint     | Description         |
|--------|--------------|---------------------|
| POST   | `/orders`    | Create new order    |
| GET    | `/orders`    | List all orders     |
| GET    | `/products`  | List all products   |

### 👤 Customer Service

| Method | Endpoint                     | Description               |
|--------|------------------------------|---------------------------|
| GET    | `/customers/:id/orders`      | Get customer order stats  |
| PATCH  | `/customers/:id`             | Update customer profile   |

---

## 🚢 Deployment Considerations

### 🔧 Production Setup

#### Database:
- Disable `synchronize: true` in TypeORM config
- Use proper migrations

#### RabbitMQ:
- Enable TLS
- Set up monitoring and alerts


---

## 🧯 Troubleshooting

| Symptom                        | Solution                            |
|--------------------------------|-------------------------------------|
| Messages stuck in queue        | Check consumer service health       |
| Database connection failures   | Verify network between containers   |
| "No matching event handler"    | Ensure pattern names match          |
| RabbitMQ connection refused    | Check credentials and ports         |

---

## 📄 License

MIT License © Kunal Pradeep Puri


