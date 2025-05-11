// Mock product data
export const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 20-hour battery life.",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 45,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Track your fitness goals with our advanced smart watch. Includes heart rate monitoring, step counting, and sleep tracking.",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 32,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Stay comfortable with our 100% organic cotton t-shirt. Available in multiple colors and sizes.",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    stock: 120,
    rating: 4.3,
  },
  {
    id: "4",
    name: "Professional Chef Knife",
    description: "Precision cutting with our professional-grade chef knife. Made from high-quality stainless steel.",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Kitchen",
    stock: 18,
    rating: 4.9,
  },
  {
    id: "5",
    name: "Leather Messenger Bag",
    description:
      "Stylish and functional leather messenger bag perfect for work or casual use. Multiple compartments for organization.",
    price: 119.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    stock: 25,
    rating: 4.7,
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description:
      "Take your music anywhere with our waterproof portable speaker. 12-hour battery life and rich bass sound.",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 60,
    rating: 4.5,
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours or hot for 12 hours with our vacuum-insulated water bottle.",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Kitchen",
    stock: 85,
    rating: 4.4,
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description:
      "Charge your compatible devices without the hassle of cables. Sleek design fits any desk or nightstand.",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 40,
    rating: 4.2,
  },
  {
    id: "9",
    name: "Ergonomic Office Chair",
    description: "Work in comfort with our adjustable ergonomic chair. Lumbar support and breathable mesh back.",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Furniture",
    stock: 15,
    rating: 4.8,
  },
  {
    id: "10",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe.",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Kitchen",
    stock: 50,
    rating: 4.6,
  },
  {
    id: "11",
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat. Perfect for home or studio practice.",
    price: 45.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Fitness",
    stock: 70,
    rating: 4.7,
  },
  {
    id: "12",
    name: "Digital Drawing Tablet",
    description:
      "Express your creativity with our pressure-sensitive drawing tablet. Compatible with all major design software.",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 22,
    rating: 4.5,
  },
]

// Categories
export const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "kitchen", name: "Kitchen" },
  { id: "accessories", name: "Accessories" },
  { id: "furniture", name: "Furniture" },
  { id: "fitness", name: "Fitness" },
]

// Helper function to get product by ID
export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

// Helper function to filter products by search query
export function filterProducts(query: string) {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}

// Helper function to filter products by category
export function filterProductsByCategory(category: string) {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}
