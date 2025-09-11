// components/Header.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [cartCount] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { label: "NEW", href: "/new-arrivals" },
    { label: "WOMEN", href: "/women" },
    { label: "MEN", href: "/men" },
    { label: "KIDS", href: "/kids" },
    { label: "ACCESSORIES", href: "/accessories" },
    { label: "EDITORIAL", href: "/editorial" },
    { label: "SALE", href: "/sale" },
  ]

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="sticky top-0 z-50 w-full bg-white border-b border-gray-100"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {/* Top notification bar - Zara style */}
        <div className="bg-black text-white text-center py-2 text-xs font-light tracking-[0.1em] uppercase">
          Free shipping on orders over $75
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Button - Left side on mobile */}
            <div className="flex items-center lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 hover:bg-transparent"
                  >
                    <Menu className="h-5 w-5 text-black" strokeWidth={1} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80">
                  <SheetHeader>
                    <SheetTitle 
                      className="text-lg font-thin tracking-[0.1em] text-black text-left"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      MENU
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Menu Content */}
                  <div className="flex flex-col h-full mt-6">
                    {/* Navigation Links */}
                    <nav className="flex-1">
                      <ul className="space-y-6">
                        {navItems.map((item, index) => (
                          <motion.li
                            key={item.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: 0.1 + index * 0.05,
                              duration: 0.4,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                          >
                            <Link
                              href={item.href}
                              className="block text-base font-light tracking-[0.05em] uppercase text-black hover:text-gray-600 transition-colors duration-300 py-2"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Mobile-only links */}
                      <div className="mt-12 pt-6 border-t border-gray-100">
                        <ul className="space-y-4">
                          {[
                            { label: "Account", href: "/account" },
                            { label: "Store Locator", href: "/stores" },
                            { label: "Customer Service", href: "/support" },
                          ].map((item, index) => (
                            <motion.li
                              key={item.label}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                delay: 0.4 + index * 0.05,
                                duration: 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                            >
                              <Link
                                href={item.href}
                                className="block text-sm font-light text-gray-600 hover:text-black transition-colors duration-300 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </nav>

                    {/* Menu Footer */}
                    <div className="pt-6 border-t border-gray-100">
                      <p className="text-xs font-light text-gray-500 tracking-[0.05em] uppercase">
                        Customer Service: +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo - Center on mobile, left on desktop */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link 
                href="/" 
                className="text-2xl font-thin tracking-[0.2em] text-black"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                AURA
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 + index * 0.05, 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-xs font-light tracking-[0.1em] uppercase text-black hover:text-gray-600 transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions - Right side */}
            <div className="flex items-center space-x-1 lg:space-x-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="p-2 hover:bg-transparent"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5 text-black" strokeWidth={1} />
              </Button>

              {/* Account - Hidden on mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex p-2 hover:bg-transparent"
                asChild
              >
                <Link href="/user">
                  <User className="h-5 w-5 text-black" strokeWidth={1} />
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative p-2 hover:bg-transparent"
                asChild
              >
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5 text-black" strokeWidth={1} />
                  {cartCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-black text-white text-[10px] font-light rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar - Appears below header */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="border-t border-gray-100 bg-white"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-0 py-2 text-sm font-light tracking-wide bg-transparent border-0 border-b border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300 placeholder:text-gray-400 rounded-none"
                      autoFocus
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 hover:bg-transparent"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-4 w-4 text-black" strokeWidth={1} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
