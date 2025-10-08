import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Star } from "lucide-react"

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

interface RelatedProductsSectionProps {
  relatedProducts: Product[]
}

export default function RelatedProductsSection({ relatedProducts }: RelatedProductsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-16 sm:mt-20 lg:mt-24 border-t border-neutral-100 pt-12 sm:pt-16 lg:pt-20"
    >
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-wide text-neutral-900">
            You may also like
          </h2>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-neutral-500 ml-2 font-light">Customer favorites</span>
          </div>
        </div>
        <div className="w-12 h-px bg-neutral-900" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {relatedProducts.slice(0, 4).map((relatedProduct, index) => {
          const relatedHasDiscount = relatedProduct.currentPrice < relatedProduct.originalPrice
          const relatedDiscountPercent = relatedHasDiscount ? 
            Math.round(((relatedProduct.originalPrice - relatedProduct.currentPrice) / relatedProduct.originalPrice) * 100) : 0

          return (
            <Link href={`/${relatedProduct.slug}`} key={relatedProduct.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="border-0 shadow-none bg-transparent overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden bg-neutral-50 mb-3 sm:mb-4">
                      <AspectRatio ratio={3/4}>
                        <Image
                          src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${relatedProduct.mainImage}.jpg`}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            className="w-full"
                          >
                            <Button 
                              size="sm"
                              className="w-full h-8 sm:h-9 bg-white/95 text-neutral-900 hover:bg-white text-[10px] sm:text-xs font-light tracking-wide border-0 backdrop-blur-sm"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                              }}
                            >
                              Quick Add
                            </Button>
                          </motion.div>
                        </div>
                        
                        {(relatedProduct.isNew || relatedHasDiscount) && (
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 space-y-1">
                            {relatedProduct.isNew && (
                              <Badge className="bg-neutral-900 text-white text-[10px] px-2 py-1 font-light">NEW</Badge>
                            )}
                            {relatedHasDiscount && (
                              <Badge className="bg-red-600 text-white text-[10px] px-2 py-1 font-light">
                                -{relatedDiscountPercent}%
                              </Badge>
                            )}
                          </div>
                        )}
                      </AspectRatio>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-light line-clamp-2 leading-tight text-neutral-900 group-hover:text-neutral-600 transition-colors duration-200">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-normal text-neutral-900">
                          ${relatedProduct.currentPrice.toFixed(2)}
                        </span>
                        {relatedHasDiscount && (
                          <>
                            <span className="text-xs text-neutral-400 line-through font-light">
                              ${relatedProduct.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                              -{relatedDiscountPercent}%
                            </span>
                          </>
                        )}
                      </div>
                      
                      {relatedProduct.colors.length > 0 && (
                        <div className="flex space-x-1 pt-1">
                          {relatedProduct.colors.slice(0, 4).map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-3 h-3 rounded-full border border-neutral-200"
                              style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fafafa' : color.toLowerCase() }}
                              title={color}
                            />
                          ))}
                          {relatedProduct.colors.length > 4 && (
                            <div className="w-3 h-3 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                              <span className="text-[8px] text-neutral-500">+</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}