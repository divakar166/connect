"use server"

import * as z from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { RecruiterLoginSchema } from '@/lib/schemas';
import { getUserByEmailRec } from '@/lib/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const recruiterLogin = async (values: z.infer<typeof RecruiterLoginSchema>) => {
  const validatedFields = RecruiterLoginSchema.safeParse(values)
  if(!validatedFields.success){
    return {error:"Invalid fields!"}
  }
  const { email, password} = validatedFields.data;
  const exisitingUser = await getUserByEmailRec(email);
  if(!exisitingUser || !exisitingUser.email || !exisitingUser.password){
    return { error: "User doesn't exist!"}
  }
  if(!exisitingUser.emailVerified){
    const verificationToken = await generateVerificationToken(exisitingUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      "recruiter"
    )
    return { success: "Confirmation email sent!" }
  }
  try{
    await signIn("credentials",{
      email,
      password,
      userType:"recruiter",
      redirectTo:'/dashboard/recruiter'
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