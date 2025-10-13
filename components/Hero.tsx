"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true)
  const [videoReady, setVideoReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile for optimized video
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle video readiness
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoReady) {
        setIsLoading(false)
      }
    }, 2500) // Fallback timeout
    return () => clearTimeout(timer)
  }, [videoReady])

  const handleVideoCanPlay = () => {
    setVideoReady(true)
    setTimeout(() => setIsLoading(false), 300) // Brief delay for smooth transition
  }

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative h-[100svh] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] max-h-[900px] w-full overflow-hidden bg-black">
      
      {/* ===== 🎬 PRELOADER OVERLAY ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white uppercase tracking-[0.3em] font-light text-xs sm:text-sm"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Loading
            </motion.div>

            {/* Animated dots */}
            <motion.div
              className="flex gap-2 mt-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                  },
                },
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/70"
                  variants={{
                    hidden: { opacity: 0.4, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                />
              ))}
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mt-6 h-0.5 bg-white/20 rounded-full overflow-hidden w-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-white/70"
                initial={{ width: "0%" }}
                animate={{ width: "90%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== 🌄 VIDEO BACKGROUND ===== */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={handleVideoCanPlay}
          onLoadedData={handleVideoCanPlay}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <source
            src="https://res.cloudinary.com/dpj5r6jrg/video/upload/6010460_4k_Beautiful_3840x2160_l3aqvs.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Solid color fallback while loading */}
        {!videoReady && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
      </motion.div>

      {/* ===== 🧭 MAIN CONTENT ===== */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-[0.02em] mb-3 sm:mb-4"
          style={{
            fontFamily: '"Playfair Display", "Times New Roman", serif',
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            lineHeight: "1.1",
          }}
        >
          ELEVATE
          <br />
          <span className="font-light italic text-[0.82em]">Your Style</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
          className="text-xs sm:text-sm md:text-base font-light tracking-[0.12em] uppercase max-w-xs sm:max-w-sm md:max-w-lg mb-6 sm:mb-8 leading-relaxed"
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
          transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
        >
          <Button
            size="lg"
            onClick={scrollToContent}
            className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-white/70 text-white font-light text-xs sm:text-sm tracking-[0.12em] uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
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
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 hover:text-white/80 transition-colors" strokeWidth={1} />
        </motion.div>
      </motion.button>
    </section>
  )
}

