"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { products, categories } from "@/lib/data"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [categoryProducts, setCategoryProducts] = useState<any[]>([])
  const [category, setCategory] = useState<any>(null)

  useEffect(() => {
    const foundCategory = categories.find((c) => c.id.toLowerCase() === params.id.toLowerCase())

    if (foundCategory) {
      setCategory(foundCategory)

      const filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === foundCategory.name.toLowerCase(),
      )

      setCategoryProducts(filteredProducts)
    }
  }, [params.id])

  if (!category) {
    return (
      <div className="container flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
        <Button onClick={() => router.push("/categories")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/categories")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Categories
      </Button>

      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-6">No products found in this category.</p>
          <Button onClick={() => router.push("/products")}>Browse All Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                  <p className="font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
