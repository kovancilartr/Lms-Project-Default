import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        { name: "Education" },
        { name: "Arts" },
        { name: "Business" },
        { name: "Science" },
        { name: "Health" },
        { name: "Music" },
      ],
    });
    console.log("Seeded the database categories successfully!");
  } catch (error) {
    console.log("Error seeding the database categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("main() çalıştırılırken hata oluştu:", e);
});
