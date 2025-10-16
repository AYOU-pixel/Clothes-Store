"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsOfUsePage() {
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
            Terms of Use
          </h1>
          <p className="text-white/70 text-sm md:text-base font-light tracking-[0.2em] uppercase">
            Effective Date: October 2024
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
            Welcome to <span className="font-normal">[Your Brand Name]</span>. By accessing or using our website, you agree to be bound by these Terms of Use. Please read them carefully before placing an order or browsing our collections. If you do not agree with any part of these terms, you should not use our website.
          </p>
        </motion.div>
      </section>

      <Separator className="max-w-4xl mx-auto bg-black/5" />

      {/* Terms Sections */}
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
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. These terms apply to all visitors, users, and customers of our website. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of such changes.
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
                Use of Website
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Eligibility</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  You must be at least 18 years old to make purchases on our website. By using this site, you represent that you meet this age requirement and that all information you provide is accurate and truthful.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Account Responsibility</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You must notify us immediately of any unauthorized use.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Prohibited Activities</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  You may not use our website for any unlawful purpose, to transmit harmful code, to violate intellectual property rights, or to interfere with the proper functioning of the website.
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
                Orders & Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Order Processing</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Pricing</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  All prices are listed in the local currency and are subject to change without notice. We strive to ensure accuracy but are not responsible for typographical errors. If an error occurs, we will contact you to inform you of the correction.
                </p>
              </div>
              <div>
                <h4 className="text-base font-normal mb-3 uppercase tracking-wider">Payment Methods</h4>
                <p className="text-neutral-700 leading-[2] text-base font-light">
                  We accept various payment methods as displayed at checkout. Payment must be received in full before orders are processed. All transactions are securely processed through encrypted payment gateways.
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
                Shipping & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We ship to addresses worldwide. Shipping times and costs vary by location and are calculated at checkout. We are not responsible for delays caused by customs, weather, or carrier issues. Risk of loss passes to you upon delivery to the carrier.
              </p>
              <p className="text-neutral-700 leading-[2] text-base font-light">
                Please ensure your shipping address is accurate. We cannot be held liable for orders shipped to incorrect addresses provided by the customer.
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
                Returns & Exchanges
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We accept returns and exchanges within 30 days of delivery for unworn, unwashed items with original tags attached. Items must be in their original condition. Sale items and final sale products are not eligible for return.
              </p>
              <p className="text-neutral-700 leading-[2] text-base font-light">
                Return shipping costs are the responsibility of the customer unless the item is defective or we made an error. Refunds will be processed to the original payment method within 7-10 business days of receiving the returned item.
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
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                All content on this website, including text, images, logos, graphics, and designs, is the property of <span className="font-normal">[Your Brand Name]</span> or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-neutral-700 leading-[2] text-base font-light">
                You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission. Unauthorized use may violate copyright, trademark, and other laws.
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
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                To the fullest extent permitted by law, <span className="font-normal">[Your Brand Name]</span> shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or products purchased.
              </p>
              <p className="text-neutral-700 leading-[2] text-base font-light">
                Our total liability for any claim arising from your use of the website or purchase of products shall not exceed the amount you paid for the product or service in question.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 8 */}
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
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                These Terms of Use are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these terms or your use of the website shall be resolved exclusively in the courts of [Your Jurisdiction].
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 9 */}
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
                Modifications
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="bg-black/5" />

        {/* Section 10 */}
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
                Severability
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-neutral-700 leading-[2] text-base font-light">
                If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
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
              Questions About Our Terms?
            </h2>
            <p className="text-neutral-700 leading-[2] text-base font-light mb-8 max-w-2xl mx-auto">
              If you have any questions regarding these Terms of Use, please contact our customer service team.
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