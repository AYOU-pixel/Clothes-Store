//ProductImageGallery.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  mainImage: string
  isWishlisted: boolean
  onWishlistToggle: () => void
}

export default function ProductImageGallery({ 
  images, 
  productName, 
  mainImage,
  isWishlisted,
  onWishlistToggle 
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // All product images including main image
  const allImages = [mainImage, ...images]

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative group mb-3 sm:mb-4">
        <AspectRatio ratio={3/4} className="bg-neutral-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="relative w-full h-full"
            >
              <Image
                src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${allImages[selectedImageIndex]}.jpg`}
                alt={`${productName} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Zara minimal style */}
          {allImages.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-sm"
                onClick={prevImage}
              >
                <ChevronLeft size={16} className="text-neutral-800" />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-sm"
                onClick={nextImage}
              >
                <ChevronRight size={16} className="text-neutral-800" />
              </motion.button>
            </>
          )}

          {/* Image Counter - Zara style */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900/70 text-white px-2.5 py-1 text-[10px] sm:text-xs font-light tracking-wider">
            {selectedImageIndex + 1}/{allImages.length}
          </div>

          {/* Wishlist Button - Top Right */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onWishlistToggle}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 rounded-full shadow-sm"
          >
            <Heart 
              size={14} 
              className={isWishlisted ? "fill-neutral-800 text-neutral-800" : "text-neutral-800"}
            />
          </motion.button>
        </AspectRatio>
      </div>

      {/* Image Thumbnails - Zara horizontal scroll */}
      {allImages.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative flex-shrink-0 w-14 h-[70px] sm:w-16 sm:h-20 md:w-18 md:h-[90px] overflow-hidden transition-all duration-200 ${
                selectedImageIndex === index 
                  ? 'ring-1 ring-neutral-800 shadow-sm' 
                  : 'ring-1 ring-neutral-200 hover:ring-neutral-400'
              }`}
            >
              <Image
                src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${image}.jpg`}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 72px"
              />
              {selectedImageIndex === index && (
                <div className="absolute inset-0 bg-neutral-900/10" />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}