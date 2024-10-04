import NextAuth from 'next-auth'
import {PrismaAdapter} from '@auth/prisma-adapter';

import prisma from './lib/db';
import authConfig from './auth.config'
export const {
  handlers:{ GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.type = user.userType as string;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.type = token.type as "developer" | "recruiter";
      }
      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session:{strategy:"jwt"},
  ...authConfig
})

