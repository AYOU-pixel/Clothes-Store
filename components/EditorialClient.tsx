// components/EditorialClient.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"

interface Editorial {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  mainImage: string | null
  video: string | null
  mainVideo: string | null
  tags: string[]
  isPublished: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

interface EditorialClientProps {
  editorials: Editorial[]
}

export default function EditorialClient({ editorials = [] }: EditorialClientProps) {
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  const handleVideoLoad = (id: string) => {
    setLoadedVideos(prev => new Set(prev).add(id))
  }

  // Simulate loading page (for 1.5s)
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [])

  // 🌑 Loading Page
  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 text-white"
      >
        {/* Logo or Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl font-light tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          ELEVATE
        </motion.h1>

        {/* Animated loading dots */}
        <motion.div
          className="flex space-x-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              variants={{
                hidden: { opacity: 0.3, y: 0 },
                visible: { opacity: 1, y: -4 }
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
        </motion.div>
      </motion.section>
    )
  }

  // 📰 If no content yet
  if (!editorials || editorials.length === 0) {
    return (
      <section className="py-20 md:py-32 px-4 md:px-6" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 text-neutral-900 uppercase">
            Editorial
          </h2>
          <div className="w-12 h-px bg-neutral-300 mx-auto mb-6" />
          <p className="text-xs tracking-widest uppercase text-neutral-500 font-light">
            Coming Soon
          </p>
        </motion.div>
      </section>
    )
  }

  const featuredEditorial = editorials[0]
  const otherEditorials = editorials.slice(1)

  return (
    <section className="bg-white" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-8 md:py-12 px-4"
      >
        <h1 className="text-base md:text-lg font-light tracking-[0.2em] text-neutral-900 uppercase mb-3">
          Editorial
        </h1>
        <div className="w-8 h-px bg-neutral-300 mx-auto" />
      </motion.div>

      {/* Featured Editorial */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-neutral-50">
          {/* Shimmer Placeholder */}
          {!loadedVideos.has(featuredEditorial.id) && (
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-[shimmer_1.5s_infinite]" />
          )}

          <div className="relative w-full h-full">
            {featuredEditorial.mainVideo && (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  loadedVideos.has(featuredEditorial.id) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadedData={() => handleVideoLoad(featuredEditorial.id)}
                onError={(e) => console.error('Video error:', e)}
              >
                <source 
                  src={`https://res.cloudinary.com/dpj5r6jrg/video/upload/q_auto,f_auto/${featuredEditorial.mainVideo}.mp4`} 
                  type="video/mp4" 
                />
              </video>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 lg:p-16">
              <div className="max-w-7xl mx-auto">
                {featuredEditorial.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {featuredEditorial.tags.slice(0, 2).map((tag, i) => (
                      <span 
                        key={i}
                        className="text-white/90 text-[9px] sm:text-[10px] tracking-[0.15em] font-light uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mb-3 sm:mb-4 md:mb-5 text-white uppercase leading-[1.1]">
                  {featuredEditorial.title}
                </h2>
                
                {featuredEditorial.excerpt && (
                  <p className="text-white/95 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl lg:max-w-2xl tracking-wide">
                    {featuredEditorial.excerpt}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Content */}
      <div className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-neutral-700 font-light leading-[1.8] text-xs sm:text-sm md:text-base tracking-wide">
              {featuredEditorial.content}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Editorial Grid */}
      {otherEditorials.length > 0 && (
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {otherEditorials.map((editorial, index) => (
                <motion.div
                  key={editorial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="group cursor-pointer"
                >
                  {editorial.video && (
                    <div className="relative overflow-hidden bg-neutral-50 mb-3 sm:mb-4">
                      <AspectRatio ratio={2/3}>
                        {/* Shimmer while loading */}
                        {!loadedVideos.has(editorial.id) && (
                          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-[shimmer_1.5s_infinite]" />
                        )}

                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="relative w-full h-full"
                        >
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                              loadedVideos.has(editorial.id) ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoadedData={() => handleVideoLoad(editorial.id)}
                          >
                            <source 
                              src={`https://res.cloudinary.com/dpj5r6jrg/video/upload/q_auto,f_auto/${editorial.video}.mp4`} 
                              type="video/mp4" 
                            />
                          </video>
                          
                          {editorial.tags.length > 0 && (
                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                              <span className="text-white text-[8px] sm:text-[9px] tracking-[0.15em] font-light uppercase bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5">
                                {editorial.tags[0]}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </AspectRatio>
                    </div>
                  )}

                  <div className="px-1">
                    <h3 className="text-xs sm:text-sm md:text-base font-light tracking-wide mb-2 text-neutral-900 uppercase group-hover:text-neutral-600 transition-colors duration-300">
                      {editorial.title}
                    </h3>
                    {editorial.excerpt && (
                      <p className="text-[10px] sm:text-xs text-neutral-600 font-light leading-[1.7] mb-2 sm:mb-3 tracking-wide">
                        {editorial.excerpt.length > 80 
                          ? `${editorial.excerpt.substring(0, 80)}...` 
                          : editorial.excerpt}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs text-neutral-500 font-light leading-[1.7] tracking-wide">
                      {editorial.content.length > 120 
                        ? `${editorial.content.substring(0, 120)}...` 
                        : editorial.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-16 sm:py-20 md:py-24 lg:py-32 px-4"
      >
        <div className="max-w-lg mx-auto">
          <h3 className="text-sm sm:text-base md:text-lg font-light tracking-[0.2em] mb-3 sm:mb-4 text-neutral-900 uppercase">
            Newsletter
          </h3>
          <div className="w-12 h-px bg-neutral-300 mx-auto mb-4 sm:mb-6" />
          <p className="text-[10px] sm:text-xs text-neutral-600 font-light mb-6 sm:mb-8 tracking-wide leading-[1.7] px-4">
            Subscribe for exclusive content and updates
          </p>
          <Button 
            variant="outline" 
            className="px-8 sm:px-10 md:px-12 py-2 sm:py-2.5 bg-transparent border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 font-light text-[10px] sm:text-[11px] tracking-[0.15em] uppercase rounded-none"
          >
            Subscribe
          </Button>
        </div>
      </motion.div>
    </section>
  )
}