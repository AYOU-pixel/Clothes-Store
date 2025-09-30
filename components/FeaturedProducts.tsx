// components/FeaturedProducts.tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const products = [
  {
    id: 1,
    name: "THE ESSENTIAL TEE",
    price: "29.00",
    description: "A wardrobe staple for every occasion.",
    image: "/images/1.png",
    tag: "NEW"
  },
  {
    id: 2,
    name: "THE PERFECT DRESS",
    price: "89.00", 
    description: "Find your perfect fit with our premium denim.",
    image: "/images/2.png",
    tag: "LIMITED EDITION"
  },
  {
    id: 3,
    name: "THE MODERN SKIRT",
    price: "129.00",
    description: "Timeless style and quality craftsmanship.",
    image: "/images/3.png",
    tag: "BESTSELLER"
  },
]

export default function FeaturedProducts() {
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
          FEATURED
        </h2>
        <div className="w-12 h-[1px] bg-black mx-auto mb-4" />
        <p className="text-xs tracking-[0.2em] uppercase font-light text-gray-600">
          Curated Selection
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="grid gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="group cursor-pointer"
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
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:contrast-105 group-hover:brightness-95"
                      />
                      
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                    
                    {/* Product Tag */}
                    {product.tag && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="absolute top-4 left-4"
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-white/95 backdrop-blur-sm text-black border-0 px-3 py-1 text-[10px] tracking-[0.15em] font-light hover:bg-white/95"
                        >
                          {product.tag}
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
                      >
                        Add to Cart
                      </Button>
                    </motion.div>

                    {/* Quick view button */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white/90 backdrop-blur-sm border border-black/10 hover:bg-white text-black rounded-none"
                      >
                        <span className="text-xs">+</span>
                      </Button>
                    </motion.div>
                  </AspectRatio>
                </div>
              </CardContent>

              <CardFooter className="p-0 pt-6">
                {/* Product Info */}
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <CardTitle className="text-sm font-light tracking-[0.05em] mb-2 text-black uppercase">
                    {product.name}
                  </CardTitle>
                  
                  <CardDescription className="text-xs text-gray-600 font-light mb-3 leading-relaxed">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-normal tracking-wide text-black">
                      $ {product.price}
                    </span>
                    
                    {/* Color options */}
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-black border border-gray-300"></div>
                      <div className="w-3 h-3 bg-gray-400 border border-gray-300"></div>
                      <div className="w-3 h-3 bg-white border border-gray-300"></div>
                    </div>
                  </div>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Button 
          variant="outline" 
          className="px-8 py-3 bg-transparent border border-black text-black hover:bg-black hover:text-white transition-all duration-500 font-light text-xs tracking-[0.1em] uppercase rounded-none"
        >
          View All Products
        </Button>
      </motion.div>
    </section>
  )
}




