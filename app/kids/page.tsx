import { prisma } from '@/lib/prisma'
import KidsProductsClient from "@/components/KidsProductsClient";

export default async function KidsPage() {
  try {
    // Find kids' category
    const kidsCategory = await prisma.category.findUnique({
      where: { slug: "kids" }
    })

    if (!kidsCategory) {
      return (
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-light mb-4">Category Not Found</h1>
          <p className="text-gray-600">The kids' category could not be found.</p>
        </div>
      )
    }

    // Fetch products with all necessary fields
    const products = await prisma.product.findMany({
      where: { 
        categoryId: kidsCategory.id,
        inStock: true  // Only show in-stock products
      },
      orderBy: [
        { isNew: 'desc' },      // New products first
        { isFeatured: 'desc' }, // Then featured
        { createdAt: 'desc' }   // Then by creation date
      ]
    })

    return <KidsProductsClient products={products} />
    
  } catch (error) {
    console.error('Error fetching kids products:', error)
    
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