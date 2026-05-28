import { useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";

export default function Callback() {
  const hasRun = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const code = new URLSearchParams(window.location.search).get("code");
    const verifier = localStorage.getItem("pkce_verifier");
    const alreadyUsed = sessionStorage.getItem("auth_code_used");

    if (!code) return;
    if (alreadyUsed === code) {
      console.warn("Le code d'authentification a déjà été utilisé.");
      return;
    }
    sessionStorage.setItem("auth_code_used", code);

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

      const accessToken = tokens.access_token;
      localStorage.setItem("access_token", accessToken);

      const meRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!meRes.ok) {
        console.error("Erreur /me", meRes.status);
        localStorage.clear();
        navigate("/unauthorized", { replace: true });
        return;
      }

      const me = await meRes.json();

      if (!me?.email){
        console.warn("utilisateur refusé");
        localStorage.clear();
        navigate("/unauthorized", { replace: true });
      }
      console.log("Utilisateur connecté :", me.email);

      navigate("/", { replace: true });
    })();
  });

  return <p>Connexion en cours…</p>;
}