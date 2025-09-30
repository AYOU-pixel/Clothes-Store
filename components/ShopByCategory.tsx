// components/ShopByCategory.tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "MEN",
    subtitle: "Essential Collection",
    image: "/images/men.png",
    href: "/men",
  },
  {
    id: 2,
    name: "WOMEN",
    subtitle: "Premium Line",
    image: "/images/women.png",
    href: "/women",
  },
  {
    id: 3,
    name: "ACCESSORIES",
    subtitle: "Curated Selection",
    image: "/images/acecoir.png",
    href: "/accessories",
  },
]

export default function ShopByCategory() {
  return (
    <section
      className="py-24 container mx-auto px-4"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2
          className="text-3xl md:text-5xl font-thin tracking-[0.02em] mb-4 text-black"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          COLLECTIONS
        </h2>
        <div className="w-16 h-[1px] bg-black mx-auto mb-4" />
        <p className="text-xs tracking-[0.25em] uppercase font-light text-gray-600">
          Explore Our Categories
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, amount: 0.1 }}
            className="group cursor-pointer"
          >
            {/* Only ONE Link wrapper here */}
            <Link href={category.href} className="block">
              <Card className="border-0 shadow-none bg-transparent overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gray-50 mb-4">
                    <AspectRatio ratio={4 / 5}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:contrast-110 group-hover:brightness-95"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>

                      {/* Floating label */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <div className="text-center text-white">
                          <CardTitle
                            className="text-2xl md:text-3xl font-thin tracking-[0.05em] mb-2 text-white"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                          >
                            {category.name}
                          </CardTitle>
                          <div className="w-8 h-[1px] bg-white mx-auto mb-2" />
                          <CardDescription className="text-xs tracking-[0.2em] uppercase font-light text-white">
                            {category.subtitle}
                          </CardDescription>
                        </div>
                      </motion.div>

                      {/* Shop now button */}
                      <motion.div
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0"
                      >
                        <Button
                          className="w-full bg-black/80 backdrop-blur-sm text-white border-0 hover:bg-black/90 transition-all duration-300 font-light text-xs tracking-[0.15em] uppercase rounded-none h-16"
                        >
                          <span>Shop {category.name}</span>
                        </Button>
                      </motion.div>
                    </AspectRatio>
                  </div>
                </CardContent>

                {/* Static label under card */}
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <CardTitle className="text-sm font-light tracking-[0.1em] uppercase text-black mb-1">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-600 font-light tracking-[0.05em]">
                    {category.subtitle}
                  </CardDescription>
                </motion.div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Decorative line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{
          delay: 1,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        viewport={{ once: true }}
        className="mt-16 flex justify-center"
      >
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" />
      </motion.div>

      {/* Footer text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <p className="text-xs text-gray-500 font-light tracking-[0.15em] uppercase">
          Crafted for the Modern Individual
        </p>
      </motion.div>
    </section>
  )
}







