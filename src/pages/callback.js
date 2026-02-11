import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const verifier = localStorage.getItem("pkce_verifier");

    fetch(process.env.REACT_APP_KEYCLOAK_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
        code,
        redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URI,
        code_verifier: verifier
      })
    })
      .then(res => res.json())
      .then(tokens => {
        // Stocker le token d'accès dans le localStorage
        localStorage.setItem("access_token", tokens.access_token);

        // Décode le token 
        const decoded = jwtDecode(tokens.access_token);

        // Extraire les rôles du token
        const client = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;
        const roles = decoded.resource_access?.[client]?.roles || [];

        // Stocker les rôles dans le localStorage
        localStorage.setItem("roles", JSON.stringify(roles));
        console.log("Rôles extraits du token :", roles);

        // Rediriger vers la page d'accueil
        navigate("/");
      });
  }, [navigate]);

  return <p>Connexion en cours…</p>;
}
