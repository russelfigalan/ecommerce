import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      role: UserRole;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole;
  }
}

declare module "next-auth" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      // console.log("🪪 Session callback:", session);

      return session;
    },
    async jwt({ token }) {
      if (!token) return token;

      const existingUser = await getUserById(token.sub as string);

      if (!existingUser) return token;

      token.role = existingUser.role;
      // if (user) {
      //   const dbUser = await getUserById(user.id!);
      //   token.id = dbUser?.id;
      //   token.role = dbUser?.role ?? "USER";
      // }

      // if (token.sub && !token.role) {
      //   const dbUser = await getUserById(token.sub);
      //   token.role = dbUser?.role ?? "USER";
      // }

      // if (!token.sub) return token;

      // const existingUser = await getUserById(token.sub);

      // if (!existingUser) return token;

      // token.role = existingUser.role;
      // console.log("JWT token:", token);

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
