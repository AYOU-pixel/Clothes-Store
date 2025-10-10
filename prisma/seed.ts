//seed.ts
import { PrismaClient } from "../lib/generated/prisma";
import {
  categoriesData,
  womenProductsData,
  menProductsData,
  accessoryProductsData,
  kidsProductsData,
  editorialData
} from "./seeds";

const prisma = new PrismaClient();

// Helper function to generate unique slugs
function generateSlug(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function createInChunks(data: any[], createFunction: (item: any) => Promise<any>, chunkSize: number = 10) {
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    await Promise.all(chunk.map(item => createFunction(item)));
    console.log(`✅ Created chunk ${Math.floor(i/chunkSize) + 1} of ${Math.ceil(data.length/chunkSize)}`);
  }
}

async function main() {
  try {
    console.log("🚀 Starting professional database seeding...");
    
    // Step 1: Clear existing data
    console.log("🧹 Clearing existing data...");
    await prisma.product.deleteMany({ where: {} });
    await prisma.category.deleteMany({ where: {} });
    await prisma.editorial.deleteMany({ where: {} });
    console.log("✅ Database cleared");

    // Step 2: Create categories
    console.log("📁 Creating categories...");
    const categories = await Promise.all(
      categoriesData.map(category => 
        prisma.category.create({ data: category })
      )
    );
    console.log(`✅ Created ${categories.length} categories`);

    // Helper function to find category by slug
    const findCategory = (slug: string) => categories.find(c => c.slug === slug);

    // Step 3: Create Women's Products
    console.log("👗 Creating women's products...");
    const womenCategory = findCategory("women");
    if (!womenCategory) throw new Error("Women category not found");

    const womenProductsWithCategory = womenProductsData.map(product => ({
      ...product,
      categoryId: womenCategory.id,
      slug: generateSlug(product.name)
    }));

    await createInChunks(
      womenProductsWithCategory,
      (product) => prisma.product.create({ data: product }),
      5
    );
    console.log(`✅ Created ${womenProductsData.length} women's products`);

    // Step 4: Create Men's Products
    console.log("👔 Creating men's products...");
    const menCategory = findCategory("men");
    if (!menCategory) throw new Error("Men category not found");

    const menProductsWithCategory = menProductsData.map(product => ({
      ...product,
      categoryId: menCategory.id,
      slug: generateSlug(product.name)
    }));

    await createInChunks(
      menProductsWithCategory,
      (product) => prisma.product.create({ data: product }),
      5
    );
    console.log(`✅ Created ${menProductsData.length} men's products`);

    // Step 5: Create Accessories
    console.log("👜 Creating accessories...");
    const accessoriesCategory = findCategory("accessories");
    if (!accessoriesCategory) throw new Error("Accessories category not found");

    const accessoriesWithCategory = accessoryProductsData.map(product => ({
      ...product,
      categoryId: accessoriesCategory.id,
      slug: generateSlug(product.name)
    }));

    await createInChunks(
      accessoriesWithCategory,
      (product) => prisma.product.create({ data: product }),
      3
    );
    console.log(`✅ Created ${accessoryProductsData.length} accessories`);

    // Step 6: Create Kids' Products
    console.log("🧸 Creating kids' products...");
    const kidsCategory = findCategory("kids");
    if (!kidsCategory) throw new Error("Kids category not found");

    const kidsProductsWithCategory = kidsProductsData.map(product => ({
      ...product,
      categoryId: kidsCategory.id,
      slug: generateSlug(product.name)
    }));

    await createInChunks(
      kidsProductsWithCategory,
      (product) => prisma.product.create({ data: product }),
      5
    );
    console.log(`✅ Created ${kidsProductsData.length} kids' products`);

    // Step 7: Create Editorial Content
    console.log("📰 Creating editorial content...");
    await createInChunks(
      editorialData,
      (editorial) => prisma.editorial.create({ data: editorial }),
      3
    );
    console.log(`✅ Created ${editorialData.length} editorial pieces`);

    // Step 8: Final verification
    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();
    const totalEditorials = await prisma.editorial.count();

    console.log("\n📊 Database Summary:");
    console.log(`Categories: ${totalCategories}`);
    console.log(`Products: ${totalProducts}`);
    console.log(`- Women: ${womenProductsData.length}`);
    console.log(`- Men: ${menProductsData.length}`);
    console.log(`- Accessories: ${accessoryProductsData.length}`);
    console.log(`- Kids: ${kidsProductsData.length}`);
    console.log(`Editorials: ${totalEditorials}`); 

  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .then(() => {
    console.log("\n🎉 Database seeded successfully!");
    console.log("✅ No duplicates, clean structure, optimized for performance!");
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });