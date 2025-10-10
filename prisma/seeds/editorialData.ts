// Add this to your prisma/seeds/index.ts file:
// export { editorialData } from './editorialData';

export const editorialData = [
  {
    title: "Effortless Layers",
    slug: "effortless-layers",
    excerpt:
      "Light textures meet oversized silhouettes — discover the new essence of comfort and movement this season.",
    content: `This season, we embrace the art of layering with a fresh perspective. Soft, flowing fabrics meet structured pieces in an exploration of contrasts that define modern elegance. From oversized blazers to delicate silk shirts, each piece is designed to be mixed, matched, and layered with ease. The collection celebrates individuality and the freedom to create your own style narrative. Discover pieces that transition seamlessly from day to night, work to weekend, creating a wardrobe that moves with you.`,
    video: "6308907_Woman_Social_Media_2160x3840_qjsngn", // ✅ updated key
    tags: ["Minimal", "Urban", "Relaxed", "Fall"],
    isPublished: true,
    publishedAt: new Date("2025-10-01")
  },
  {
    title: "Urban Minimalism",
    slug: "urban-minimalism",
    excerpt:
      "Clean lines and neutral palettes define the new urban aesthetic. A study in simplicity and sophistication.",
    content: `In the heart of the city, where architecture meets fashion, we find inspiration in simplicity. Urban Minimalism is not just a style—it's a philosophy of intentional living. Each garment is carefully considered, each detail purposeful. From the cut of a coat to the drape of trousers, everything serves a function while maintaining aesthetic beauty. This is fashion stripped to its essence, where less truly becomes more.`,
    video: "5822802-hd_1080_1920_25fps_qc1vyv", // ✅ updated key
    tags: ["Minimalist", "City", "Monochrome"],
    isPublished: true,
    publishedAt: new Date("2025-09-15")
  },
  {
    title: "Sculpted Neutrals",
    slug: "sculpted-neutrals",
    excerpt:
      "Tailored silhouettes meet earthy tones — a refined take on transitional dressing.",
    content: `This collection explores the harmony between structure and softness. Think sculpted coats in sand and taupe, paired with fluid knits and suede accents. Designed for versatility, each piece adapts to shifting seasons and shifting moods. It's a palette cleanser for the wardrobe — understated, elegant, and quietly powerful.`,
    mainVideo: "6009590_4k_Video_Attractive_3840x2160_mirhu6",
    tags: ["Neutral", "Tailored", "Transitional", "Elegant"],
    isPublished: true,
    publishedAt: new Date("2025-10-10")
  },
  {
    title: "The Essence of Elegance",
    slug: "the-essence-of-elegance",
    excerpt: "Discover how modern design embraces space and light. A journey into refined aesthetics and mindful creation.",
    content: `True elegance lies in the balance between form and emptiness. Contemporary Minimalism explores this relationship, creating environments and objects that are both functional and poetic. It's a deliberate reduction to the essential, where every element is imbued with meaning. The texture of a fabric, the curve of a chair, the shadow in a room—all speak a quiet language of quality and purpose. This approach transforms daily life into a more focused and serene experience.`,
    video: "6308922_Clothes_Clothing_2160x3840_dcvwrl",
    tags: ["Design", "Aesthetics", "Simplicity"],
    isPublished: true,
    publishedAt: new Date("2025-09-15")
}
];

