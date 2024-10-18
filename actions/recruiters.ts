"use server"

import prisma from "@/lib/db";
import { ObjectId } from 'mongodb';

export const fetchJobsByRecruiter = async (recruiterId: string) => {
  try{
    const jobs = await prisma.jobListing.findMany({
      where:{
        recruiterId: recruiterId
      },
      orderBy:{
        createdAt:"desc"
      }
    });
    return { jobs };
  } catch (error) {
    console.error("Error fetching jobs", error);
    return { error: "Failed to fetch jobs." }
  }
}