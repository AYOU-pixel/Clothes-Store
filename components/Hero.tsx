// components/Hero.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[800px] w-full overflow-hidden">
      {/* Background with responsive fixes */}
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
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/50" />
      </motion.div>

      {/* Content container with responsive padding and sizing */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
        
        {/* Responsive typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin tracking-[0.02em] mb-4 sm:mb-6 leading-[0.9] font-serif px-4"
          style={{ 
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}
        >
          ELEVATE
          <br />
          <span className="font-light italic">Your Style</span>
        </motion.h1>

        {/* Responsive subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.8, 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] uppercase max-w-xs sm:max-w-sm md:max-w-lg mb-8 sm:mb-12 leading-relaxed px-4"
          style={{ 
            fontFamily: '"Inter", sans-serif',
            textShadow: '0 1px 10px rgba(0,0,0,0.3)'
          }}
        >
          Discover timeless elegance in our curated collection
        </motion.p>

        {/* Responsive CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.2, 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ y: -2 }}
          className="px-4"
        >
          <Button
            size="lg"
            className="group relative px-6 sm:px-8 py-3 bg-transparent border border-white/60 text-white font-light text-xs sm:text-sm tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm w-full sm:w-auto"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              borderRadius: '0px'
            }}
          >
            <span className="relative z-10">Shop Collection</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Button>
        </motion.div>

        {/* Responsive scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-[1px] h-8 sm:h-12 bg-white/40"
          />
        </motion.div>
      </div>

      {/* Responsive corner text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white/60 text-xs tracking-[0.2em] uppercase font-light hidden sm:block"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        New Collection
      </motion.div>
    </section>
  )
}
