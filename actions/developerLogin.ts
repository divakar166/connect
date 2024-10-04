"use server"

import * as z from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DeveloperLoginSchema } from '@/lib/schemas';
import { getUserByEmailDev } from '@/lib/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const developerLogin = async (values: z.infer<typeof DeveloperLoginSchema>) => {
  const validatedFields = DeveloperLoginSchema.safeParse(values)
  if(!validatedFields.success){
    return { error:"Invalid fields!" }
  }
  const { email, password} = validatedFields.data;
  const exisitingUser = await getUserByEmailDev(email);
  if(!exisitingUser || !exisitingUser.email || !exisitingUser.password){
    return { error: "User doesn't exist!"}
  }
  if(!exisitingUser.emailVerified){
    const verificationToken = await generateVerificationToken(exisitingUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      "developer"
    )
    return { success: "Confirmation email sent!" }
  }
  try{
    await signIn("credentials",{
      email,
      password,
      userType:"developer",
      redirectTo:'/dashboard/developer'
    })
    return {success:"Login Successful!"}
  } catch (error) {
    if(error instanceof AuthError){
      switch (error.type){
        case "CredentialsSignin":
          return { error:"Invalid credentials" }
        default:
          return { error:"Something went wrong!"} 
      }
    }
    throw error;
  }
}