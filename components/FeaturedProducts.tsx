// components/FeaturedProducts.tsx
import { prisma } from '@/lib/prisma'
import FeaturedProductsClient from "../components/FeaturedProductsClient"

export default async function FeaturedProducts() {
  try {
    // Fetch 3 featured products from database
    const products = await prisma.product.findMany({
      where: { 
        isFeatured: true,
        inStock: true
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: [
        { createdAt: 'desc' }
      ],
      take: 3 // Only take 3 products
    })

    // If no featured products, get 3 newest products instead
    if (products.length === 0) {
      const fallbackProducts = await prisma.product.findMany({
        where: { 
          inStock: true
        },
        include: {
          category: {
            select: {
              name: true,
              slug: true
            }
          }
        },
        orderBy: [
          { createdAt: 'desc' }
        ],
        take: 3
      })
      
      return <FeaturedProductsClient products={fallbackProducts} />
    }

    return <FeaturedProductsClient products={products} />
    
  } catch (error) {
    console.error('Error fetching featured products:', error)
    
    return (
      <section className="py-24 container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Featured Products</h2>
          <p className="text-gray-600">Unable to load products at this time.</p>
        </div>
      </section>
    )
  }
}