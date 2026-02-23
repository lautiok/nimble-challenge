import type { Candidate } from "../types/candidate";
import type { ApplyPayload, Job } from "../types/job";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function getCandidateByEmail(
  email: string
): Promise<Candidate> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error fetching candidate");
  }

  return response.json() as Promise<Candidate>;
}

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error fetching jobs");
  }

  return response.json() as Promise<Job[]>;
}

export async function applyToJob(
  payload: ApplyPayload
): Promise<{ ok: boolean }> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error applying to job");
  }

  return response.json() as Promise<{ ok: boolean }>;
}