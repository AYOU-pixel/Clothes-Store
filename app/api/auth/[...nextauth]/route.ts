import NextAuth, { AuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

// Define authOptions with explicit AuthOptions type
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const, // Explicitly set to "jwt" to match SessionStrategy
  },
  pages: {
    signIn: "/user", // user login page
  },
}

// Initialize NextAuth with authOptions
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
