import { prisma } from "./lib/prisma.js";

async function main() {
  try {
    await prisma.$connect();

    console.log("SUCCESS! LinkNest connected to PostgreSQL!");

    const users = await prisma.user.findMany();
    console.log("Users in database:", users);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();