import prisma from "./db";

export const getVerificationTokenByToken = async (
  token: string
) => {
  try{
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token }
    })
    return verificationToken;
  } catch(error){
    console.log(error)
    return null;
  }
}

export const getVerificationTokenByEmail = async (
  email: string
) => {
  try{
    const verificationToken = await prisma.verificationToken.findFirst({
      where : { email }
    });
    return verificationToken;
  } catch(error){
    console.log(error)
    return null;
  }
}