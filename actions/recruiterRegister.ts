"use server"

import bcrypt from 'bcryptjs';
import prisma  from '@/lib/db';
import * as z from 'zod';
import { getUserByEmailRec } from '@/lib/user';
import { RecruiterRegisterSchema } from '@/lib/schemas';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const recruiterRegister = async (values: z.infer<typeof RecruiterRegisterSchema>) => {
  const validatedFields = RecruiterRegisterSchema.safeParse(values)
  if(!validatedFields.success){
    return {error:"Invalid fields!"}
  }

  const {email, password, name, mobile} = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const exisitingUser = await getUserByEmailRec(email);
  if(exisitingUser) {
    return {error:"Email already in use!"}
  }
  await prisma.recruiter.create({
    data:{
      name,
      email,
      password:hashedPassword,
      mobile
    }
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    "recruiter"
  )
  return {success:"Confirmation email sent!"}
}