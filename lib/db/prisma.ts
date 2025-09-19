    import { PrismaClient } from "@/app/generated/prisma";

    // Extend the global object with a PrismaClient instance for development
    declare global {
      var prisma: PrismaClient | undefined;
    }

    let prisma: PrismaClient;

    if (process.env.NODE_ENV === 'production') {
      // In production, always create a new instance
      prisma = new PrismaClient();
    } else {
      // In development, use a global instance to prevent multiple connections
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      prisma = global.prisma;
    }

    export default prisma;