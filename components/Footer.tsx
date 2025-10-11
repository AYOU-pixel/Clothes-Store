// components/Footer.tsx
"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer
      className="bg-[#0a0a0a] text-white border-t border-[#1a1a1a]"
    >
      <div className="max-w-[1400px] mx-auto px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-base font-medium tracking-[0.3em] uppercase">
              AURA
            </h2>
            <p className="text-[11px] leading-[1.7] text-[#999999] tracking-[0.02em] font-light max-w-[240px]">
              Timeless design meets modern elegance. Discover our curated collections.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-[11px] text-[#999999]">
                <MapPin size={12} className="mt-[3px] flex-shrink-0 opacity-60" />
                <span className="font-light tracking-[0.02em] leading-[1.6]">123 Fifth Avenue<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#999999]">
                <Phone size={12} className="opacity-60 flex-shrink-0" />
                <span className="font-light tracking-[0.02em]">+1 (212) 555-0100</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#999999]">
                <Mail size={12} className="opacity-60 flex-shrink-0" />
                <span className="font-light tracking-[0.02em]">info@aura.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.25em] uppercase mb-7 text-white">
              Shop
            </h3>
            <ul className="space-y-[14px]">
              {[
                { name: "Woman", href: "/women" },
                { name: "Man", href: "/men" },
                { name: "Kids", href: "/kids" },
                { name: "Beauty", href: "/beauty" },
                { name: "Join Life", href: "/join-life" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-[11px] font-light text-[#999999] hover:text-white transition-colors duration-200 tracking-[0.02em]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.25em] uppercase mb-7 text-white">
              Company
            </h3>
            <ul className="space-y-[14px]">
              {[
                { name: "About", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Press", href: "/press" },
                { name: "Sustainability", href: "/sustainability" },
                { name: "Stores", href: "/stores" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-[11px] font-light text-[#999999] hover:text-white transition-colors duration-200 tracking-[0.02em]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.25em] uppercase mb-7 text-white">
              Newsletter
            </h3>
            
            {/* Newsletter Form */}
            <form className="space-y-3 mb-10">
              <Input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-[#2a2a2a] text-white placeholder:text-[#666666] h-11 px-4 text-[11px] font-light tracking-[0.02em] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white transition-colors"
              />
              <Button
                type="submit"
                className="w-full h-11 bg-white text-black hover:bg-[#e6e6e6] font-normal text-[10px] tracking-[0.2em] uppercase rounded-none transition-colors"
              >
                Subscribe
              </Button>
            </form>

            {/* Social Links */}
            <div className="space-y-6">
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-white">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
                ].map(({ icon: Icon, href, label }) => (
                  <Link 
                    key={label}
                    href={href} 
                    className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center hover:border-white hover:bg-white transition-all duration-200 group rounded-none"
                    aria-label={label}
                  >
                    <Icon size={14} className="text-[#999999] group-hover:text-black transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#1a1a1a] my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-light text-[#666666]">
            {[
              "Privacy Policy",
              "Terms of Use", 
              "Cookie Settings",
              "Accessibility"
            ].map((link) => (
              <Link 
                key={link}
                href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-white transition-colors duration-200 tracking-[0.05em]"
              >
                {link}
              </Link>
            ))}
          </div>
          
          <div className="text-[10px] font-light text-[#666666] tracking-[0.05em]">
            © {new Date().getFullYear()} AURA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
