// components/Footer.tsx
"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className="bg-black text-white"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section - Zara style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 
              className="text-2xl font-thin tracking-[0.1em] mb-6"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              AURA
            </h2>
            <p className="text-sm font-light text-gray-400 leading-relaxed mb-6">
              Discover timeless elegance and contemporary style. 
              Crafting exceptional fashion experiences since our founding.
            </p>
            
            {/* Contact Info - Zara style */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <MapPin size={14} />
                <span className="font-light tracking-wide">New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <Phone size={14} />
                <span className="font-light tracking-wide">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <Mail size={14} />
                <span className="font-light tracking-wide">hello@aura.com</span>
              </div>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-light tracking-[0.15em] uppercase mb-6 text-gray-300">
              Collections
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Men", href: "/men" },
                { name: "Women", href: "/women" },
                { name: "Accessories", href: "/accessories" },
                { name: "New Arrivals", href: "/new" },
                { name: "Sale", href: "/sale" },
                { name: "Editorial", href: "/editorial" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm font-light text-white hover:text-gray-300 transition-colors duration-300 tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-light tracking-[0.15em] uppercase mb-6 text-gray-300">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Press", href: "/press" },
                { name: "Sustainability", href: "/sustainability" },
                { name: "Size Guide", href: "/size-guide" },
                { name: "Store Locator", href: "/stores" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm font-light text-white hover:text-gray-300 transition-colors duration-300 tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social - Zara premium style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-light tracking-[0.15em] uppercase mb-6 text-gray-300">
              Stay Connected
            </h3>
            
            {/* Newsletter Form - Minimal Zara style */}
            <form className="space-y-4 mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border border-gray-700 text-white placeholder:text-gray-500 h-12 px-4 text-sm font-light focus:border-white transition-colors duration-300"
                style={{ borderRadius: '0px' }}
              />
              <Button
                type="submit"
                className="w-full h-12 bg-white text-black hover:bg-gray-200 font-light text-xs tracking-[0.1em] uppercase transition-colors duration-300"
                style={{ borderRadius: '0px' }}
              >
                Subscribe
              </Button>
            </form>

            {/* Social Links - Minimal icons */}
            <div className="flex space-x-4 mb-6">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
              ].map(({ icon: Icon, href, label }) => (
                <Link 
                  key={label}
                  href={href} 
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon size={16} className="text-gray-400 group-hover:text-black transition-colors duration-300" />
                </Link>
              ))}
            </div>

            {/* App Download - Zara style */}
            <div className="space-y-2">
              <p className="text-xs font-light tracking-[0.1em] uppercase text-gray-400 mb-3">
                Download App
              </p>
              <div className="flex space-x-2">
                <div className="px-3 py-2 border border-gray-700 text-xs font-light tracking-wide hover:border-white transition-colors duration-300 cursor-pointer">
                  App Store
                </div>
                <div className="px-3 py-2 border border-gray-700 text-xs font-light tracking-wide hover:border-white transition-colors duration-300 cursor-pointer">
                  Google Play
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Zara-style divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="w-full h-[1px] bg-gray-800 my-12"
        />

        {/* Bottom Section - Legal & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex flex-wrap gap-6 text-xs font-light text-gray-400">
            {[
              "Privacy Policy",
              "Terms of Service", 
              "Cookie Policy",
              "Accessibility",
              "Returns & Exchanges"
            ].map((link) => (
              <Link 
                key={link}
                href={`/${link.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                className="hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link}
              </Link>
            ))}
          </div>
          
          <div className="text-xs font-light text-gray-400 tracking-wide">
            © {new Date().getFullYear()} AURA. All rights reserved.
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
