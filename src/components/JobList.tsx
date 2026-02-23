import { useEffect, useState } from "react";
import { getJobs } from "../services/api";
import JobItem from "./JobItem";
import styles from "./JobList.module.css";
import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job";

interface JobListProps {
  candidate: Candidate;
}

const JobList = ({ candidate }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading)
    return <div className={styles.loading}>Cargando posiciones disponibles</div>;

  if (error)
    return <div className={styles.empty}>Error: {error}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Nuestras posiciones</h2>
        <span className={styles.count}>{jobs.length} available</span>
      </div>

      {jobs.length === 0 ? (
        <div className={styles.empty}>No hay posiciones en este momento</div>
      ) : (
        jobs.map((job) => (
          <JobItem key={job.id} job={job} candidate={candidate} />
        ))
      )}
    </div>
  );
};

export default JobList;