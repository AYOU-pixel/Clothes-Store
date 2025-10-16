"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-white/70 text-sm md:text-base font-light tracking-[0.2em] uppercase">
            Last Updated: October 2024
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
            At <span className="font-normal">[Your Brand Name]</span>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or make a purchase.
          </p>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto bg-black/5" />

      {/* Policy Sections */}
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
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Personal Information</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  When you place an order or create an account, we collect information such as your name, email address, shipping address, billing address, phone number, and payment details.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Browsing Information</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  We automatically collect certain information about your device, including your IP address, browser type, operating system, referring URLs, and pages visited on our site.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Cookies & Tracking</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.
                </p>
              </div>
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
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We use the information we collect to:
              </p>
              <ul className="space-y-3 text-neutral-700 leading-[2] text-base font-light ml-6">
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Process and fulfill your orders</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Communicate with you about your purchases and account</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Send promotional materials and updates (with your consent)</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Improve our website, products, and services</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Prevent fraud and enhance security</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Comply with legal obligations</li>
              </ul>
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
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We do not sell your personal information. We may share your data with:
              </p>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Service Providers</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  Third-party companies that help us operate our business, such as payment processors, shipping carriers, and marketing platforms.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Legal Requirements</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  When required by law or to protect our rights, property, or safety, or that of others.
                </p>
              </div>
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
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
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
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                You have the right to:
              </p>
              <ul className="space-y-3 text-neutral-700 leading-[2] text-base font-light ml-6">
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Access and receive a copy of your personal data</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Correct inaccurate or incomplete information</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Request deletion of your personal data</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Opt-out of marketing communications</li>
                <li className="relative pl-4 before:content-['—'] before:absolute before:left-0">Restrict or object to certain data processing</li>
              </ul>
              <p className="text-neutral-700 leading-[2] text-base font-light pt-4">
                To exercise these rights, please contact us at <span className="font-normal">privacy@yourbrand.com</span>
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
                Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected data from a minor, please contact us immediately.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 7 */}
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
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on this page with an updated effective date.
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
              Questions About Privacy?
            </h2>
            <p className="text-neutral-700 leading-[2] text-base font-light mb-8 max-w-2xl mx-auto">
              If you have any questions or concerns about this Privacy Policy or our data practices, please don't hesitate to reach out.
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