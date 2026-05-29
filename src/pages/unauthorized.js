// -----------------------------------------------------------------------------
// PAGE UNAUTHORIZED
// -----------------------------------------------------------------------------
// Cette page est affichée lorsqu’un utilisateur est refusé après authentification.
// Elle permet uniquement d’informer l’utilisateur et de forcer une déconnexion.
// -----------------------------------------------------------------------------

// PAGE UNAUTHORIZED
export default function Unauthorized() {

  // ---------------------------------------------------------------------------
  // HANDLER - déconnexion Keycloak
  // ---------------------------------------------------------------------------
  const handleLogout = () => {

    const logoutUrl =
      `${process.env.REACT_APP_KEYCLOAK_LOGOUT_ENDPOINT}` +
      `?redirect_uri=${encodeURIComponent(process.env.REACT_APP_APP_URL)}`;

    window.location.replace(logoutUrl);
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  return (
    <div style={{ padding: 40 }}>

      <h1>Accès refusé</h1>

      <p>Votre compte n’est pas autorisé dans l’application.</p>

      <button onClick={handleLogout}>
        Se déconnecter
      </button>

    </div>
  );
}