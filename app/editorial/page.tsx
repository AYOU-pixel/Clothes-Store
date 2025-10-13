// app/editorial/page.tsx
import { prisma } from '@/lib/prisma'
import EditorialClient from "@/components/EditorialClient"

export const metadata = {
  title: 'Editorial | Your Store Name',
  description: 'Discover inspiring stories, style guides, and curated collections from our latest editorial content.',
}

export default async function EditorialPage() {
  try {
    // Fetch all published editorials
    const editorials = await prisma.editorial.findMany({
      where: { 
        isPublished: true
      },
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return <EditorialClient editorials={editorials} />
    
  } catch (error) {
    console.error('Error fetching editorials:', error)
    
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-light mb-4">Error Loading Editorial Content</h1>
        <p className="text-gray-600">
          We&apos;re having trouble loading the content. Please try again later.
        </p>
      </div>
    )
  }
}