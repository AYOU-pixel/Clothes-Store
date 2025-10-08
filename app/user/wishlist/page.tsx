"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Heart } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
  mainImage: string
  currentPrice: number
  originalPrice: number
  isNew: boolean
  onSale: boolean
  category: { name: string; slug: string }
}

interface WishlistItem {
  id: string
  product: Product
}

export default function WishlistPage() {
  const { data: session } = useSession()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session?.user) {
      setIsLoading(false)
      return
    }

    const fetchWishlist = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/wishlist")
        if (response.ok) {
          const data = await response.json()
          setWishlist(data)
        } else {
          console.error("Failed to fetch wishlist")
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [session])

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })

      if (response.ok) {
        setWishlist((prev) => prev.filter((item) => item.product.id !== productId))
      } else {
        console.error("Failed to remove from wishlist")
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-wider font-normal">
            <Link href="/" className="text-black hover:text-neutral-600 transition-colors duration-150">
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-black">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-black uppercase">
            Wishlist
          </h1>
        </motion.div>

        {!session?.user ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-sm text-neutral-600 mb-6 uppercase tracking-wider">
              Please sign in to view your wishlist.
            </p>
            <Link href="/user">
              <Button
                className="bg-black text-white hover:bg-neutral-800 h-12 px-8 uppercase text-xs tracking-widest font-normal"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        ) : isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-sm text-neutral-600 uppercase tracking-wider">Loading...</p>
          </motion.div>
        ) : wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Heart size={64} className="mx-auto text-neutral-300 mb-6" strokeWidth={1} />
            <p className="text-sm text-neutral-600 mb-8 uppercase tracking-wider">
              Your wishlist is empty.
            </p>
            <Link href="/">
              <Button
                className="bg-black text-white hover:bg-neutral-800 h-12 px-8 uppercase text-xs tracking-widest font-normal"
              >
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-[11px] text-neutral-600 uppercase tracking-wider">
                {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {wishlist.map((item, index) => {
                const { product } = item
                const hasDiscount = product.currentPrice < product.originalPrice
                const discountPercent = hasDiscount
                  ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)
                  : 0

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <Card className="border-0 shadow-none bg-transparent overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden bg-neutral-50 mb-4">
                          <AspectRatio ratio={3/4}>
                            <Image
                              src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${product.mainImage}.jpg`}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            {/* Remove from Wishlist Button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveFromWishlist(product.id)}
                              className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm"
                            >
                              <Heart size={14} className="fill-black text-black" strokeWidth={1.5} />
                            </motion.button>
                            {(product.isNew || hasDiscount) && (
                              <div className="absolute top-3 left-3 space-y-1.5">
                                {product.isNew && (
                                  <Badge className="bg-black text-white text-[10px] px-2.5 py-1 font-normal uppercase tracking-wider">
                                    NEW
                                  </Badge>
                                )}
                                {hasDiscount && (
                                  <Badge className="bg-red-600 text-white text-[10px] px-2.5 py-1 font-normal uppercase tracking-wider">
                                    -{discountPercent}%
                                  </Badge>
                                )}
                              </div>
                            )}
                          </AspectRatio>
                        </div>
                        <div className="space-y-2">
                          <Link href={`/${product.slug}`}>
                            <h3 className="text-[13px] font-normal line-clamp-2 leading-tight text-black group-hover:text-neutral-600 transition-colors duration-200 uppercase tracking-wide">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-normal text-black">
                              ${product.currentPrice.toFixed(2)}
                            </span>
                            {hasDiscount && (
                              <span className="text-xs text-neutral-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
                            {product.category.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}