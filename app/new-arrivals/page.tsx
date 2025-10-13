// app/new-arrivals/page.tsx
import { prisma } from '@/lib/prisma'
import NewArrivalsClient from "@/components/NewArrivalsClient"

export default async function NewArrivalsPage() {
  try {
    // Fetch all new products across all categories
    const products = await prisma.product.findMany({
      where: { 
        isNew: true,      // Only show products marked as new
        inStock: true     // Only show in-stock products
      },
      orderBy: [
        { createdAt: 'desc' },    // Newest first
        { isFeatured: 'desc' },   // Then featured
        { onSale: 'desc' }        // Then on sale items
      ]
    })

    return <NewArrivalsClient products={products} />
    
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
    
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-light mb-4">Error Loading Products</h1>
        <p className="text-gray-600">
          We&apos;re having trouble loading the products. Please try again later.
        </p>
      </div>
    )
  }
}