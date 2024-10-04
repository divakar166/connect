// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      type?: string;  
    } & DefaultSession['developer'];
  }

  interface User {
    userType?: string; 
  }
}
