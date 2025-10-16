"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function AddressPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl sm:text-4xl font-thin tracking-[0.15em] text-black mb-3"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            OUR MADRID LOCATION
          </h1>
          <p className="text-sm font-light text-gray-600 tracking-wide">
            Visit us at Calle de Serrano, 23 – right in the heart of Madrid.
          </p>
        </div>

        {/* Map + Address */}
        <Card className="p-6 sm:p-8 border border-gray-100 shadow-sm">
          <div className="mb-6 flex items-center space-x-3">
            <MapPin className="h-6 w-6 text-gray-600" strokeWidth={1.5} />
            <div>
              <p className="text-base font-medium text-black">
                Calle de Serrano, 23
              </p>
              <p className="text-sm text-gray-600">28001 Madrid, Spain</p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-md border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.912849857218!2d-3.6885942846063714!3d40.42404457936468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422887ed72d34d%3A0xd65cf450823a57e7!2sZARA!5e0!3m2!1sen!2ses!4v1715118258925!5m2!1sen!2ses"
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Directions Button */}
          <div className="mt-8 text-center">
            <Button
              asChild
              className="bg-black hover:bg-gray-900 text-white text-sm font-light tracking-wider uppercase h-10 px-8"
            >
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Calle+de+Serrano+23+Madrid"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

