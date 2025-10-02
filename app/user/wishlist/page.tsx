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
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-neutral-900">
            Your Wishlist
          </h1>
          <div className="w-12 h-px bg-neutral-900 mt-4" />
        </motion.div>

        {!session?.user ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-sm text-neutral-600 font-light mb-4">
              Please sign in to view your wishlist.
            </p>
            <Link href="/user">
              <Button
                className="h-10 bg-neutral-900 text-white hover:bg-neutral-800 font-light text-xs tracking-[0.15em] uppercase"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        ) : isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-sm text-neutral-600 font-light">Loading your wishlist...</p>
          </motion.div>
        ) : wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-sm text-neutral-600 font-light mb-4">
              Your wishlist is empty.
            </p>
            <Link href="/">
              <Button
                className="h-10 bg-neutral-900 text-white hover:bg-neutral-800 font-light text-xs tracking-[0.15em] uppercase"
              >
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
                      <div className="relative overflow-hidden bg-neutral-50 mb-3 sm:mb-4">
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
                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 rounded-full shadow-sm"
                          >
                            <Heart size={12} className="fill-neutral-800 text-neutral-800" />
                          </motion.button>
                          {(product.isNew || hasDiscount) && (
                            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 space-y-1">
                              {product.isNew && (
                                <Badge className="bg-neutral-900 text-white text-[10px] px-2 py-1 font-light">
                                  NEW
                                </Badge>
                              )}
                              {hasDiscount && (
                                <Badge className="bg-red-600 text-white text-[10px] px-2 py-1 font-light">
                                  -{discountPercent}%
                                </Badge>
                              )}
                            </div>
                          )}
                        </AspectRatio>
                      </div>
                      <div className="space-y-2">
                        <Link href={`/${product.slug}`}>
                          <h3 className="text-sm font-light line-clamp-2 leading-tight text-neutral-900 group-hover:text-neutral-600 transition-colors duration-200">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-normal text-neutral-900">
                            ${product.currentPrice.toFixed(2)}
                          </span>
                          {hasDiscount && (
                            <>
                              <span className="text-xs text-neutral-400 line-through font-light">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                -{discountPercent}%
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.1em]">
                          {product.category.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}