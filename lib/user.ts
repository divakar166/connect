import prisma from "@/lib/db";

export const getUserByEmailDev = async (email:string) => {
  try{
    const user = await prisma.developer.findUnique({where:{email}});
    return user;
  }catch{
    return null;
  }
}

export const getUserByIdDev = async (id:string) => {
  try{
    const user = await prisma.developer.findUnique({where:{id}});
    return user;
  }catch{
    return null;
  }
}

export const getUserByEmailRec = async (email:string) => {
  try{
    const user = await prisma.recruiter.findUnique({where:{email}});
    return user;
  }catch{
    return null;
  }
}