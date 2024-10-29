export const API_URL =
  import.meta.env.MODE === "production"
    ? "https://api.adorandoalrey.com"
    : "http://localhost:4000";
