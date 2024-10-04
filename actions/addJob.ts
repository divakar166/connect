"use server"

import prisma from "@/lib/db";
import { AddJobSchema } from "@/lib/schemas";
import { z } from "zod";

export const addJob = async (values: z.infer<typeof AddJobSchema>, recruiterId: string) => {
  const validatedFields = AddJobSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { 
    job_title, 
    job_type, 
    job_location, 
    company_name,
    location,
    experience,
    skills,
    salary,
    start_date,
    apply_by,
    openings,
    about
  } = validatedFields.data;

  try {
    const newJobListing = await prisma.jobListing.create({
      data: {
        title: job_title,
        jobType: job_type,
        jobLocation: job_location,
        companyName: company_name,
        location: location,
        experience: experience,
        skills: skills,
        salary: salary,
        startDate: start_date ? new Date(start_date) : null,
        applyBy: apply_by ? new Date(apply_by) : null,
        openings: openings,
        description: about,
        recruiterId: recruiterId,
      },
    });
    return { success: "Added Successfully!" };
  } catch (error) {
    console.error("Error adding job:", error);
    return { error: "Failed to add job listing." };
  }
};
