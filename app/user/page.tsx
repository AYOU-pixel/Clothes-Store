// app/user/page.tsx
"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Calendar, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Bell,
  Shield,
  LogOut,
  Settings
} from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/UserAvatar"

export default function UserPage() {
  const { data: session, status } = useSession()

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-light text-gray-500 tracking-wider uppercase">Loading...</p>
        </motion.div>
      </div>
    )
  }

  // Not signed in
  if (!session) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 
              className="text-3xl sm:text-4xl font-thin tracking-[0.15em] text-black mb-3"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              WELCOME
            </h1>
            <p className="text-sm font-light text-gray-600 tracking-wide">
              Sign in to access your account
            </p>
          </div>

          <Card className="p-8 shadow-lg border border-gray-100">
            <div className="space-y-4">
              <Button 
                onClick={() => signIn("google")}
                className="w-full bg-white hover:bg-gray-50 text-black border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 h-12 text-sm font-light tracking-wider uppercase"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>

              <Button 
                onClick={() => signIn("github")}
                className="w-full bg-black hover:bg-gray-900 text-white transition-all duration-300 h-12 text-sm font-light tracking-wider uppercase"
              >
                <svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Sign in with GitHub
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center font-light">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 font-light tracking-wide uppercase mb-4">
              Benefits of creating an account
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Package, label: "Track Orders" },
                { icon: Heart, label: "Save Favorites" },
                { icon: Bell, label: "Get Updates" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-gray-400" strokeWidth={1} />
                  <p className="text-xs text-gray-600 font-light">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Signed in - Show profile
  const quickLinks = [
    { icon: Package, label: "My Orders", href: "/user/orders", desc: "Track and manage your orders" },
    { icon: Heart, label: "Wishlist", href: "/user/wishlist", desc: "View saved items" },
    { icon: MapPin, label: "Addresses", href: "/user/addresses", desc: "Manage shipping addresses" },
    { icon: CreditCard, label: "Payment Methods", href: "/user/payment", desc: "Saved payment options" },
    { icon: Bell, label: "Notifications", href: "/user/notifications", desc: "Manage your preferences" },
    { icon: Shield, label: "Privacy & Security", href: "/user/security", desc: "Account protection" }
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Profile Header */}
        <Card className="p-6 sm:p-8 lg:p-10 mb-8 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative"
            >
              <UserAvatar 
                src={session.user?.image}
                name={session.user?.name}
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-4 border-gray-100 shadow-lg"
                fallbackClassName="bg-gradient-to-br from-gray-700 to-gray-900 text-white text-4xl font-medium"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <User className="h-5 w-5 text-white" strokeWidth={2} />
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-thin tracking-[0.1em] text-black mb-2"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {session.user?.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 mb-4"
              >
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  <span className="font-light">{session.user?.email}</span>
                </div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" strokeWidth={1.5} />
                  <span className="font-light">Member since {new Date().getFullYear()}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-wrap justify-center sm:justify-start gap-3"
              >
                <Button
                  asChild
                  className="bg-black hover:bg-gray-900 text-white text-xs font-light tracking-wider uppercase h-9 px-6"
                >
                  <Link href="/user/settings">
                    <Settings className="h-4 w-4 mr-2" strokeWidth={1.5} />
                    Edit Profile
                  </Link>
                </Button>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 text-xs font-light tracking-wider uppercase h-9 px-6"
                >
                  <LogOut className="h-4 w-4 mr-2" strokeWidth={1.5} />
                  Sign Out
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Orders", value: "12", icon: Package },
            { label: "Wishlist", value: "8", icon: Heart },
            { label: "Reviews", value: "5", icon: User },
            { label: "Points", value: "250", icon: Shield }
          ].map((stat, index) => (
            <Card 
              key={index}
              className="p-4 sm:p-6 text-center border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-gray-400" strokeWidth={1} />
              <p className="text-2xl sm:text-3xl font-thin text-black mb-1">{stat.value}</p>
              <p className="text-xs font-light text-gray-500 tracking-wide uppercase">{stat.label}</p>
            </Card>
          ))}
        </motion.div>

        {/* Account Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <h2 
            className="text-xl sm:text-2xl font-thin tracking-[0.1em] text-black mb-6"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            ACCOUNT MANAGEMENT
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
              >
                <Link href={link.href}>
                  <Card className="p-6 border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 h-full group">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-black transition-colors duration-300 flex items-center justify-center">
                          <link.icon className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-black mb-1 group-hover:text-gray-900">
                          {link.label}
                        </h3>
                        <p className="text-sm font-light text-gray-500 group-hover:text-gray-600">
                          {link.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-8"
        >
          <h2 
            className="text-xl sm:text-2xl font-thin tracking-[0.1em] text-black mb-6"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            RECENT ACTIVITY
          </h2>

          <Card className="p-6 border border-gray-100">
            <div className="space-y-4">
              {[
                { action: "Order placed", item: "Black Leather Jacket", date: "2 days ago" },
                { action: "Added to wishlist", item: "White Summer Dress", date: "5 days ago" },
                { action: "Review submitted", item: "Premium Cotton T-Shirt", date: "1 week ago" }
              ].map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black mb-0.5">{activity.action}</p>
                    <p className="text-sm font-light text-gray-600">{activity.item}</p>
                  </div>
                  <p className="text-xs font-light text-gray-400 tracking-wide uppercase">
                    {activity.date}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <Link 
                href="/user/activity"
                className="text-sm font-light text-black hover:text-gray-600 tracking-wide uppercase inline-flex items-center group"
              >
                View All Activity
                <svg 
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
