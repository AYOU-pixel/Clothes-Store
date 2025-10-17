import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Only export the handlers, not authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
