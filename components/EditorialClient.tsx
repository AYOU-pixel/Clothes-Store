"use client"
import { motion } from "framer-motion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
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
  if (!editorials || editorials.length === 0) {
    return (
      <section className="py-16 container mx-auto px-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-3 text-black uppercase">
            Editorial
          </h2>
          <p className="text-xs tracking-wider uppercase text-neutral-500">
            Coming Soon
          </p>
        </motion.div>
      </section>
    )
  }

  const featuredEditorial = editorials[0]
  const otherEditorials = editorials.slice(1)

  return (
    <section className="py-0" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Minimal Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-12 md:py-16 container mx-auto px-6"
      >
        <h1 className="text-xl md:text-2xl font-normal tracking-tight text-black uppercase mb-2">
          Editorial
        </h1>
        <div className="w-8 h-px bg-black mx-auto opacity-30" />
      </motion.div>

      {/* Featured Editorial - Full Bleed Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-0"
      >
        <div className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-neutral-50">
          <div className="relative w-full h-full">
            {featuredEditorial.mainVideo && (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => console.error('Video error:', e)}
              >
                <source 
                  src={`https://res.cloudinary.com/dpj5r6jrg/video/upload/${featuredEditorial.mainVideo}.mp4`} 
                  type="video/mp4" 
                />
              </video>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container mx-auto max-w-6xl">
                {featuredEditorial.tags.length > 0 && (
                  <div className="flex gap-3 mb-4">
                    {featuredEditorial.tags.slice(0, 2).map((tag, i) => (
                      <span 
                        key={i}
                        className="text-white text-[10px] tracking-widest font-normal uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-4 text-white uppercase leading-none">
                  {featuredEditorial.title}
                </h2>
                
                {featuredEditorial.excerpt && (
                  <p className="text-white/95 text-sm md:text-base font-light leading-relaxed max-w-2xl tracking-wide">
                    {featuredEditorial.excerpt}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Content - Minimal Spacing */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-neutral-700 font-light leading-relaxed text-sm md:text-base tracking-wide">
              {featuredEditorial.content}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Editorial Grid - Zara Style */}
      {otherEditorials.length > 0 && (
        <>
          <div className="container mx-auto px-6 py-8">
            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {otherEditorials.map((editorial, index) => (
                <motion.div
                  key={editorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group cursor-pointer"
                >
                  {editorial.video && (
                    <div className="relative overflow-hidden bg-neutral-100 mb-4">
                      <AspectRatio ratio={2/3}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.4 }}
                          className="relative w-full h-full"
                        >
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => console.error('Video error:', e)}
                          >
                            <source 
                              src={`https://res.cloudinary.com/dpj5r6jrg/video/upload/${editorial.video}.mp4`} 
                              type="video/mp4" 
                            />
                          </video>
                          
                          {editorial.tags.length > 0 && (
                            <div className="absolute top-4 left-4">
                              <span className="text-white text-[9px] tracking-widest font-normal uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5">
                                {editorial.tags[0]}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </AspectRatio>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm md:text-base font-normal tracking-tight mb-2 text-black uppercase group-hover:opacity-70 transition-opacity duration-300">
                      {editorial.title}
                    </h3>
                    
                    {editorial.excerpt && (
                      <p className="text-xs text-neutral-600 font-light leading-relaxed mb-3 tracking-wide">
                        {editorial.excerpt.length > 100 
                          ? `${editorial.excerpt.substring(0, 100)}...` 
                          : editorial.excerpt}
                      </p>
                    )}

                    <p className="text-xs text-neutral-500 font-light leading-relaxed tracking-wide">
                      {editorial.content.length > 150 
                        ? `${editorial.content.substring(0, 150)}...` 
                        : editorial.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Minimal Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-20 md:py-28 container mx-auto px-6"
      >
        <div className="max-w-xl mx-auto">
          <h3 className="text-lg md:text-xl font-normal tracking-tight mb-4 text-black uppercase">
            Newsletter
          </h3>
          <p className="text-xs text-neutral-600 font-light mb-8 tracking-wide leading-relaxed">
            Subscribe for exclusive content and updates
          </p>
          <Button 
            variant="outline" 
            className="px-10 py-2.5 bg-transparent border border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-normal text-[11px] tracking-widest uppercase rounded-none"
          >
            Subscribe
          </Button>
        </div>
      </motion.div>
    </section>
  )
}