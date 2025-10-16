"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#111] font-sans selection:bg-black selection:text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] bg-[url('/images/aura.png')] bg-cover bg-center flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />

        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-40 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-light mb-10 uppercase tracking-tight"
        >
          Redefining Modern Minimalism
        </motion.h2>
        <p className="text-neutral-700 leading-relaxed text-base md:text-lg max-w-2xl mx-auto font-light">
          At <span className="font-medium">AURA</span>, we believe that true luxury
          lies in simplicity. Every collection is born from a devotion to
          craftsmanship, quiet elegance, and timeless design — made for those who
          seek effortless sophistication in every detail.
        </p>
      </section>

      <Separator className="bg-black/10 w-11/12 mx-auto" />

      {/* Philosophy Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-40 grid md:grid-cols-3 gap-16">
        {[
          {
            title: "Our Vision",
            desc: "To inspire confidence through refined, sustainable design — each piece reflecting the essence of timeless individuality.",
          },
          {
            title: "Our Mission",
            desc: "To create versatile silhouettes that transcend seasons. Our pieces are thoughtfully crafted with ethical practices and lasting quality.",
          },
          {
            title: "Our Values",
            desc: "Integrity, craftsmanship, and authenticity. These are the foundations of AURA — a brand built on responsibility and style.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg uppercase font-medium tracking-[0.15em] mb-4 text-[#111]">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <CardDescription className="text-neutral-600 text-sm leading-relaxed font-light">
                  {item.desc}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <Separator className="bg-black/10 w-11/12 mx-auto" />

      {/* Image + Text Section */}
      <section className="grid md:grid-cols-2 items-center max-w-6xl mx-auto px-6 md:px-8 py-40 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[1.5rem] shadow-lg"
        >
          <img
            src="/images/collection.jpg"
            alt="AURA Collection"
            className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-3xl md:text-4xl font-serif font-light mb-6 uppercase tracking-tight leading-tight">
                Effortless Design. Timeless Appeal.
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <CardDescription className="text-neutral-700 leading-relaxed text-base font-light">
                Every garment is a study in form and proportion — crafted to
                transition seamlessly from day to night. We focus on creating
                pieces that celebrate the balance of structure and fluidity.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <Separator className="bg-black/10 w-11/12 mx-auto" />

      {/* Quote Section */}
      <section className="py-40 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light italic text-neutral-800 tracking-wide"
        >
          "Simplicity is the ultimate sophistication."
        </motion.p>
      </section>
    </main>
  );
}

