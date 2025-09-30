import { prisma } from '@/lib/prisma'
import MenProductsClient from "@/components/MenProductsClient"

export default async function MenPage() {
  try {
    // Find men's category
    const menCategory = await prisma.category.findUnique({
      where: { slug: "men" }
    })

    if (!menCategory) {
      return (
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-light mb-4">Category Not Found</h1>
          <p className="text-gray-600">The men's category could not be found.</p>
        </div>
      )
    }

    // Fetch products with all necessary fields
    const products = await prisma.product.findMany({
      where: { 
        categoryId: menCategory.id,
        inStock: true  // Only show in-stock products
      },
      orderBy: [
        { isNew: 'desc' },      // New products first
        { isFeatured: 'desc' }, // Then featured
        { createdAt: 'desc' }   // Then by creation date
      ]
    })

    return <MenProductsClient products={products} />
    
  } catch (error) {
    console.error('Error fetching men products:', error)
    
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