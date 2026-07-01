// -----------------------------------------------------------------------------
// SERVICE CHANTIER
// -----------------------------------------------------------------------------
// Couche d’accès API pour la gestion des chantiers et données associées :
// - References (statuts, priorités, QA)
// - Ajout, modification, consultation chantier
// - KPI (prévisionnel, consommé)
// - alertes
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// UTIL - token d’authentification
// -----------------------------------------------------------------------------
const getAuthToken = () => localStorage.getItem("access_token");

// -----------------------------------------------------------------------------
// REFERENCE DATA
// -----------------------------------------------------------------------------

export async function getStatuts() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/statuts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch statuts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching statuts:", error);
    throw error;
  }
}

export async function getPriorites() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/priorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch priorites");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching priorites:", error);
    throw error;
  }
}

export async function getQA() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/newChantierQA`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch QA");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching QA:", error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// CHANTIER - Ajout, modification, consultation
// -----------------------------------------------------------------------------

export async function addChantier(data) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/chantier`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add chantier");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding chantier:", error);
    throw error;
  }
}

export async function getChantier() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/getChantier`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Chantier");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Chantier:", error);
    throw error;
  }
}

export async function updateChantier(data) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/updateChantier`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update chantier");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating chantier:", error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// KPI - CHANTIER
// -----------------------------------------------------------------------------

export async function getPrev() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/prev`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prévisionnel");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching prévisionnel:", error);
    throw error;
  }
}

export async function getCons() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cons`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch consommé");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching consommé:", error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// ALERTES
// -----------------------------------------------------------------------------

export async function getAlertes() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/alertes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch alertes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching alertes:", error);
    throw error;
  }
}

export async function getHistorique() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/historique`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch historique");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching historique:", error);
    throw error;
  }
}

export async function getNbAlertes() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/Nbalertes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Nb alertes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Nb alertes:", error);
    throw error;
  }
}

export async function deleteChantier(id_chantier) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deleteChantier/${id_chantier}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete chantier");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting chantier:", error);
    throw error;
  }
}
