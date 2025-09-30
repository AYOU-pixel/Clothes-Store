// components/Newsletter.tsx
"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
  return (
    <section 
      className="py-24 bg-gray-50" 
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Zara-style minimalist header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 
              className="text-3xl md:text-5xl font-thin tracking-[0.02em] mb-6 text-black"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              NEWSLETTER
            </h2>
            <div className="w-16 h-[1px] bg-black mx-auto mb-6" />
            <p className="text-xs tracking-[0.2em] uppercase font-light text-gray-600 mb-2">
              Stay Connected
            </p>
            <p className="text-sm font-light leading-relaxed text-gray-700 max-w-lg mx-auto">
              Be the first to discover our latest collections, 
              exclusive offers, and editorial content.
            </p>
          </motion.div>

          {/* Zara-style minimal form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="relative"
          >
            <form className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto">
              {/* Email Input - Zara's clean style */}
              <motion.div 
                className="flex-1 relative"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-14 px-6 bg-white border border-black/20 text-sm font-light tracking-wide focus:border-black transition-all duration-300 placeholder:text-gray-400 placeholder:font-light"
                  style={{ borderRadius: '0px' }}
                  required
                />
              </motion.div>

              {/* Subscribe Button - Sharp Zara style */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  className="h-14 px-8 bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-300 font-light text-xs tracking-[0.1em] uppercase relative overflow-hidden group"
                  style={{ borderRadius: '0px' }}
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Button>
              </motion.div>
            </form>

            {/* Privacy note - Zara's attention to detail */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xs text-gray-500 font-light mt-6 leading-relaxed"
            >
              By subscribing, you agree to our privacy policy and consent to receive updates from our company.
            </motion.p>
          </motion.div>

          {/* Zara-style decorative elements */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center space-x-8"
          >
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </motion.div>

          {/* Additional Zara-style benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            {[
              { title: "EXCLUSIVE ACCESS", desc: "First to shop new arrivals" },
              { title: "PRIVATE SALES", desc: "Members-only promotions" },
              { title: "STYLE UPDATES", desc: "Curated fashion insights" }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <h4 className="text-xs font-light tracking-[0.15em] uppercase text-black mb-2">
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
