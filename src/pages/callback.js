import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// -----------------------------------------------------------------------------
// CALLBACK OAUTH / KEYCLOAK
// -----------------------------------------------------------------------------
// Cette page gère le retour d'authentification OAuth (Authorization Code + PKCE)
// Elle échange le code contre un token, récupère l'utilisateur, puis redirige.
// -----------------------------------------------------------------------------

export default function Callback() {

  // Protection contre double exécution du useEffect en mode strict React
  const hasRun = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {

    // Évite les exécutions multiples (React StrictMode / rerenders)
    if (hasRun.current) return;
    hasRun.current = true;

    // Récupération du code OAuth dans l'URL
    const code = new URLSearchParams(window.location.search).get("code");

    // Récupération du PKCE verifier stocké avant redirection
    const verifier = localStorage.getItem("pkce_verifier");

    // Anti-rejeu : évite de réutiliser le même code d'authentification
    const alreadyUsed = sessionStorage.getItem("auth_code_used");

    if (!code) return;

    if (alreadyUsed === code) {
      console.warn("Le code d'authentification a déjà été utilisé.");
      return;
    }

    sessionStorage.setItem("auth_code_used", code);

    // -------------------------------------------------------------------------
    // ÉCHANGE DU CODE CONTRE UN TOKEN
    // -------------------------------------------------------------------------
    (async () => {
      const res = await fetch(process.env.REACT_APP_KEYCLOAK_TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
          code,
          redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URI,
          code_verifier: verifier
        })
      });

      const tokens = await res.json();

      if (!res.ok) {
        console.error("❌ Token exchange failed");
        return;
      }

      // Stockage du token d'accès
      const accessToken = tokens.access_token;
      localStorage.setItem("access_token", accessToken);

      // -----------------------------------------------------------------------
      // RÉCUPÉRATION UTILISATEUR COURANT (/me)
      // -----------------------------------------------------------------------
      const meRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Cas erreur backend
      if (!meRes.ok) {
        console.error("Erreur /me", meRes.status);
        localStorage.clear();
        navigate("/unauthorized", { replace: true });
        return;
      }

      const me = await meRes.json();

      // Validation minimale utilisateur
      if (!me?.email) {
        console.warn("Utilisateur refusé : email manquant");
        localStorage.clear();
        navigate("/unauthorized", { replace: true });
        return;
      }

      console.log("Utilisateur connecté :", me.email);

      // Redirection finale application
      navigate("/", { replace: true });
    })();

  }, []);

  // ---------------------------------------------------------------------------
  // UI minimale pendant le flux d'authentification
  // ---------------------------------------------------------------------------
  return <p>Connexion en cours…</p>;
}