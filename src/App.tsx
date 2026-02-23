import { useState } from "react";
import { getCandidateByEmail } from "./services/api";
import type { Candidate } from "./types/candidate";
import styles from "./App.module.css";
import JobList from "./components/JobList";

function App() {
  const [email, setEmail] = useState<string>("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!email) {
      setError("Email requerido");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCandidateByEmail(email);
      setCandidate(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nimble Gravity Challenge</h1>

      {!candidate && (
        <div className={styles.searchBox}>
          <input
            type="email"
            placeholder="Introduzca su email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {candidate && <JobList candidate={candidate} />}
    </div>
  );
}

export default App;