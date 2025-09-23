import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductDetailsClient from '@/components/ProductDetailsClient'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: {
        select: {
          name: true,
          slug: true
        }
      }
    }
  })

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  const hasDiscount = product.currentPrice < product.originalPrice
  const price = hasDiscount 
    ? `$${product.currentPrice.toFixed(2)} (was $${product.originalPrice.toFixed(2)})` 
    : `$${product.currentPrice.toFixed(2)}`

  return {
    title: `${product.name} | ${product.category?.name || 'Fashion'} | Your Store`,
    description: product.description || `Shop ${product.name} - Premium quality ${product.category?.name?.toLowerCase() || 'fashion'} at unbeatable prices. ${price}`,
    keywords: [
      product.name,
      product.category?.name || '',
      ...product.tags,
      'fashion',
      'clothing',
      'style'
    ].filter(Boolean).join(', '),
    openGraph: {
      title: product.name,
      description: product.description || `Premium ${product.category?.name?.toLowerCase() || 'fashion'} - ${price}`,
      images: [
        {
          url: `https://res.cloudinary.com/dpj5r6jrg/image/upload/${product.mainImage}.jpg`,
          width: 800,
          height: 1200,
          alt: product.name,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description || `Premium ${product.category?.name?.toLowerCase() || 'fashion'} - ${price}`,
      images: [`https://res.cloudinary.com/dpj5r6jrg/image/upload/${product.mainImage}.jpg`],
    }
  }
}

// Generate static paths for better performance
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      slug: true
    },
    where: {
      inStock: true // Only generate paths for in-stock products
    },
    take: 100 // Limit to prevent build timeouts, adjust as needed
  })

  return products.map((product: { slug: any }) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Fetch the main product
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    if (!product) {
      notFound()
    }

    // Fetch related products from the same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id }, // Exclude current product
        inStock: true
      },
      take: 8, // Get more than needed in case some are unavailable
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return (
      <ProductDetailsClient 
        product={product} 
        relatedProducts={relatedProducts}
      />
    )

  } catch (error) {
    console.error('Error fetching product:', error)
    
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-light mb-4">Error Loading Product</h1>
        <p className="text-gray-600 mb-8">
          We&apos;re having trouble loading this product. Please try again later.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-transparent border border-black text-black hover:bg-black hover:text-white transition-all duration-500 font-light text-xs tracking-[0.1em] uppercase"
        >
          Refresh Page
        </button>
      </div>
    )
  }
}