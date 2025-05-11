import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Globe, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Our Story</h1>
            <p className="text-lg text-muted-foreground">
              Founded in 2020, ShopEase began with a simple mission: to create an online shopping experience that's both
              enjoyable and efficient. What started as a small startup has grown into a trusted e-commerce platform
              serving customers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Our team" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 border-t">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Quality</h3>
            <p className="text-muted-foreground">
              We carefully curate our products to ensure they meet the highest standards of quality and durability.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Customer First</h3>
            <p className="text-muted-foreground">
              Our customers are at the heart of everything we do. We strive to exceed expectations with every
              interaction.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Sustainability</h3>
            <p className="text-muted-foreground">
              We're committed to reducing our environmental impact through sustainable practices and eco-friendly
              products.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Community</h3>
            <p className="text-muted-foreground">
              We believe in giving back to the communities we serve through charitable initiatives and partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 border-t">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "CEO & Founder", image: "/placeholder.svg?height=300&width=300" },
            { name: "Michael Chen", role: "CTO", image: "/placeholder.svg?height=300&width=300" },
            { name: "Emily Rodriguez", role: "Head of Design", image: "/placeholder.svg?height=300&width=300" },
            { name: "David Kim", role: "Marketing Director", image: "/placeholder.svg?height=300&width=300" },
            { name: "Olivia Williams", role: "Customer Experience", image: "/placeholder.svg?height=300&width=300" },
            { name: "James Wilson", role: "Operations Manager", image: "/placeholder.svg?height=300&width=300" },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-12 md:py-16 bg-muted rounded-lg my-12">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">ShopEase by the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">5000+</p>
              <p className="text-lg font-medium">Products</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100k+</p>
              <p className="text-lg font-medium">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-lg font-medium">Countries Served</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">24/7</p>
              <p className="text-lg font-medium">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of satisfied customers who have discovered the ShopEase difference.
        </p>
        <Button size="lg" asChild>
          <Link href="/products">
            Browse Our Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
