import { PrismaClient } from './generated/prisma'

declare global {
  // على Next.js App Router نستخدم هذا لتجنب multiple instances
  var prisma: PrismaClient | undefined
}

// استخدم globalThis مباشرة مع الحماية ضد multiple instances
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // اختياري لتصحيح الأخطاء
  })

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
