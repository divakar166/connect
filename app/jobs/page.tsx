"use client";
import { JobCardWrapper } from "@/components/joblisting/job-card-wrapper";
import { Button } from "@/components/ui/button";
import { jobs } from "@/lib/sample"; // Assuming sample jobs data is available
import { useState } from "react";

const JobsPage = () => {
  const [currentSection, setCurrentSection] = useState("recommended");

  return (
    <div className="text-black pt-20 mt-5 flex justify-center flex-col items-center h-full mb-10">
      <div className="gap-x-2 flex justify-center mb-5">
        <Button
          className={`${
            currentSection === "recommended" && "bg-purple-600 hover:bg-purple-600 text-white"
          }`}
          onClick={() => setCurrentSection("recommended")}
        >
          Recommended Jobs
        </Button>
        <Button
          className={`${
            currentSection === "recent" && "bg-purple-600 hover:bg-purple-600 text-white"
          }`}
          onClick={() => setCurrentSection("recent")}
        >
          Recent Jobs
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCardWrapper 
            key={job.id}
            jobData={job}
          >
          </JobCardWrapper>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
