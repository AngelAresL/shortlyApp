import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

if (
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET
) {
  throw new Error("Missing environment variables for GitHub OAuth provider");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && typeof token.id === "string") {
        session.userId = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id.toString();
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        const userEmail = user.email as string;
        let existingUser = await prisma.user.findUnique({
          where: { email: userEmail },
        });

        const accountData = {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          access_token: account.access_token || "",
          refresh_token: account.refresh_token || "",
          expires_at: account.expires_at || 0,
          token_type: account.token_type || "",
          scope: account.scope || "",
          id_token: account.id_token || "",
          session_state: account.session_state || "",
          type: "oauth", // Add this line
        };

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              name: user.name || '',
              email: userEmail,
              image: user.image,
              emailVerified: new Date(),
              password: '', // A placeholder password
              accounts: {
                create: accountData,
              }
            },
          });
        } else {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: accountData,
            create: {
              userId: existingUser.id,
              ...accountData,
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);