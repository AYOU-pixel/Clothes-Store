"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation" // ← إضافة هذا
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"

// Updated interface to match the new schema
interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  originalPrice: number
  currentPrice: number
  discountPercent: number | null
  currency: string
  mainImage: string
  images: string[]
  colors: string[]
  sizes: string[]
  inStock: boolean
  quantity: number
  categoryId: string
  isNew: boolean
  onSale: boolean
  isFeatured: boolean
  tags: string[]
  sku: string | null
  createdAt: Date
  updatedAt: Date
  category?: {
    name: string
    slug: string
  }
}

interface NewArrivalsClientProps {
  products: Product[]
}

export default function NewArrivalsClient({ products = [] }: NewArrivalsClientProps) {
  const router = useRouter() // ← إضافة هذا

  // دالة للانتقال إلى صفحة المنتج
  const handleProductClick = (productSlug: string) => {
    router.push(`/${productSlug}`)
  }

  // Handle empty products
  if (!products || products.length === 0) {
    return (
      <section className="py-24 container mx-auto px-4" style={{ fontFamily: '"Inter", sans-serif' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-thin tracking-[0.02em] mb-4 text-black"
              style={{ fontFamily: '"Playfair Display", serif' }}>
            NEW ARRIVALS
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto mb-4" />
          <p className="text-xs tracking-[0.2em] uppercase font-light text-gray-600">
            Fresh Styles Just In
          </p>
        </motion.div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">No new arrivals available at the moment.</p>
          <p className="text-gray-400 text-xs mt-2">Check back soon for the latest styles.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 container mx-auto px-4" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Section Title - Pure Zara style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-5xl font-thin tracking-[0.02em] mb-4 text-black"
            style={{ fontFamily: '"Playfair Display", serif' }}>
          NEW ARRIVALS
        </h2>
        <div className="w-12 h-[1px] bg-black mx-auto mb-4" />
        <p className="text-xs tracking-[0.2em] uppercase font-light text-gray-600">
          Fresh Styles Just In
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
          <div>
            <span className="font-light">{products.length} New Items</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div>
            <span className="font-light">Updated Weekly</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div>
            <span className="font-light">Limited Edition</span>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product, index) => {
          // Calculate if there's a discount
          const hasDiscount = product.currentPrice < product.originalPrice
          const discountPercentage = product.discountPercent || 
            (hasDiscount ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100) : 0)
          
          // For new arrivals, always show NEW badge first, then sale info
          let displayTag = "NEW"
          let secondaryTag = null
          
          if (product.onSale && hasDiscount) {
            secondaryTag = `${discountPercentage}% OFF`
          } else if (product.isFeatured) {
            secondaryTag = "FEATURED"
          }
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true, amount: 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product.slug)} // ← إضافة هذا
            >
              <Card className="border-0 shadow-none bg-transparent overflow-hidden">
                <CardContent className="p-0">
                  {/* Product Image Container */}
                  <div className="relative overflow-hidden bg-gray-50">
                    <AspectRatio ratio={3/4}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${product.mainImage}.jpg`}
                          alt={product.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:contrast-105 group-hover:brightness-95 cursor-pointer" // ← إضافة cursor-pointer
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 6} // Priority loading for first 6 images
                        />
                        
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                      
                      {/* Primary Tag - NEW */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="absolute top-4 left-4"
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-black text-white border-0 px-3 py-1 text-[10px] tracking-[0.15em] font-light hover:bg-black"
                        >
                          {displayTag}
                        </Badge>
                      </motion.div>

                      {/* Secondary Tag if available */}
                      {secondaryTag && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                          className="absolute top-4 left-4 mt-8"
                        >
                          <Badge 
                            variant="secondary" 
                            className="bg-white/95 backdrop-blur-sm text-black border-0 px-3 py-1 text-[10px] tracking-[0.15em] font-light hover:bg-white/95"
                          >
                            {secondaryTag}
                          </Badge>
                        </motion.div>
                      )}

                      {/* Category Badge */}
                      {product.category && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          className="absolute top-4 right-4"
                        >
                          <Badge 
                            variant="outline" 
                            className="bg-white/80 backdrop-blur-sm text-black border border-black/20 px-2 py-1 text-[9px] tracking-[0.1em] font-light uppercase hover:bg-white/90"
                          >
                            {product.category.name}
                          </Badge>
                        </motion.div>
                      )}
                      
                      {/* Hover button with slide-up effect */}
                      <motion.div
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0"
                      >
                        <Button 
                          className="w-full h-14 bg-black/90 backdrop-blur-sm text-white border-0 hover:bg-black transition-all duration-300 font-light text-xs tracking-[0.1em] uppercase rounded-none"
                          disabled={!product.inStock}
                          onClick={(e) => {
                            e.stopPropagation() // ← منع انتشار الحدث إلى العنصر الأب
                            // يمكنك إضافة وظيفة Add to Cart هنا لاحقاً
                          }}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </motion.div>

                      {/* Quick view button */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm border border-black/10 hover:bg-white text-black rounded-none"
                          onClick={(e) => {
                            e.stopPropagation() // ← منع الانتقال إلى صفحة المنتج
                            // يمكنك إضافة وظيفة Quick View هنا لاحقاً
                          }}
                        >
                          <span className="text-xs">+</span>
                        </Button>
                      </motion.div>

                      {/* Stock indicator */}
                      {product.quantity <= 5 && product.quantity > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                          className="absolute bottom-4 left-4"
                        >
                          <Badge 
                            variant="destructive" 
                            className="bg-red-500/90 text-white border-0 px-2 py-1 text-[9px] tracking-[0.1em] font-light"
                          >
                            Only {product.quantity} Left
                          </Badge>
                        </motion.div>
                      )}
                    </AspectRatio>
                  </div>
                </CardContent>

                <CardFooter className="p-0 pt-6">
                  {/* Product Info */}
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full cursor-pointer" // ← إضافة cursor-pointer
                    onClick={() => handleProductClick(product.slug)} // ← إضافة هذا أيضاً
                  >
                    <CardTitle className="text-sm font-light tracking-[0.05em] mb-2 text-black uppercase">
                      {product.name}
                    </CardTitle>
                    
                    <CardDescription className="text-xs text-gray-600 font-light mb-3 leading-relaxed">
                      {product.description || "Latest addition to our curated collection."}
                    </CardDescription>
                    
                    {/* Size availability indicator */}
                    {product.sizes.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 font-light">
                          Available in {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {/* Price display */}
                      {hasDiscount ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-normal tracking-wide text-black">
                            $ {product.currentPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            $ {product.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-normal tracking-wide text-black">
                          $ {product.currentPrice.toFixed(2)}
                        </span>
                      )}
                      
                      {/* Color options */}
                      <div className="flex space-x-1">
                        {product.colors.slice(0, 3).map((color, colorIndex) => {
                          // Better color mapping for display
                          const colorMap: { [key: string]: string } = {
                            'black': '#000000',
                            'white': '#ffffff',
                            'blue': '#3b82f6',
                            'navy': '#1e3a8a',
                            'grey': '#6b7280',
                            'gray': '#6b7280',
                            'cream': '#fef3c7',
                            'beige': '#f5f5dc',
                            'brown': '#a16207',
                            'burgundy': '#7f1d1d',
                            'green': '#059669',
                            'red': '#dc2626',
                            'camel': '#d2691e',
                            'charcoal': '#374151',
                            'taupe': '#a8a29e',
                            'pink': '#ec4899',
                            'purple': '#8b5cf6',
                            'yellow': '#eab308',
                            'orange': '#f97316',
                            'teal': '#0d9488',
                            'indigo': '#6366f1'
                          }
                          
                          return (
                            <div 
                              key={colorIndex} 
                              className="w-3 h-3 border border-gray-300 shadow-sm"
                              style={{ 
                                backgroundColor: colorMap[color.toLowerCase()] || color.toLowerCase(),
                                borderColor: color.toLowerCase() === 'white' ? '#d1d5db' : '#d1d5db'
                              }}
                            />
                          )
                        })}
                        {/* Add default colors if less than 3 colors available */}
                        {product.colors.length === 1 && (
                          <>
                            <div className="w-3 h-3 bg-gray-400 border border-gray-300 shadow-sm"></div>
                            <div className="w-3 h-3 bg-white border border-gray-300 shadow-sm"></div>
                          </>
                        )}
                        {product.colors.length === 2 && (
                          <div className="w-3 h-3 bg-white border border-gray-300 shadow-sm"></div>
                        )}
                      </div>
                    </div>

                    {/* Additional product info */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-400 font-light">
                        SKU: {product.sku || product.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 font-light">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* View All section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="px-8 py-3 bg-transparent border border-black text-black hover:bg-black hover:text-white transition-all duration-500 font-light text-xs tracking-[0.1em] uppercase rounded-none"
          >
            Shop All New Arrivals
          </Button>
          <p className="text-xs text-gray-500 font-light">
            New items added every week • Free shipping on orders over $100
          </p>
        </div>
      </motion.div>

      {/* Newsletter signup for new arrivals */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 text-center bg-gray-50 py-16 px-8 -mx-4"
      >
        <h3 className="text-lg font-light tracking-[0.05em] mb-4 text-black uppercase"
            style={{ fontFamily: '"Playfair Display", serif' }}>
          Stay Updated
        </h3>
        <p className="text-sm text-gray-600 font-light mb-6 max-w-md mx-auto">
          Be the first to know about new arrivals, exclusive collections, and special offers.
        </p>
        <div className="flex max-w-sm mx-auto space-x-2">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-white border border-gray-300 text-sm font-light focus:outline-none focus:border-black transition-colors"
          />
          <Button 
            className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-light text-xs tracking-[0.1em] uppercase rounded-none"
          >
            Subscribe
          </Button>
        </div>
      </motion.div>
    </section>
  )
}