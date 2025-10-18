"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User, LogOut, Package, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import { useSession, signOut } from "next-auth/react";
import { UserAvatar } from "@/components/UserAvatar";

export default function Header() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Fetch cart count function
  const fetchCartCount = useCallback(async () => {
    if (!session?.user) {
      setCartCount(0);
      return;
    }

    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const cart = await response.json();
        const count = cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    }
  }, [session]);

  // Initial fetch and refetch on session change
  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  // Periodic refetch every 30 seconds
  useEffect(() => {
    if (!session?.user) return;

    const interval = setInterval(fetchCartCount, 30000);
    return () => clearInterval(interval);
  }, [fetchCartCount, session]);

  // Enhanced event listeners for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      console.log('Cart update event received');
      fetchCartCount();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cartUpdated') {
        fetchCartCount();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', fetchCartCount);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', fetchCartCount);
    };
  }, [fetchCartCount]);

  const navItems = [
    { label: "NEW", href: "/new-arrivals" },
    { label: "WOMEN", href: "/women" },
    { label: "MEN", href: "/men" },
    { label: "KIDS", href: "/kids" },
    { label: "ACCESSORIES", href: "/accessories" },
    { label: "EDITORIAL", href: "/editorial" },
  ];

  const userMenuItems = [
    { label: "My Profile", href: "/user", icon: User },
    { label: "My Orders", href: "/user/orders", icon: Package },
    { label: "Wishlist", href: "/user/wishlist", icon: Heart },
    { label: "Settings", href: "/user/settings", icon: Settings },
  ];

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
                    {/* User Info in Mobile Menu */}
                    {session && (
                      <div className="mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <UserAvatar
                            src={session.user?.image}
                            name={session.user?.name}
                            className="w-12 h-12 border-2 border-gray-100"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-black truncate">{session.user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                          </div>
                        </div>
                      </div>
                    )}

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
                              ease: [0.25, 0.46, 0.45, 0.94],
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
                          {session ? (
                            <>
                              {userMenuItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                  <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: 0.4 + index * 0.05,
                                      duration: 0.4,
                                      ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                  >
                                    <Link
                                      href={item.href}
                                      className="flex items-center space-x-2 text-xs sm:text-sm font-light text-gray-600 hover:text-black active:text-gray-800 transition-colors duration-300 py-2 sm:py-3 touch-manipulation"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                                      <span>{item.label}</span>
                                    </Link>
                                  </motion.li>
                                );
                              })}
                              <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.6,
                                  duration: 0.4,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                              >
                                <button
                                  onClick={() => {
                                    signOut();
                                    setMobileMenuOpen(false);
                                  }}
                                  className="flex items-center space-x-2 text-xs sm:text-sm font-light text-red-600 hover:text-red-700 active:text-red-800 transition-colors duration-300 py-2 sm:py-3 touch-manipulation w-full"
                                >
                                  <LogOut className="h-4 w-4" strokeWidth={1.5} />
                                  <span>Sign Out</span>
                                </button>
                              </motion.li>
                            </>
                          ) : (
                            <>
                              {[
                                { label: "Account", href: "/user" },
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
                                    ease: [0.25, 0.46, 0.45, 0.94],
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
                            </>
                          )}
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
                    ease: [0.25, 0.46, 0.45, 0.94],
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

              {/* Account - Desktop */}
              <div className="hidden sm:block relative">
                {session ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-1.5 sm:p-2 hover:bg-transparent touch-manipulation"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      <UserAvatar
                        src={session.user?.image}
                        name={session.user?.name}
                        className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-gray-200 hover:border-gray-400 transition-colors ring-offset-2"
                      />
                    </Button>

                    {/* User Dropdown Menu */}
                    <AnimatePresence>
                      {userMenuOpen && (
                        <>
                          {/* Backdrop */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />

                          {/* Dropdown */}
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden"
                          >
                            {/* User Info Header */}
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <UserAvatar
                                  src={session.user?.image}
                                  name={session.user?.name}
                                  className="w-12 h-12 border-2 border-white shadow-sm"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-black truncate">
                                    {session.user?.name}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {session.user?.email}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                              {userMenuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center space-x-3 px-4 py-2.5 text-sm font-light text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                    onClick={() => setUserMenuOpen(false)}
                                  >
                                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                                    <span>{item.label}</span>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Sign Out */}
                            <div className="border-t border-gray-100 py-2">
                              <button
                                onClick={() => {
                                  signOut();
                                  setUserMenuOpen(false);
                                }}
                                className="flex items-center space-x-3 px-4 py-2.5 text-sm font-light text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                              >
                                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                                <span>Sign Out</span>
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-1.5 sm:p-2 hover:bg-transparent touch-manipulation"
                    asChild
                  >
                    <Link href="/user">
                      <User className="h-5 w-5 sm:h-6 sm:w-6 text-black" strokeWidth={1} />
                    </Link>
                  </Button>
                )}
              </div>

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
                      {cartCount > 99 ? '99+' : cartCount}
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
  );
}
