import { useEffect, useRef } from "react";

export default function Callback() {
  const hasRun = useRef(false);

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

      console.log("TOKEN RESPONSE:", tokens);

      if (!res.ok) {
        console.error("❌ Token exchange failed");
        return;
      }

      localStorage.setItem("access_token", tokens.access_token);

      window.location.replace("/");
    })();
  }, []);

  return <p>Connexion en cours…</p>;
}