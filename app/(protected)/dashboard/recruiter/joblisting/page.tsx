"use client"
import { JobsListingRecruiter } from "@/components/dashboard/joblisting-recruiter";
import { useSession } from "next-auth/react";

const RecruiterJobListingPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight dark:text-primary">
              Job Listings
            </h2>
          </div>
          <div>
            <JobsListingRecruiter recruiterId={session?.user.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterJobListingPage;
