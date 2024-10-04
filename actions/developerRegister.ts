"use server"

import bcrypt from 'bcryptjs';
import prisma  from '@/lib/db';
import * as z from 'zod';
import { getUserByEmailDev } from '@/lib/user';
import { DeveloperRegisterSchema } from '@/lib/schemas';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const developerRegister = async (values: z.infer<typeof DeveloperRegisterSchema>) => {
  const validatedFields = DeveloperRegisterSchema.safeParse(values)
  if(!validatedFields.success){
    return {error:"Invalid fields!"}
  }

  const {email, password, name} = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const exisitingUser = await getUserByEmailDev(email);
  if(exisitingUser) {
    return {error:"Email already in use!"}
  }
  await prisma.developer.create({
    data:{
      name,
      email,
      password:hashedPassword,
    }
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    "developer"
  )
  return {success:"Confirmation email sent!"}
}