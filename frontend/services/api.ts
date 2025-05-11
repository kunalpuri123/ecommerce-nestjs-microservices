// API service to communicate with microservices

// Base URLs for microservices
const PRODUCT_SERVICE_URL = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || "http://localhost:3001";
const CUSTOMER_SERVICE_URL = process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_URL || "http://localhost:3002";

// Product Service API
export const productApi = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await fetch(`${PRODUCT_SERVICE_URL}/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: string) => {
    try {
      const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Create order
  createOrder: async (orderData: any) => {
    try {
      const response = await fetch(`${PRODUCT_SERVICE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to create order");
      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Get orders by customer ID
  getOrdersByCustomerId: async (customerId: string) => {
    try {
      const response = await fetch(`${PRODUCT_SERVICE_URL}/orders/customer/${customerId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },
};

// Customer Service API
export const customerApi = {
  // Register new customer
  register: async (customerData: any) => {
    try {
      const response = await fetch(`${CUSTOMER_SERVICE_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) throw new Error("Failed to register customer");
      return await response.json();
    } catch (error) {
      console.error("Error registering customer:", error);
      throw error;
    }
  },

  // Login customer
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${CUSTOMER_SERVICE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Failed to login");
      return await response.json();
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Get customer by ID
  getCustomerById: async (id: string, token: string) => {
    try {
      const response = await fetch(`${CUSTOMER_SERVICE_URL}/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch customer");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (id: string, customerData: any, token: string) => {
    try {
      const response = await fetch(`${CUSTOMER_SERVICE_URL}/customers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) throw new Error("Failed to update customer");
      return await response.json();
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  },
};