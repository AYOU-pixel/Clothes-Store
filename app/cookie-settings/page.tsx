"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CookieSettingsPage() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  const handleToggle = (category: keyof typeof preferences) => {
    if (category === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    console.log("Preferences saved:", preferences);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="relative w-full h-[40vh] bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-wide uppercase">
            Cookie Settings
          </h1>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-neutral-600 text-base leading-relaxed mb-16"
        >
          We use cookies to improve your experience. Choose which cookies you want to allow.
        </motion.p>

        {/* Cookie Options */}
        <div className="space-y-8">
          {/* Necessary */}
          <div className="flex items-start justify-between py-6 border-b border-neutral-200">
            <div className="flex-1">
              <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                Necessary Cookies
              </h3>
              <p className="text-sm text-neutral-600">
                Required for the website to function. Always active.
              </p>
            </div>
            <div className="ml-8 pt-1">
              <div className="w-12 h-6 bg-black rounded-full relative opacity-50">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>

          {/* Functional */}
          <div className="flex items-start justify-between py-6 border-b border-neutral-200">
            <div className="flex-1">
              <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                Functional Cookies
              </h3>
              <p className="text-sm text-neutral-600">
                Remember your preferences and settings.
              </p>
            </div>
            <div className="ml-8 pt-1">
              <button
                onClick={() => handleToggle("functional")}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  preferences.functional ? "bg-black" : "bg-neutral-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.functional ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between py-6 border-b border-neutral-200">
            <div className="flex-1">
              <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                Analytics Cookies
              </h3>
              <p className="text-sm text-neutral-600">
                Help us improve our website performance.
              </p>
            </div>
            <div className="ml-8 pt-1">
              <button
                onClick={() => handleToggle("analytics")}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  preferences.analytics ? "bg-black" : "bg-neutral-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.analytics ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between py-6 border-b border-neutral-200">
            <div className="flex-1">
              <h3 className="text-lg font-normal uppercase tracking-wide mb-2">
                Marketing Cookies
              </h3>
              <p className="text-sm text-neutral-600">
                Show you relevant ads and content.
              </p>
            </div>
            <div className="ml-8 pt-1">
              <button
                onClick={() => handleToggle("marketing")}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  preferences.marketing ? "bg-black" : "bg-neutral-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.marketing ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleSave}
            className="px-16 py-4 bg-black text-white uppercase tracking-widest text-sm font-light hover:bg-neutral-800 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </section>
    </main>
  );
}