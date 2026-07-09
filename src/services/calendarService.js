// -----------------------------------------------------------------------------
// SERVICE EVENTS
// -----------------------------------------------------------------------------
// Couche d’accès API pour la gestion des événements.
// Responsabilités :
// - création d’un événement
// - récupération des événements
// - modification d’un événement
// - suppression d’un événement
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// UTIL - récupération du token d’authentification
// -----------------------------------------------------------------------------
const getAuthToken = () => localStorage.getItem("access_token");

// -----------------------------------------------------------------------------
// API - AJOUT D'UN ÉVÉNEMENT
// -----------------------------------------------------------------------------
export async function addEvent(eventData) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/addEvent`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// API - RÉCUPÉRATION DES ÉVÉNEMENTS
// -----------------------------------------------------------------------------
export async function getEvents() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function getEventsOther() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/eventsOther`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// API - MODIFICATION D'UN ÉVÉNEMENT
// -----------------------------------------------------------------------------
export async function updateEvent(id_event, date_debut, date_fin) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/updateEvent`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_event, date_debut, date_fin }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// API - SUPPRESSION D'UN ÉVÉNEMENT
// -----------------------------------------------------------------------------
// ✅ basé sur id_event (et non plus sur date_debut/date_fin) pour que la
// suppression fonctionne quel que soit le jour cliqué dans la plage d'absence
export async function deleteEvent(id_event) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deleteEvent`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_event }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete events");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting events:", error);
    throw error;
  }
}