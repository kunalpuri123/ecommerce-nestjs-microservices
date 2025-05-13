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

