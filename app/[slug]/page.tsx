import { notFound } from 'next/navigation'
import React from 'react'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth' 
import ProductDetailsClient from '@/components/ProductDetailsClient'
import type { Metadata } from 'next'

// نوع props
type Props = {
  params: Promise<{ slug: string }> 
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params 

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: { select: { name: true, slug: true } },
    },
  })

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  const hasDiscount = product.currentPrice < product.originalPrice
  const price = hasDiscount
    ? `$${product.currentPrice.toFixed(2)} (was $${product.originalPrice.toFixed(2)})`
    : `$${product.currentPrice.toFixed(2)}`

  return {
    title: `${product.name} | ${product.category?.name || 'Fashion'} | Your Store`,
    description:
      product.description ||
      `Shop ${product.name} - Premium quality ${product.category?.name?.toLowerCase() || 'fashion'} at unbeatable prices. ${price}`,
    keywords: [
      product.name,
      product.category?.name || '',
      ...product.tags,
      'fashion',
      'clothing',
      'style',
    ]
      .filter(Boolean)
      .join(', '),
    openGraph: {
      title: product.name,
      description:
        product.description ||
        `Premium ${product.category?.name?.toLowerCase() || 'fashion'} - ${price}`,
      images: [
        {
          url: `https://res.cloudinary.com/dpj5r6jrg/image/upload/${product.mainImage}.jpg`,
          width: 800,
          height: 1200,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description:
        product.description ||
        `Premium ${product.category?.name?.toLowerCase() || 'fashion'} - ${price}`,
      images: [
        `https://res.cloudinary.com/dpj5r6jrg/image/upload/${product.mainImage}.jpg`,
      ],
    },
  }
}

// Generate static params
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
    where: { inStock: true },
    take: 100,
  })

  return products.map((product) => ({
    slug: product.slug,
  }))
}

// صفحة المنتج
export default async function ProductPage({ params }: Props) {
  const { slug } = await params // 👈 نفس الحاجة: نستعمل await

  try {
    const session = await getServerSession(authOptions) // ✅ Now using the correct import

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { name: true, slug: true } },
      },
    })

    if (!product) {
      notFound()
    }

    // Check if the product is in the user's wishlist
    let isWishlisted = false
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      if (user) {
        const wishlistItem = await prisma.wishlist.findUnique({
          where: {
            userId_productId: {
              userId: user.id,
              productId: product.id,
            },
          },
        })
        isWishlisted = !!wishlistItem
      }
    }

    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        inStock: true,
      },
      include: {
        category: { select: { name: true, slug: true } },
      },
      take: 8,
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return (
      <ProductDetailsClient
        product={product}
        relatedProducts={relatedProducts}
        isWishlisted={isWishlisted}
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




