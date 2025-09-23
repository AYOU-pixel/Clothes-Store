"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  Truck,
  RotateCcw,
  Shield,
  Ruler,
  ChevronDown,
  Star,
  MessageCircle
} from "lucide-react"

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

interface ProductDetailsClientProps {
  product: Product
  relatedProducts?: Product[]
}

export default function ProductDetailsClient({ product, relatedProducts = [] }: ProductDetailsClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)

  // All product images including main image
  const allImages = [product.mainImage, ...product.images]

  // Calculate discount
  const hasDiscount = product.currentPrice < product.originalPrice
  const discountPercentage = product.discountPercent || 
    (hasDiscount ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100) : 0)

  // Zara-style color mapping
  const colorMap: { [key: string]: string } = {
    'black': '#1a1a1a',
    'white': '#fafafa',
    'off-white': '#f8f8f6',
    'cream': '#f5f0e8',
    'beige': '#e6d7c3',
    'camel': '#c19a6b',
    'brown': '#8b4513',
    'navy': '#1e293b',
    'blue': '#2563eb',
    'light-blue': '#7dd3fc',
    'grey': '#6b7280',
    'gray': '#6b7280',
    'charcoal': '#374151',
    'burgundy': '#7f1d1d',
    'wine': '#881337',
    'green': '#16a34a',
    'khaki': '#a3a380',
    'red': '#dc2626',
    'pink': '#ec4899',
    'purple': '#8b5cf6',
    'yellow': '#eab308',
    'orange': '#f97316',
    'teal': '#0d9488',
    'indigo': '#6366f1',
    'taupe': '#a8a29e'
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Breadcrumb Navigation - Zara Style */}
      <div className="container mx-auto px-4 py-4 border-b border-gray-100">
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-wider">
          <Link href="/" className="text-gray-500 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          {product.category && (
            <>
              <Link href={`/${product.category.slug}`} className="text-gray-500 hover:text-black transition-colors">
                {product.category.name}
              </Link>
              <span className="text-gray-300">/</span>
            </>
          )}
          <span className="text-black font-light">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Image Gallery - Zara Style */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden bg-gray-50 sticky top-8">
              <AspectRatio ratio={3/4}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${allImages[selectedImageIndex]}.jpg`}
                      alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Minimalist */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                    >
                      <ChevronLeft size={14} className="text-black" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
                    >
                      <ChevronRight size={14} className="text-black" />
                    </button>
                  </>
                )}

                {/* Image Counter - Bottom Center */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-1 text-xs font-light rounded-sm">
                  {selectedImageIndex + 1}/{allImages.length}
                </div>

                {/* Wishlist - Top Right */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all rounded-full"
                >
                  <Heart 
                    size={14} 
                    className={isWishlisted ? "fill-black text-black" : "text-black"}
                  />
                </button>
              </AspectRatio>
            </div>

            {/* Image Thumbnails - Horizontal Scroll */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-20 overflow-hidden border transition-all ${
                      selectedImageIndex === index 
                        ? 'border-black shadow-sm' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${image}.jpg`}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Information */}
          <div className="space-y-6 lg:py-4">
            {/* Product Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Category and Share */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {product.category && (
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-light mb-1">
                      {product.category.name}
                    </p>
                  )}
                  <h1 className="text-xl lg:text-2xl font-light tracking-tight text-black leading-tight mb-3">
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Share2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Product Badges */}
              <div className="flex flex-wrap gap-2">
                {product.isNew && (
                  <Badge className="bg-black text-white border-0 px-2 py-1 text-xs font-light">
                    NEW
                  </Badge>
                )}
                {product.onSale && hasDiscount && (
                  <Badge className="bg-red-600 text-white border-0 px-2 py-1 text-xs font-light">
                    -{discountPercentage}%
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-gray-800 text-white border-0 px-2 py-1 text-xs font-light">
                    FEATURED
                  </Badge>
                )}
              </div>

              {/* Price - Zara Style */}
              <div className="flex items-baseline space-x-3">
                <span className="text-lg font-normal text-black">
                  ${product.currentPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-red-600 font-medium">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-gray-600 leading-relaxed font-light max-w-md">
                  {product.description}
                </p>
              )}
            </motion.div>

            {/* Color Selection - Zara Style */}
            {product.colors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-normal uppercase tracking-wide">
                    Colour
                  </h3>
                  <span className="text-xs text-gray-500 capitalize">
                    {selectedColor.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-black scale-105 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ 
                        backgroundColor: colorMap[color.toLowerCase()] || color.toLowerCase()
                      }}
                      title={color.replace('-', ' ')}
                    >
                      {color.toLowerCase() === 'white' && (
                        <div className="absolute inset-1 rounded-full border border-gray-200" />
                      )}
                      {selectedColor === color && (
                        <div className="absolute inset-2 rounded-full border-2 border-white opacity-80" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Size Selection - Zara Style */}
            {product.sizes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-normal uppercase tracking-wide">
                    Size
                  </h3>
                  <button 
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center space-x-1 text-xs underline hover:no-underline transition-all"
                  >
                    <Ruler size={12} />
                    <span>Size guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm border transition-all hover:border-black ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && product.sizes.length > 0 && (
                  <p className="text-xs text-gray-500">Please select a size</p>
                )}
              </motion.div>
            )}

            {/* Quantity - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-normal uppercase tracking-wide">Quantity</h3>
                <span className="text-xs text-gray-500">
                  {product.quantity} in stock
                </span>
              </div>
              <div className="flex items-center space-x-0 w-fit border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors border-r border-gray-200"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  className="p-3 hover:bg-gray-50 transition-colors border-l border-gray-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            </motion.div>

            {/* Add to Cart - Zara Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 pt-4"
            >
              <Button 
                size="lg"
                className="w-full h-12 bg-black text-white hover:bg-gray-900 transition-all duration-300 font-light text-xs tracking-[0.1em] uppercase"
                disabled={!product.inStock || (product.sizes.length > 0 && !selectedSize)}
              >
                {!product.inStock 
                  ? 'Out of Stock' 
                  : product.sizes.length > 0 && !selectedSize 
                    ? 'Select Size' 
                    : 'Add to Bag'
                }
              </Button>

              {/* Stock Warning */}
              {product.quantity <= 5 && product.quantity > 0 && (
                <div className="flex items-center space-x-2 text-xs text-amber-600">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Only {product.quantity} left in stock</span>
                </div>
              )}
            </motion.div>

            {/* Service Icons - Zara Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 py-6 border-t border-gray-100"
            >
              <div className="text-center space-y-2">
                <Truck size={20} className="mx-auto text-gray-600" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw size={20} className="mx-auto text-gray-600" />
                <p className="text-xs text-gray-600">30-Day Returns</p>
              </div>
              <div className="text-center space-y-2">
                <Shield size={20} className="mx-auto text-gray-600" />
                <p className="text-xs text-gray-600">2-Year Warranty</p>
              </div>
            </motion.div>

            {/* Expandable Sections - Zara Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-1 border-t border-gray-100 pt-6"
            >
              {/* Product Details */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setShowProductDetails(!showProductDetails)}
                  className="w-full flex items-center justify-between py-4 text-sm font-normal uppercase tracking-wide hover:text-gray-600 transition-colors"
                >
                  Product Details
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showProductDetails ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {showProductDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pb-4 space-y-2 text-xs text-gray-600 leading-relaxed"
                    >
                      <p><strong>SKU:</strong> {product.sku || product.id.slice(-8).toUpperCase()}</p>
                      {product.tags.length > 0 && (
                        <p><strong>Style:</strong> {product.tags.join(', ')}</p>
                      )}
                      <p><strong>Material:</strong> 100% Premium Cotton</p>
                      <p><strong>Fit:</strong> Regular fit</p>
                      <p><strong>Model:</strong> 5'9" wearing size M</p>
                      <p><strong>Origin:</strong> Ethically sourced and manufactured</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Care Instructions */}
              <div className="border-b border-gray-100">
                <button className="w-full flex items-center justify-between py-4 text-sm font-normal uppercase tracking-wide hover:text-gray-600 transition-colors">
                  Care & Maintenance
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Delivery & Returns */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setShowDelivery(!showDelivery)}
                  className="w-full flex items-center justify-between py-4 text-sm font-normal uppercase tracking-wide hover:text-gray-600 transition-colors"
                >
                  Delivery & Returns
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showDelivery ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {showDelivery && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pb-4 space-y-3 text-xs text-gray-600"
                    >
                      <div>
                        <h4 className="font-medium text-black mb-2">Delivery Options</h4>
                        <ul className="space-y-1">
                          <li>• Standard Delivery (3-5 business days) - Free on orders over $100</li>
                          <li>• Express Delivery (1-2 business days) - $15</li>
                          <li>• Same Day Delivery (available in select cities) - $25</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-black mb-2">Returns</h4>
                        <ul className="space-y-1">
                          <li>• Free returns within 30 days of purchase</li>
                          <li>• Items must be in original condition with tags</li>
                          <li>• Return label included in package</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* You May Also Like - Zara Style */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 border-t border-gray-100 pt-16"
          >
            <div className="mb-8">
              <h2 className="text-lg font-light tracking-wide mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                You may also like
              </h2>
              <div className="w-8 h-px bg-black" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.slice(0, 4).map((relatedProduct, index) => {
                const relatedHasDiscount = relatedProduct.currentPrice < relatedProduct.originalPrice
                const relatedDiscountPercent = relatedHasDiscount ? 
                  Math.round(((relatedProduct.originalPrice - relatedProduct.currentPrice) / relatedProduct.originalPrice) * 100) : 0

                return (
                  <Link href={`/${relatedProduct.slug}`} key={relatedProduct.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden bg-gray-50 mb-3">
                            <AspectRatio ratio={3/4}>
                              <Image
                                src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${relatedProduct.mainImage}.jpg`}
                                alt={relatedProduct.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                              {/* Quick Add Overlay */}
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <Button 
                                  size="sm"
                                  className="w-full h-8 bg-white text-black hover:bg-gray-100 text-xs font-light tracking-wide"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                  }}
                                >
                                  Quick Add
                                </Button>
                              </div>
                              {/* Product Badges */}
                              {(relatedProduct.isNew || relatedHasDiscount) && (
                                <div className="absolute top-2 left-2 space-y-1">
                                  {relatedProduct.isNew && (
                                    <Badge className="bg-black text-white text-xs px-2 py-1">NEW</Badge>
                                  )}
                                  {relatedHasDiscount && (
                                    <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                                      -{relatedDiscountPercent}%
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </AspectRatio>
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-sm font-light line-clamp-2 leading-tight">
                              {relatedProduct.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-normal">
                                ${relatedProduct.currentPrice.toFixed(2)}
                              </span>
                              {relatedHasDiscount && (
                                <span className="text-xs text-gray-400 line-through">
                                  ${relatedProduct.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}