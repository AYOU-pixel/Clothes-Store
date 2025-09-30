"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${searchQuery}`)
        const data = await res.json()
        setResults(data)
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }, 400) // ⏳ انتظار نصف ثانية قبل البحث (debounce)

    return () => clearTimeout(delayDebounce)
  }, [searchQuery])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-100 bg-white relative"
        >
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 relative">
            <form className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-0 py-2 sm:py-3 text-sm sm:text-base font-light tracking-wide bg-transparent border-0 border-b border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300 placeholder:text-gray-400 rounded-none"
                  autoFocus
                />

                {/* قائمة الاقتراحات */}
                <AnimatePresence>
                  {searchQuery && results.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-auto z-50"
                    >
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/${product.slug}`}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
                            onClick={onClose}
                          >
                            <Image
                              src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${product.mainImage}.jpg`}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <p className="text-sm font-light text-gray-800">{product.name}</p>
                              <p className="text-xs text-gray-500">${product.currentPrice}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}

                  {/* لا توجد نتائج */}
                  {searchQuery && !loading && results.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow p-3 text-sm text-gray-500"
                    >
                      No results found
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="p-1.5 sm:p-2 hover:bg-transparent touch-manipulation flex-shrink-0"
                onClick={onClose}
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-black" strokeWidth={1} />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
