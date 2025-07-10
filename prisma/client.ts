// utils/prisma.ts (or lib/prisma.ts)

import { PrismaClient } from '@prisma/client'; // <-- Standard import path

// 1. Declare a global variable to hold the PrismaClient instance
//    This is crucial for persisting the instance across hot reloads in development.
//    Using `globalThis` is a more modern and universal way to access the global object.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined; // Make it optional since it might not exist initially
};

// 2. Initialize PrismaClient:
//    - If an instance already exists on the global object (from a previous hot reload), use it.
//    - Otherwise, create a new instance.
const prisma = globalForPrisma.prisma || new PrismaClient();

// 3. Store the PrismaClient instance on the global object ONLY in development.
//    This prevents new instances from being created on every hot reload.
//    In production, hot reloading doesn't happen, so we don't need to store it globally,
//    and it helps with tree-shaking for build optimizations.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// 4. Export the single PrismaClient instance for use throughout your application.
export default prisma;