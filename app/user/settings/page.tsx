// app/user/settings/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Sync form with session when session changes
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "", // You'll need to fetch this from an API or store in session
        password: "",
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (saveStatus === "success") {
      setSaveStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus("idle");

    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update the session with new user data
        await update({
          ...session,
          user: {
            ...session?.user,
            ...data.user,
          },
        });

        setSaveStatus("success");
        toast.success("Profile updated successfully!");
        
        // Clear password field
        setFormData(prev => ({ ...prev, password: "" }));
        
        // Optional: Redirect back to user page after success
        setTimeout(() => {
          router.push("/user");
        }, 1500);
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      setSaveStatus("error");
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to update your profile.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-[#f7f7f7] px-4 py-8"
    >
      <div className="w-full max-w-xl bg-white p-6 sm:p-10 rounded-none shadow-sm border border-neutral-200">
        <h2 className="text-3xl font-light tracking-tight text-neutral-900 uppercase mb-6 text-center">
          Account Settings
        </h2>

        <Separator className="mb-8 bg-neutral-200" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Display Only (No Change Option) */}
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 border border-neutral-300">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback className="text-neutral-600 text-lg">
                {session.user?.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <p className="mt-3 text-sm text-neutral-500 text-center">
              Profile picture managed by your authentication provider
            </p>
          </div>

          {/* Form Inputs */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs tracking-wide text-neutral-500 mb-2 uppercase">
                Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-none border-neutral-300 focus:ring-0 focus:border-neutral-800"
              />
            </div>

            <div>
              <label className="block text-xs tracking-wide text-neutral-500 mb-2 uppercase">
                Email *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-none border-neutral-300 focus:ring-0 focus:border-neutral-800"
              />
            </div>

            <div>
              <label className="block text-xs tracking-wide text-neutral-500 mb-2 uppercase">
                Phone
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-none border-neutral-300 focus:ring-0 focus:border-neutral-800"
              />
            </div>

            <div>
              <label className="block text-xs tracking-wide text-neutral-500 mb-2 uppercase">
                New Password
              </label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="rounded-none border-neutral-300 focus:ring-0 focus:border-neutral-800"
              />
            </div>
          </div>

          {/* Save Status */}
          {saveStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-3 bg-green-50 border border-green-200 rounded-md"
            >
              <p className="text-green-600 text-sm font-medium">Saved successfully!</p>
            </motion.div>
          )}

          {saveStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-3 bg-red-50 border border-red-200 rounded-md"
            >
              <p className="text-red-600 text-sm font-medium">Failed to save. Please try again.</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-none bg-black text-white hover:bg-neutral-800 transition-all duration-200 tracking-wide uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}