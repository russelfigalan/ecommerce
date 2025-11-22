// import { PrismaClient } from "@/app/generated/prisma";
// // import { PrismaNeon } from "@prisma/adapter-neon";
// // import { Pool, neonConfig } from "@neondatabase/serverless";
// // import ws from "ws";

// // neonConfig.webSocketConstructor = ws;

// // const connectionString = process.env.DATABASE_URL!;

// // const pool = new Pool({ connectionString });

// // const adapter = new PrismaNeon(pool as any);

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     // adapter,
//     log: ["query"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@/app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
