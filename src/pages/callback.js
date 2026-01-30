import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem("access_token", tokens.access_token);
        navigate("/");
      });
  }, [navigate]);

  return <p>Connexion en cours…</p>;
}
