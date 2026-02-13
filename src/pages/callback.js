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

    (async () => {
      try {
        // 1) Échange code -> tokens
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

        if (!tokens.access_token) {
          console.error("❌ Pas d'access_token reçu :", tokens);
          return;
        }

        // 2) Stocker le token d'accès
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("id_token", tokens.id_token);

        // 3) Décoder le token pour récupérer les infos (et éventuellement rôles Keycloak)
        const decoded = jwtDecode(tokens.access_token);
        const client = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;
        const kcRoles = decoded.resource_access?.[client]?.roles || [];
        const email = decoded.email;

        localStorage.setItem("roles_kc", JSON.stringify(kcRoles));
        if (email) localStorage.setItem("email", email);

        // 4) Appeler le backend pour récupérer le rôle utilisateur depuis la BDD
        const meRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("id_token")}`,
            },
          }
        );

        if (meRes.status === 403) {
          // Utilisateur authentifié par Keycloak mais non autorisé dans la BDD
          console.warn("⛔ Utilisateur non autorisé (BDD)");
          
          // Option : déclencher un logout Keycloak propre
          localStorage.removeItem("access_token");
          localStorage.removeItem("pkce_verifier");
          localStorage.removeItem("roles");
          localStorage.removeItem("roles_kc");
          localStorage.removeItem("email");

          // Redirige vers l'app après logout serveur
          window.location.href =
            `${process.env.REACT_APP_KEYCLOAK_LOGOUT_ENDPOINT}` +
            `?redirect_uri=${encodeURIComponent(process.env.REACT_APP_APP_URL || "http://localhost:3000")}`; // ou une page d'erreur dédiée
          return;
        }

        if (!meRes.ok) {
          const errText = await meRes.text();
          console.error("❌ Erreur /me :", meRes.status, errText);
        }

        const me = await meRes.json().catch(() => ({}));
        // me = { nom, prenom, role } selon le contrôleur

        if (me?.role) {
          localStorage.setItem("role", me.role); // rôle métier depuis BDD
          console.log("✅ Rôle BDD récupéré :", me.role);
        } else {
          console.warn("⚠ Aucun rôle BDD renvoyé, vérifie le contrôleur /me");
        }

        // 5) Redirection “hard” vers l'accueil (évite la boucle de redirection)
        window.location.replace("/");

      } catch (err) {
        console.error("❌ Erreur durant le callback :", err);
      }
    })();
  }, []);

  return <p>Connexion en cours…</p>;
}