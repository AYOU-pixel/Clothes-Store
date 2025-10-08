"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { loadStripe } from "@stripe/stripe-js";

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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Handle success/cancel query parameters
  useEffect(() => {
    if (searchParams.get("success")) {
      setNotification("Payment successful! Your order is being processed.");
      setCart(null); // Clear cart on success
    } else if (searchParams.get("canceled")) {
      setNotification("Checkout was canceled. Your items are still in the cart.");
    }
  }, [searchParams]);

  // Fetch cart data
  useEffect(() => {
    async function fetchCart() {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          setError(errorData.error || "Failed to load cart");
          return;
        }
        const data = await response.json();
        setCart(data);
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Failed to update quantity");
        return;
      }
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      setError("Error updating quantity");
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Failed to remove item");
        return;
      }
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      setError("Error removing item");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Failed to initiate checkout");
        setIsLoading(false);
        return;
      }

      const { url } = await response.json();
      const stripe = await stripePromise;
      if (stripe && url) {
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        setError("Failed to load Stripe checkout");
      }
    } catch (error: any) {
      setError(`Checkout failed: ${error.message || "Unknown error"}`);
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
      style={{ fontFamily: "'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Breadcrumb */}
      <div className="border-b border-zinc-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.15em] font-light">
            <Link href="/" className="text-zinc-900 hover:text-zinc-600 transition-colors duration-200">
              Home
            </Link>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-900">Shopping Bag</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.08em] text-zinc-900 mb-8 sm:mb-10 uppercase">
            Shopping Bag
          </h1>

          {notification && (
            <div className="text-center py-3 mb-6 bg-zinc-50 border border-zinc-200">
              <p className={`text-[11px] uppercase tracking-[0.12em] font-light ${
                searchParams.get("success") ? "text-green-700" : "text-amber-700"
              }`}>
                {notification}
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-zinc-600 text-[11px] uppercase tracking-[0.12em] font-light">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-700 text-[11px] mb-4 uppercase tracking-[0.12em] font-light">{error}</p>
              <Link href="/" className="text-zinc-900 underline hover:text-zinc-600 text-[11px] uppercase tracking-[0.12em] font-light">
                Continue Shopping
              </Link>
            </div>
          ) : !session ? (
            <div className="text-center py-16">
              <p className="text-zinc-600 text-[11px] mb-5 uppercase tracking-[0.12em] font-light">Please sign in to view your cart.</p>
              <Link href="/user">
                <Button className="bg-zinc-900 text-white hover:bg-zinc-800 h-11 px-8 uppercase text-[10px] tracking-[0.15em] font-light transition-colors duration-200">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={56} className="mx-auto text-zinc-300 mb-5" strokeWidth={0.8} />
              <p className="text-zinc-600 text-[11px] mb-6 uppercase tracking-[0.12em] font-light">Your shopping bag is empty.</p>
              <Link href="/new-arrivals">
                <Button className="bg-zinc-900 text-white hover:bg-zinc-800 h-11 px-8 uppercase text-[10px] tracking-[0.15em] font-light transition-colors duration-200">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
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
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="border-b border-zinc-200 py-6 last:border-b-0"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 sm:w-32 flex-shrink-0">
                          <AspectRatio ratio={3 / 4}>
                            <Image
                              src={`https://res.cloudinary.com/dpj5r6jrg/image/upload/${item.product.mainImage}.jpg`}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </AspectRatio>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/${item.product.slug}`}
                              className="text-[13px] font-light text-zinc-900 hover:text-zinc-600 transition-colors uppercase tracking-[0.08em]"
                            >
                              {item.product.name}
                            </Link>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="text-zinc-500 hover:text-zinc-900 transition-colors ml-3"
                            >
                              <Trash2 size={16} strokeWidth={1} />
                            </motion.button>
                          </div>

                          <div className="text-[10px] text-zinc-500 font-light space-y-0.5 uppercase tracking-[0.12em]">
                            {item.selectedColor && (
                              <p>Colour: {item.selectedColor.replace("-", " ")}</p>
                            )}
                            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-zinc-900">
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-zinc-50 transition-colors duration-150"
                                disabled={item.quantity <= 1 || isLoading}
                              >
                                <Minus size={12} className="text-zinc-900" strokeWidth={1} />
                              </motion.button>
                              <span className="px-4 py-1.5 text-[11px] font-light min-w-[35px] text-center">{item.quantity}</span>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-zinc-50 transition-colors duration-150"
                                disabled={item.quantity >= item.product.quantity || isLoading}
                              >
                                <Plus size={12} className="text-zinc-900" strokeWidth={1} />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="text-[13px] font-light text-zinc-900">
                                ${(item.product.currentPrice * item.quantity).toFixed(2)}
                              </span>
                              {hasDiscount && (
                                <div className="text-[10px] text-zinc-400 line-through mt-0.5">
                                  ${(item.product.originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>

                          {item.product.quantity <= 5 && item.product.quantity > 0 && (
                            <p className="text-[10px] text-red-700 font-light uppercase tracking-[0.12em]">
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
              <div className="lg:col-span-1">
                <div className="border border-zinc-200 sticky top-6">
                  <div className="p-6 space-y-6">
                    <h2 className="text-[13px] font-light uppercase tracking-[0.15em] text-zinc-900">
                      Order Summary
                    </h2>

                    <div className="space-y-4 text-[12px] text-zinc-600 font-light">
                      <div className="flex justify-between uppercase tracking-[0.08em]">
                        <span>Subtotal</span>
                        <span className="text-zinc-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between uppercase tracking-[0.08em]">
                        <span>Shipping</span>
                        <span className="text-zinc-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="border-t border-zinc-200 pt-4" />
                      <div className="flex justify-between font-light text-zinc-900 text-[13px] uppercase tracking-[0.1em]">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 bg-zinc-900 text-white hover:bg-zinc-800 font-light text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
                      onClick={handleCheckout}
                      disabled={isLoading}
                    >
                      Checkout
                    </Button>

                    <p className="text-[10px] text-zinc-500 font-light text-center uppercase tracking-[0.12em]">
                      Free shipping on orders over $100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}