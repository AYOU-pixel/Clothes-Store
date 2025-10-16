"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center px-4"
        >
          <h1 className="text-white text-6xl md:text-8xl font-light tracking-[0.05em] uppercase mb-4">
            Accessibility
          </h1>
          <p className="text-white/70 text-sm md:text-base font-light tracking-[0.2em] uppercase">
            Committed to Inclusive Design
          </p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-700 leading-[2] text-lg font-light">
            At <span className="font-normal">[Your Brand Name]</span>, we are committed to ensuring our website is accessible to everyone, including people with disabilities. We strive to provide an inclusive online shopping experience that meets the highest standards of web accessibility.
          </p>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto bg-black/5" />

      {/* Accessibility Sections */}
      <section className="max-w-4xl mx-auto px-8 py-24 space-y-16">
        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-8">
              <div className="w-16 h-[1px] bg-black mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-light uppercase tracking-[0.1em]">
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We believe that everyone should have equal access to our products and services. Our website is designed and maintained to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. We continuously work to enhance the accessibility and usability of our website for all visitors.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-8">
              <div className="w-16 h-[1px] bg-black mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-light uppercase tracking-[0.1em]">
                Accessibility Features
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Keyboard Navigation</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  Our website can be fully navigated using only a keyboard. All interactive elements are accessible via keyboard shortcuts and tab navigation.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Screen Reader Compatibility</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  We ensure compatibility with popular screen readers such as JAWS, NVDA, and VoiceOver. All images include descriptive alternative text, and content is structured with proper semantic HTML.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Text and Contrast</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  Our website maintains appropriate color contrast ratios between text and background elements to ensure readability. Text can be resized using browser settings without loss of functionality.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Visual Design</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  We use clear fonts, consistent navigation, and logical page layouts to make our content easy to understand and navigate. Important information is conveyed through multiple means, not just color alone.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-8">
              <div className="w-16 h-[1px] bg-black mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-light uppercase tracking-[0.1em]">
                Assistive Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light mb-6">
                Our website is designed to work with various assistive technologies, including but not limited to:
              </p>
              <p className="text-neutral-700 leading-[2] text-base font-light">
                Screen readers, screen magnification software, speech recognition software, alternative input devices, and browser accessibility features. We test our website regularly with these technologies to ensure optimal compatibility.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 4 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-8">
              <div className="w-16 h-[1px] bg-black mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-light uppercase tracking-[0.1em]">
                Third-Party Content
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                While we strive to ensure that all content on our website is accessible, some third-party content or services may not be fully under our control. We work with our partners and vendors to ensure they meet our accessibility standards, and we are committed to addressing any issues that arise.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 5 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-8">
              <div className="w-16 h-[1px] bg-black mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-light uppercase tracking-[0.1em]">
                Ongoing Improvements
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                Accessibility is an ongoing effort. We regularly review and update our website to improve accessibility features and ensure compliance with current standards. Our team participates in accessibility training and stays informed about best practices and emerging technologies.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 6 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-8">
              <div className="w-16 h-[1px] bg-black mb-6" />
              <CardTitle className="text-2xl md:text-3xl font-light uppercase tracking-[0.1em]">
                Feedback & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light mb-6">
                We welcome your feedback on the accessibility of our website. If you encounter any barriers or have suggestions for improvement, please let us know. Your input helps us continue to enhance our website for all users.
              </p>
              <p className="text-neutral-700 leading-[2] text-base font-light">
                If you need assistance accessing any content or using any features on our website, please contact our customer service team. We are here to help and will work to provide the information you need in an accessible format.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-tight uppercase">
              Get in Touch
            </h2>
            <p className="text-neutral-700 leading-[2] text-base font-light mb-8 max-w-2xl mx-auto">
              Have questions or feedback about accessibility? We're here to help.
            </p>
            <div className="space-y-2 text-neutral-700 font-light">
              <p className="uppercase tracking-[0.15em] text-sm">Email</p>
              <p className="text-base font-normal">aura@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}