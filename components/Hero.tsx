"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate video loading or delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800) // 1.8s
    return () => clearTimeout(timer)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative h-[100svh] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] max-h-[900px] w-full overflow-hidden">
      
      {/* ===== 🎬 PRELOADER OVERLAY ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white uppercase tracking-[0.3em] font-light text-sm sm:text-base"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Loading
            </motion.div>

            {/* Small animation dots */}
            <motion.div
              className="flex gap-1 mt-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.25,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                  },
                },
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/70"
                  variants={{
                    hidden: { opacity: 0.3, y: 0 },
                    visible: { opacity: 1, y: -3 },
                  }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}

                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== 🌄 VIDEO BACKGROUND ===== */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoading(false)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dpj5r6jrg/video/upload/6010460_4k_Beautiful_3840x2160_l3aqvs.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
      </motion.div>

      {/* ===== 🧭 MAIN CONTENT ===== */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-[0.02em] mb-4"
          style={{
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          ELEVATE
          <br />
          <span className="font-light italic text-[0.85em]">Your Style</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] uppercase max-w-sm md:max-w-lg mb-8 leading-relaxed"
          style={{
            fontFamily: '"Inter", sans-serif',
            textShadow: "0 1px 10px rgba(0,0,0,0.3)",
          }}
        >
          Discover timeless elegance in our curated collection
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Button
            size="lg"
            onClick={scrollToContent}
            className="group relative px-8 py-3 bg-transparent border border-white/70 text-white font-light text-sm tracking-[0.12em] uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
            style={{
              fontFamily: '"Inter", sans-serif',
              borderRadius: "0px",
            }}
          >
            <span className="relative z-10">Shop Collection</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Button>
        </motion.div>
      </div>

      {/* ===== ⬇️ SCROLL ICON ===== */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/60" strokeWidth={1} />
        </motion.div>
      </motion.button>
    </section>
  )
}

