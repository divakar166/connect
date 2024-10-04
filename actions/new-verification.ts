"use server"

import prisma from "@/lib/db";
import { getUserByEmailDev, getUserByEmailRec } from "@/lib/user";
import { getVerificationTokenByToken } from "@/lib/verification-token"

export const newVerification = async ( token: string, type: string ) => {
  const exisitingToken = await getVerificationTokenByToken(token);
  if(!exisitingToken){
    return { error: "Token does not exist!" };
  }
  const hasExpired = new Date(exisitingToken.expires) < new Date();
  if(hasExpired){
    return { error: "Token has expired!" };
  }
  if(type=="developer"){
    var exisitingUser = await getUserByEmailDev(exisitingToken.email);
    await prisma.developer.update({
      where: { id: exisitingUser?.id },
      data: {
        emailVerified: new Date(),
        email: exisitingToken.email
      }
    })
  }else{
    var exisitingUser = await getUserByEmailRec(exisitingToken.email);
    await prisma.recruiter.update({
      where: { id: exisitingUser?.id },
      data: {
        emailVerified: new Date(),
        email: exisitingToken.email
      }
    })
  }
  
  await prisma.verificationToken.delete({
    where:{ id: exisitingToken.id}
  });
  return { success: "Email verified!"}
}