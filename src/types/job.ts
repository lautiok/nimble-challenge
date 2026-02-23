export interface Job {
  id: string;
  title: string;
}

export interface ApplyPayload {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}