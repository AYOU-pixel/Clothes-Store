import { prisma } from '@/lib/prisma'
import WomenProductsClient from "@/components/WomenProductsClient"

export default async function WomenPage() {
  try {
    // Find women's category
    const womenCategory = await prisma.category.findUnique({
      where: { slug: "women" }
    })

    if (!womenCategory) {
      return (
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-light mb-4">Category Not Found</h1>
          <p className="text-gray-600">The women's category could not be found.</p>
        </div>
      )
    }

    // Fetch products with all necessary fields
    const products = await prisma.product.findMany({
      where: { 
        categoryId: womenCategory.id,
        inStock: true  // Only show in-stock products
      },
      orderBy: [
        { isNew: 'desc' },      // New products first
        { isFeatured: 'desc' }, // Then featured
        { createdAt: 'desc' }   // Then by creation date
      ]
    })

    return <WomenProductsClient products={products} />
    
  } catch (error) {
    console.error('Error fetching women products:', error)
    
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