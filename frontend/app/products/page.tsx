"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Star, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { products, categories } from "@/lib/data"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const categoryParam = searchParams.get("category") || ""

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [priceRange, setPriceRange] = useState([0, 300])
  const [sortOption, setSortOption] = useState("featured")

  // Filter products based on search, categories, and price
  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category.toLowerCase()))
    }

    // Apply price filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategories, priceRange, sortOption])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category.toLowerCase())
        ? prev.filter((c) => c !== category.toLowerCase())
        : [...prev, category.toLowerCase()],
    )
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 300])
    setSortOption("featured")
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Mobile Filter Button */}
        <div className="w-full flex justify-between items-center md:hidden mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.name.toLowerCase())}
                          onCheckedChange={() => handleCategoryChange(category.name)}
                        />
                        <Label htmlFor={`mobile-category-${category.id}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <Slider
                    defaultValue={priceRange}
                    max={300}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Sort By</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="mobile-sort-featured"
                        name="mobile-sort"
                        checked={sortOption === "featured"}
                        onChange={() => setSortOption("featured")}
                      />
                      <Label htmlFor="mobile-sort-featured">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="mobile-sort-price-low"
                        name="mobile-sort"
                        checked={sortOption === "price-low"}
                        onChange={() => setSortOption("price-low")}
                      />
                      <Label htmlFor="mobile-sort-price-low">Price: Low to High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="mobile-sort-price-high"
                        name="mobile-sort"
                        checked={sortOption === "price-high"}
                        onChange={() => setSortOption("price-high")}
                      />
                      <Label htmlFor="mobile-sort-price-high">Price: High to Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="mobile-sort-rating"
                        name="mobile-sort"
                        checked={sortOption === "rating"}
                        onChange={() => setSortOption("rating")}
                      />
                      <Label htmlFor="mobile-sort-rating">Highest Rated</Label>
                    </div>
                  </div>
                </div>
                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-1/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button onClick={clearFilters} variant="ghost" size="sm" className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.name.toLowerCase())}
                    onCheckedChange={() => handleCategoryChange(category.name)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Price Range</h3>
            <Slider defaultValue={priceRange} max={300} step={1} value={priceRange} onValueChange={handlePriceChange} />
            <div className="flex items-center justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Sort By</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="sort-featured"
                  name="sort"
                  checked={sortOption === "featured"}
                  onChange={() => setSortOption("featured")}
                />
                <Label htmlFor="sort-featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="sort-price-low"
                  name="sort"
                  checked={sortOption === "price-low"}
                  onChange={() => setSortOption("price-low")}
                />
                <Label htmlFor="sort-price-low">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="sort-price-high"
                  name="sort"
                  checked={sortOption === "price-high"}
                  onChange={() => setSortOption("price-high")}
                />
                <Label htmlFor="sort-price-high">Price: High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="sort-rating"
                  name="sort"
                  checked={sortOption === "rating"}
                  onChange={() => setSortOption("rating")}
                />
                <Label htmlFor="sort-rating">Highest Rated</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {searchQuery && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                Search results for: <span className="font-medium">{searchQuery}</span>
              </p>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
      </div>
    </div>
  )
}
