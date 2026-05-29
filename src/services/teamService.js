// -----------------------------------------------------------------------------
// SERVICE TEAM
// -----------------------------------------------------------------------------
// Couche d’accès API pour la gestion des équipes QA :
// - récupération de la liste des QA
// - récupération du nombre total de QA
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// UTIL - token d’authentification
// -----------------------------------------------------------------------------
const getAuthToken = () => localStorage.getItem("access_token");

// -----------------------------------------------------------------------------
// API - LISTE DES QA
// -----------------------------------------------------------------------------
export async function getAllTeam() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/QA`,
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

// -----------------------------------------------------------------------------
// API - NOMBRE TOTAL DE QA
// -----------------------------------------------------------------------------
export async function getNbQA() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/nbQA`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch nb QA");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching nb QA:", error);
    throw error;
  }
}