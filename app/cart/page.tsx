"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  product: {
    id: string;
    name: string;
    slug: string;
    mainImage: string;
    currentPrice: number;
    originalPrice: number;
    sizes: string[];
    colors: string[];
    quantity: number;
    inStock: boolean;
  };
}

interface Cart {
  id: string;
  items: CartItem[];
}

export default function CartPage() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart data
  useEffect(() => {
    async function fetchCart() {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/cart");
        if (response.ok) {
          const data = await response.json();
          setCart(data);
        } else {
          setError("Failed to load cart");
        }
      } catch (err) {
        setError("An error occurred while loading the cart");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCart();
  }, [session]);

  // Update cart item quantity
  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity: newQuantity }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate totals
  const subtotal = cart?.items.reduce(
    (sum, item) => sum + item.product.currentPrice * item.quantity,
    0
  ) || 0;
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + shipping;

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.1em] font-light">
            <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200">
              Home
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900 font-normal">Cart</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-neutral-900 mb-8 sm:mb-12">
            Shopping Bag
          </h1>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 font-light">Loading your cart...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 font-light">{error}</p>
              <Link href="/" className="text-neutral-600 underline hover:text-neutral-900">
                Continue Shopping
              </Link>
            </div>
          ) : !session ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 font-light">Please sign in to view your cart.</p>
              <Link href="/user">
                <Button className="mt-4 bg-neutral-900 text-white hover:bg-neutral-800">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-neutral-600 font-light mb-4">Your shopping bag is empty.</p>
              <Link href="/new-arrivals">
                <Button className="bg-neutral-900 text-white hover:bg-neutral-800">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                {cart.items.map((item, index) => {
                  const hasDiscount = item.product.currentPrice < item.product.originalPrice;
                  const discountPercent = hasDiscount
                    ? Math.round(
                        ((item.product.originalPrice - item.product.currentPrice) /
                          item.product.originalPrice) *
                          100
                      )
                    : 0;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="border-b border-neutral-100 py-6 last:border-b-0"
                    >
                      <div className="flex gap-4 sm:gap-6">
                        {/* Product Image */}
                        <div className="w-24 sm:w-32">
                          <AspectRatio ratio={3 / 4}>
                            <Image
                              src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${item.product.mainImage}.jpg`}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-sm"
                            />
                          </AspectRatio>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between">
                            <Link
                              href={`/${item.product.slug}`}
                              className="text-sm sm:text-base font-light text-neutral-900 hover:text-neutral-600"
                            >
                              {item.product.name}
                            </Link>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-500 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>

                          <div className="text-xs sm:text-sm text-neutral-600 font-light space-y-1">
                            {item.selectedColor && (
                              <p>Color: {item.selectedColor.replace("-", " ")}</p>
                            )}
                            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-neutral-200">
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-neutral-50"
                                disabled={item.quantity <= 1 || isLoading}
                              >
                                <Minus size={14} className="text-neutral-600" />
                              </motion.button>
                              <span className="px-4 py-2 text-sm font-medium">{item.quantity}</span>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-neutral-50"
                                disabled={item.quantity >= item.product.quantity || isLoading}
                              >
                                <Plus size={14} className="text-neutral-600" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="text-sm font-normal text-neutral-900">
                                ${(item.product.currentPrice * item.quantity).toFixed(2)}
                              </span>
                              {hasDiscount && (
                                <div className="text-xs text-neutral-400 line-through">
                                  ${(item.product.originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>

                          {item.product.quantity <= 5 && item.product.quantity > 0 && (
                            <p className="text-xs text-amber-600 font-light">
                              Only {item.product.quantity} left in stock
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <Card className="border-neutral-100 sticky top-8">
                  <CardContent className="p-6 space-y-6">
                    <h2 className="text-sm font-normal uppercase tracking-[0.1em] text-neutral-900">
                      Order Summary
                    </h2>

                    <div className="space-y-4 text-sm text-neutral-600 font-light">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-normal text-neutral-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 bg-neutral-900 text-white hover:bg-neutral-800 font-light text-xs tracking-[0.15em] uppercase"
                      disabled={isLoading}
                    >
                      Proceed to Checkout
                    </Button>

                    <p className="text-xs text-neutral-500 font-light text-center">
                      Free shipping on orders over $100
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}