// -----------------------------------------------------------------------------
// SERVICE DASHBOARD - CAPACITÉ TOTALE
// -----------------------------------------------------------------------------
// Accès API pour récupérer la capacité totale des équipes QA.
// Utilisé principalement dans le Dashboard.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// UTIL - token d’authentification
// -----------------------------------------------------------------------------
const getAuthToken = () => localStorage.getItem("access_token");

// -----------------------------------------------------------------------------
// API - CAPACITÉ TOTALE
// -----------------------------------------------------------------------------
export async function getTotCap() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/TotalCap`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch QAs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching QAs:", error);
    throw error;
  }
}