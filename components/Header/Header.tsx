// components/Header.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import SearchBar from "./SearchBar"

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
        {/* Top notification bar */}
        <div className="bg-black text-white text-center py-1.5 sm:py-2 text-[10px] sm:text-xs font-light tracking-[0.05em] sm:tracking-[0.1em] uppercase px-2">
          <span className="hidden sm:inline">Free shipping on orders over $75</span>
          <span className="sm:hidden">Free shipping $75+</span>
        </div>

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between min-h-[44px] sm:min-h-[48px]">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden w-10 justify-start">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-1.5 sm:p-2 hover:bg-transparent touch-manipulation"
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-black" strokeWidth={1} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80 max-w-sm">
                  <SheetHeader>
                    <SheetTitle 
                      className="text-lg sm:text-xl font-thin tracking-[0.1em] text-black text-left"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      MENU
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Menu Content */}
                  <div className="flex flex-col h-full mt-4 sm:mt-6">
                    <nav className="flex-1">
                      <ul className="space-y-4 sm:space-y-6">
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
                              className="block text-sm sm:text-base font-light tracking-[0.05em] uppercase text-black hover:text-gray-600 active:text-gray-800 transition-colors duration-300 py-2 sm:py-3 touch-manipulation"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Mobile-only links */}
                      <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-gray-100">
                        <ul className="space-y-3 sm:space-y-4">
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
                                className="block text-xs sm:text-sm font-light text-gray-600 hover:text-black active:text-gray-800 transition-colors duration-300 py-2 sm:py-3 touch-manipulation"
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
                    <div className="pt-4 sm:pt-6 border-t border-gray-100">
                      <p className="text-[10px] sm:text-xs font-light text-gray-500 tracking-[0.05em] uppercase">
                        <span className="hidden sm:inline">Customer Service: +1 (555) 123-4567</span>
                        <span className="sm:hidden">Support: +1 (555) 123-4567</span>
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link 
                href="/" 
                className="text-xl sm:text-2xl lg:text-3xl font-thin tracking-[0.15em] sm:tracking-[0.2em] text-black touch-manipulation"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                AURA
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
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
                    className="text-xs xl:text-sm font-light tracking-[0.08em] xl:tracking-[0.1em] uppercase text-black hover:text-gray-600 transition-colors duration-300 relative group whitespace-nowrap"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 w-10 sm:w-auto justify-end">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="p-1.5 sm:p-2 hover:bg-transparent touch-manipulation"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-black" strokeWidth={1} />
              </Button>

              {/* Account */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex p-1.5 sm:p-2 hover:bg-transparent touch-manipulation"
                asChild
              >
                <Link href="/user">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-black" strokeWidth={1} />
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative p-1.5 sm:p-2 hover:bg-transparent touch-manipulation"
                asChild
              >
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-black" strokeWidth={1} />
                  {cartCount > 0 && (
                    <Badge 
                      className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 p-0 bg-black text-white text-[9px] sm:text-[10px] font-light rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar Component */}
        <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </motion.header>
    </>
  )
}
