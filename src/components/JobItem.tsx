import { useState } from "react";
import { applyToJob } from "../services/api";
import styles from "./JobItem.module.css";
import type { ApplyPayload, Job } from "../types/job";
import type { Candidate } from "../types/candidate";

interface JobItemProps {
  job: Job;
  candidate: Candidate;
}

const JobItem = ({ job, candidate }: JobItemProps) => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!repoUrl) {
      setError("Repository URL is required");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    const payload: ApplyPayload = {
      uuid: candidate.uuid,
      candidateId: candidate.candidateId,
      jobId: job.id,
      repoUrl,
    };

    try {
      const response = await applyToJob(payload);
      if (response.ok) {
        setMessage("Application sent successfully!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>{job.title}</div>

      <div className={styles.row}>
        <input
          type="text"
          placeholder="https://github.com/your-user/your-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>
      </div>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default JobItem;