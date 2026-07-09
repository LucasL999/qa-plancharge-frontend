// -----------------------------------------------------------------------------
// SERVICE USER
// -----------------------------------------------------------------------------
// Couche d’accès API pour la gestion des utilisateurs :
// - récupération des rôles
// - Ajouter, modifier, supprimer des utilisateurs
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// UTIL - token d’authentification
// -----------------------------------------------------------------------------
const getAuthToken = () => localStorage.getItem("access_token");

export async function me(){
  try{
    const token = getAuthToken();

    const meRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!meRes.ok) {
      throw new Error("Failed to fetch user");
    }

    return await meRes.json();

  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}


// -----------------------------------------------------------------------------
// API - RÔLES
// -----------------------------------------------------------------------------
export async function getRoles() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/roles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// API - UTILISATEURS
// -----------------------------------------------------------------------------
export async function getAllUsers() {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function addUser(userData) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

export async function updateUser(userData) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userData.id_user}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(idUser) {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deleteUser/${idUser}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}