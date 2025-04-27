import { useState, useEffect } from "react";

export const useJobArray = () => {  
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem("jobs");
    return storedJobs
      ? JSON.parse(storedJobs)
      : [
          {
            id: "1",
            companyName: "TCS",
            category: "Service Based",
            type: "Placement",
            package: "6 LPA", // ✅ Added package
            JDdate: new Date().toISOString().split("T")[0], 
            domain: "Full Stack",
          },
          {
            id: "2",
            companyName: "Google",
            category: "Product Based",
            type: "Internship",
            package: "80K/month", // ✅ Added package
            JDdate: new Date().toISOString().split("T")[0], 
            domain: "Software Developer",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return { jobs, setJobs };
};
