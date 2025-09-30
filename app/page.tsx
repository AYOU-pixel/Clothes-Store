// app/page.tsx
import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import ShopByCategory from "@/components/ShopByCategory"
import Newsletter from "@/components/Newsletter"

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <ShopByCategory />
      <Newsletter />
    </main>
  )
}


