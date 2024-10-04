import Credentials from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from 'next-auth';
import { DeveloperLoginSchema, RecruiterLoginSchema } from './lib/schemas'; 
import { getUserByEmailDev, getUserByEmailRec } from '@/lib/user'; 
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export default {
  providers: [
    Github({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials:{userType?: string}) {
        const { userType } = credentials;

        let validatedFields;
        let user = null;
        validatedFields = (userType === 'developer')
          ? DeveloperLoginSchema.safeParse(credentials)
          : RecruiterLoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;

        if (userType === 'developer') {
          user = await getUserByEmailDev(email);
        } else if (userType === 'recruiter') {
          user = await getUserByEmailRec(email);
        }

        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          console.log({...user,userType})
          return {...user,userType:userType};
        }

        return null;
      }
    })
  ]
} satisfies NextAuthConfig;