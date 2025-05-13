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
## API Documentation

### Product Service

#### Create Order
**Endpoint**  
POST /orders

**Request Body**
```json
{
  "customerId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "quantity": 2
    }
  ]
}
```

**Response (201 Created)**
```json
{
  "id": "uuid",
  "customerId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "name": "Smartphone",
      "quantity": 2,
      "price": 599.99
    }
  ],
  "total": 1199.98,
  "status": "CREATED",
  "createdAt": "2023-08-20T12:34:56Z"
}
```

**Example Call**
```bash
curl -X POST http://localhost:3001/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "items": [
      {
        "productId": "c0ffee00-c0de-f00d-baad-f00dc0ffee00",
        "quantity": 1
      }
    ]
  }'
```

#### List Orders
**Endpoint**  
GET /orders

**Response (200 OK)**
```json
{
  "data": [
    {
      "id": "uuid",
      "customerId": "uuid",
      "total": 299.99,
      "status": "PROCESSING",
      "createdAt": "2023-08-20T12:34:56Z"
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "limit": 10
  }
}
```

#### List Products
**Endpoint**  
GET /products

**Response (200 OK)**
```json
[
  {
    "id": "uuid",
    "name": "Wireless Headphones",
    "price": 199.99,
    "stock": 50,
    "category": "Electronics"
  }
]
```

### Customer Service

#### Get Customer Order Statistics
**Endpoint**  
GET /customers/:id/orders

**Response (200 OK)**
```json
{
  "customerId": "uuid",
  "totalOrders": 5,
  "totalSpent": 1499.95,
  "averageOrderValue": 299.99,
  "lastOrderDate": "2023-08-20T12:34:56Z"
}
```

**Example Call**
```bash
curl http://localhost:3002/customers/550e8400-e29b-41d4-a716-446655440000/orders
```

#### Update Customer Profile
**Endpoint**  
PATCH /customers/:id

**Request Body**
```json
{
  "email": "new.email@example.com",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  }
}
```

**Response (200 OK)**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "new.email@example.com",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "updatedAt": "2023-08-20T13:45:00Z"
}
```

**Example Call**
```bash
curl -X PATCH http://localhost:3002/customers/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [JWT_TOKEN]" \
  -d '{
    "email": "updated@example.com",
    "shippingAddress": {
      "street": "456 Oak Ave",
      "city": "Los Angeles",
      "zipCode": "90001"
    }
  }'
```

### Error Responses

#### Common Error Formats
**400 Bad Request**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    "quantity must be a positive integer"
  ]
}
```

**404 Not Found**
```json
{
  "statusCode": 404,
  "message": "Customer not found"
}
```

**500 Internal Server Error**
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

#### Rate Limiting Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1692554400
```

This documentation includes:
- Detailed endpoint specifications
- Request/response schemas
- Example payloads
- cURL examples
- Error response formats
- Rate limiting information
- Proper HTTP status codes
- UUID format examples
- ISO 8601 timestamp formats

For production implementations, you should:
- Add authentication/authorization headers
- Implement proper validation
- Add pagination parameters
- Include API versioning
- Add response caching headers
![image](https://github.com/user-attachments/assets/64721a45-2736-478f-af32-73697ac7235c)


## 📄 License

MIT License © Kunal Pradeep Puri


