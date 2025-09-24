// ProductDetailsClient.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { 
  Share2, 
  Minus, 
  Plus, 
  Truck,
  RotateCcw,
  Shield,
  Ruler,
  ChevronDown,
  Star
} from "lucide-react"
import ProductImageGallery from "./ProductImageGallery"

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
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [showCareInfo, setCareInfo] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)

  // Calculate discount
  const hasDiscount = product.currentPrice < product.originalPrice
  const discountPercentage = product.discountPercent || 
    (hasDiscount ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100) : 0)

  // Zara-style color mapping with more sophisticated colors
  const colorMap: { [key: string]: string } = {
    'black': '#0a0a0a',
    'white': '#fafafa',
    'off-white': '#f8f8f6',
    'ecru': '#f5f0e8',
    'cream': '#f5f0e8',
    'beige': '#e6d7c3',
    'camel': '#c19a6b',
    'brown': '#8b4513',
    'navy': '#1a1f36',
    'blue': '#2563eb',
    'light-blue': '#87ceeb',
    'grey': '#6b7280',
    'gray': '#6b7280',
    'charcoal': '#36454f',
    'stone': '#a8a29e',
    'burgundy': '#722f37',
    'wine': '#722f37',
    'green': '#16a34a',
    'khaki': '#a3a380',
    'red': '#dc2626',
    'pink': '#ec4899',
    'purple': '#8b5cf6',
    'yellow': '#eab308',
    'orange': '#f97316',
    'teal': '#0d9488',
    'indigo': '#4f46e5',
    'taupe': '#a8a29e',
    'sand': '#ddbf94',
    'olive': '#6b7c32'
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Breadcrumb Navigation - Zara minimalist style */}
      <div className="border-b border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.1em] font-light">
            <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200">
              Home
            </Link>
            <span className="text-neutral-300">/</span>
            {product.category && (
              <>
                <Link href={`/${product.category.slug}`} className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200">
                  {product.category.name}
                </Link>
                <span className="text-neutral-300">/</span>
              </>
            )}
            <span className="text-neutral-900 font-normal truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 xl:gap-20">
          {/* Left - Image Gallery */}
          <div className="lg:col-span-7 xl:col-span-6">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              mainImage={product.mainImage}
              isWishlisted={isWishlisted}
              onWishlistToggle={() => setIsWishlisted(!isWishlisted)}
            />
          </div>

          {/* Right - Product Information */}
          <div className="lg:col-span-5 xl:col-span-6 lg:pl-4">
            <div className="sticky top-8 space-y-6 lg:space-y-8">
              {/* Product Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Category and Share */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {product.category && (
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-neutral-500 font-light mb-2">
                        {product.category.name}
                      </p>
                    )}
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-neutral-900 leading-tight mb-3 lg:mb-4">
                      {product.name}
                    </h1>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 ml-4"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-neutral-100 transition-colors duration-200"
                    >
                      <Share2 size={14} className="text-neutral-600" />
                    </Button>
                  </motion.div>
                </div>

                {/* Product Badges */}
                <div className="flex flex-wrap gap-2">
                  {product.isNew && (
                    <Badge className="bg-neutral-900 text-white border-0 px-2.5 py-1 text-[10px] font-light tracking-wide">
                      NEW
                    </Badge>
                  )}
                  {product.onSale && hasDiscount && (
                    <Badge className="bg-red-600 text-white border-0 px-2.5 py-1 text-[10px] font-light tracking-wide">
                      -{discountPercentage}%
                    </Badge>
                  )}
                  {product.isFeatured && (
                    <Badge className="bg-neutral-800 text-white border-0 px-2.5 py-1 text-[10px] font-light tracking-wide">
                      BESTSELLER
                    </Badge>
                  )}
                </div>

                {/* Price - Zara sophisticated styling */}
                <div className="flex items-baseline space-x-3 pt-2">
                  <span className="text-lg sm:text-xl font-normal text-neutral-900 tracking-tight">
                    ${product.currentPrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm text-neutral-400 line-through font-light">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                        Save ${(product.originalPrice - product.currentPrice).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-neutral-600 leading-relaxed font-light max-w-lg">
                    {product.description}
                  </p>
                )}
              </motion.div>

              {/* Color Selection - Enhanced Zara style */}
              {product.colors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-normal uppercase tracking-[0.1em] text-neutral-900">
                      Colour
                    </h3>
                    <span className="text-xs text-neutral-500 capitalize font-light">
                      {selectedColor.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.colors.map((color, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color 
                            ? 'border-neutral-900 scale-105 shadow-md' 
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        style={{ 
                          backgroundColor: colorMap[color.toLowerCase()] || color.toLowerCase()
                        }}
                        title={color.replace('-', ' ')}
                      >
                        {(color.toLowerCase() === 'white' || color.toLowerCase() === 'off-white') && (
                          <div className="absolute inset-1 rounded-full border border-neutral-200" />
                        )}
                        {selectedColor === color && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-2 rounded-full border-2 border-white opacity-90" 
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Size Selection - Premium Zara style */}
              {product.sizes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-normal uppercase tracking-[0.1em] text-neutral-900">
                      Size
                    </h3>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="flex items-center space-x-1 text-xs underline hover:no-underline transition-all duration-200 text-neutral-600 hover:text-neutral-900"
                    >
                      <Ruler size={12} />
                      <span className="font-light">Size guide</span>
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {product.sizes.map((size, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 sm:py-3.5 text-sm border transition-all duration-200 hover:border-neutral-900 ${
                          selectedSize === size
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                  {!selectedSize && product.sizes.length > 0 && (
                    <p className="text-xs text-neutral-500 font-light">Please select a size</p>
                  )}
                </motion.div>
              )}

              {/* Quantity - Refined minimal design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-normal uppercase tracking-[0.1em] text-neutral-900">Quantity</h3>
                  <span className="text-xs text-neutral-500 font-light">
                    {product.quantity > 10 ? 'In stock' : `Only ${product.quantity} left`}
                  </span>
                </div>
                <div className="flex items-center w-fit border border-neutral-200 hover:border-neutral-900 transition-colors duration-200">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-neutral-50 transition-colors duration-200 border-r border-neutral-200"
                  >
                    <Minus size={14} className="text-neutral-600" />
                  </motion.button>
                  <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    className="p-3 hover:bg-neutral-50 transition-colors duration-200 border-l border-neutral-200"
                  >
                    <Plus size={14} className="text-neutral-600" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Add to Cart - Premium Zara button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 pt-2"
              >
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button 
                    size="lg"
                    className="w-full h-12 sm:h-14 bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 font-light text-xs tracking-[0.15em] uppercase border-0"
                    disabled={!product.inStock || (product.sizes.length > 0 && !selectedSize)}
                  >
                    {!product.inStock 
                      ? 'Out of Stock' 
                      : product.sizes.length > 0 && !selectedSize 
                        ? 'Please select size' 
                        : 'Add to Bag'
                    }
                  </Button>
                </motion.div>

                {/* Stock Status */}
                {product.quantity <= 5 && product.quantity > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-50 p-3 rounded"
                  >
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="font-light">Only {product.quantity} items left in stock</span>
                  </motion.div>
                )}
              </motion.div>

              <Separator className="my-8" />

              {/* Service Icons - Zara premium style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-6 py-6"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-neutral-50 rounded-full flex items-center justify-center">
                    <Truck size={20} className="text-neutral-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-neutral-900">Free Delivery</p>
                    <p className="text-[10px] text-neutral-500 font-light">Orders over $100</p>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-neutral-50 rounded-full flex items-center justify-center">
                    <RotateCcw size={20} className="text-neutral-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-neutral-900">Easy Returns</p>
                    <p className="text-[10px] text-neutral-500 font-light">30 days policy</p>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-neutral-50 rounded-full flex items-center justify-center">
                    <Shield size={20} className="text-neutral-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-neutral-900">Quality Assured</p>
                    <p className="text-[10px] text-neutral-500 font-light">Premium materials</p>
                  </div>
                </div>
              </motion.div>

              <Separator className="my-8" />

              {/* Expandable Sections - Sophisticated Zara style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-1"
              >
                {/* Product Details */}
                <div className="border-b border-neutral-100">
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setShowProductDetails(!showProductDetails)}
                    className="w-full flex items-center justify-between py-5 text-sm font-normal uppercase tracking-[0.1em] transition-colors duration-200"
                  >
                    <span className="text-neutral-900">Product Details</span>
                    <motion.div
                      animate={{ rotate: showProductDetails ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-neutral-600" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {showProductDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pb-5 space-y-3 text-xs text-neutral-600 leading-relaxed font-light"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p><span className="font-medium text-neutral-900">SKU:</span> {product.sku || product.id.slice(-8).toUpperCase()}</p>
                            {product.tags.length > 0 && (
                              <p><span className="font-medium text-neutral-900">Style:</span> {product.tags.join(', ')}</p>
                            )}
                            <p><span className="font-medium text-neutral-900">Material:</span> 100% Premium Cotton</p>
                          </div>
                          <div className="space-y-2">
                            <p><span className="font-medium text-neutral-900">Fit:</span> Regular fit</p>
                            <p><span className="font-medium text-neutral-900">Model:</span> 5'9" wearing size M</p>
                            <p><span className="font-medium text-neutral-900">Origin:</span> Responsibly sourced</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Care Instructions */}
                <div className="border-b border-neutral-100">
                  <motion.button 
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setCareInfo(!showCareInfo)}
                    className="w-full flex items-center justify-between py-5 text-sm font-normal uppercase tracking-[0.1em] transition-colors duration-200"
                  >
                    <span className="text-neutral-900">Care & Composition</span>
                    <motion.div
                      animate={{ rotate: showCareInfo ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-neutral-600" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {showCareInfo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pb-5 space-y-4 text-xs text-neutral-600 leading-relaxed font-light"
                      >
                        <div>
                          <h4 className="font-medium text-neutral-900 mb-2">Composition</h4>
                          <ul className="space-y-1">
                            <li>• 100% Organic Cotton</li>
                            <li>• OEKO-TEX® Standard 100 certified</li>
                            <li>• Pre-washed for softness</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900 mb-2">Care Instructions</h4>
                          <ul className="space-y-1">
                            <li>• Machine wash at 30°C</li>
                            <li>• Do not bleach</li>
                            <li>• Tumble dry on low heat</li>
                            <li>• Iron at medium temperature</li>
                            <li>• Do not dry clean</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Delivery & Returns */}
                <div className="border-b border-neutral-100">
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setShowDelivery(!showDelivery)}
                    className="w-full flex items-center justify-between py-5 text-sm font-normal uppercase tracking-[0.1em] transition-colors duration-200"
                  >
                    <span className="text-neutral-900">Delivery & Returns</span>
                    <motion.div
                      animate={{ rotate: showDelivery ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-neutral-600" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {showDelivery && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pb-5 space-y-4 text-xs text-neutral-600 font-light"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-neutral-900 mb-3">Delivery Options</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                                <div>
                                  <p className="font-medium text-neutral-800">Standard Delivery</p>
                                  <p className="text-neutral-500">3-5 business days</p>
                                </div>
                                <span className="text-neutral-600">Free*</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                                <div>
                                  <p className="font-medium text-neutral-800">Express Delivery</p>
                                  <p className="text-neutral-500">1-2 business days</p>
                                </div>
                                <span className="text-neutral-600">$15</span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <div>
                                  <p className="font-medium text-neutral-800">Same Day</p>
                                  <p className="text-neutral-500">Selected cities only</p>
                                </div>
                                <span className="text-neutral-600">$25</span>
                              </div>
                            </div>
                            <p className="text-[10px] text-neutral-500 mt-3">*Free on orders over $100</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-neutral-900 mb-3">Returns & Exchanges</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Free returns within 30 days</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Items must be in original condition</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Return label included in package</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Refund processed within 5-7 days</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* You May Also Like - Enhanced Zara style */}
        {relatedProducts.length > 0 && (
          <RelatedProductsSection relatedProducts={relatedProducts} />
        )}
      </div>
    </div>
  )
}

// Enhanced Related Products Section
function RelatedProductsSection({ relatedProducts }: { relatedProducts: Product[] }) {
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
                        
                        {/* Enhanced hover overlay */}
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
                        
                        {/* Product badges */}
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
                      
                      {/* Color options preview */}
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