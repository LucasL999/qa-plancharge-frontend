import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Callback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const verifier = localStorage.getItem("pkce_verifier");

    if (!code) {
      console.error("❌ Pas de 'code' dans l'URL /callback");
      return;
    }

    fetch(process.env.REACT_APP_KEYCLOAK_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
        code,
        redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URI, // <- doit être /callback
        code_verifier: verifier
      })
    })
      .then(res => res.json())
      .then(tokens => {
        if (!tokens.access_token) {
          console.error("❌ Pas d'access_token reçu :", tokens);
          return;
        }

        // 1) stocker token
        localStorage.setItem("access_token", tokens.access_token);

        // 2) décoder & stocker rôles (client roles)
        const decoded = jwtDecode(tokens.access_token);
        const client = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;
        const roles = decoded.resource_access?.[client]?.roles || [];
        localStorage.setItem("roles", JSON.stringify(roles));
        console.log("✅ Rôles extraits :", roles);

        // 3) redirection “hard”
        window.location.replace("/");
      })
      .catch(err => {
        console.error("❌ Erreur d'échange de code/token :", err);
      });
  }, []);

  return <p>Connexion en cours…</p>;
}
