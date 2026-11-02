
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

// Create the PostgreSQL connection adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Create one Prisma Client for our application
export const prisma = new PrismaClient({
  adapter,
});
