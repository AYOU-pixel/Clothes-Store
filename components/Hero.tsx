// components/Hero.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Background with Zara-style parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/otfit.jpg')",
          }}
        />
        {/* Zara's signature subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
      </motion.div>

      {/* Content with Zara's typography style */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        
        {/* Main headline - Zara's signature typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-[0.02em] mb-6 leading-[0.9] font-serif"
          style={{ 
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}
        >
          ELEVATE
          <br />
          <span className="font-light italic">Your Style</span>
        </motion.h1>

        {/* Subtitle - Minimal and elegant */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.8, 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-sm md:text-base font-light tracking-[0.15em] uppercase max-w-lg mb-12 leading-relaxed"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 10px rgba(0,0,0,0.3)'
          }}
        >
          Discover timeless elegance in our curated collection
        </motion.p>

        {/* CTA Button - Zara's minimalist approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.2, 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ y: -2 }}
        >
          <Button
            size="lg"
            className="group relative px-8 py-3 bg-transparent border border-white/60 text-white font-light text-sm tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              borderRadius: '0px' // Zara uses sharp corners
            }}
          >
            <span className="relative z-10">Shop Collection</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Button>
        </motion.div>

        {/* Zara-style scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-[1px] h-12 bg-white/40"
          />
        </motion.div>
      </div>

      {/* Zara's signature corner text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-8 text-white/60 text-xs tracking-[0.2em] uppercase font-light"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        New Collection
      </motion.div>
    </section>
  )
}
