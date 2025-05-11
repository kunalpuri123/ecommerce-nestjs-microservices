import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"

export default function CategoriesPage() {
  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-muted-foreground mt-2">Browse all {category.name.toLowerCase()} products</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
