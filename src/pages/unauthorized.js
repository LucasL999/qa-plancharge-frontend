// PAGE UNAUTHORIZED
// L'utilisateur refusé à la connexion est redirigé vers cette page

// DEBUT PAGE
export default function Unauthorized() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Accès refusé</h1>
      <p>Votre compte n’est pas autorisé dans l’application.</p>
      <button
        onClick={() => {
        const logoutUrl =
          `${process.env.REACT_APP_KEYCLOAK_LOGOUT_ENDPOINT}` +
          `?redirect_uri=${encodeURIComponent(process.env.REACT_APP_APP_URL)}`;

        window.location.replace(logoutUrl);
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}
// FIN PAGE