import { generateCodeVerifier, generateCodeChallenge } from "./pkce";

export async function redirectToKeycloak() {
  const verifier = generateCodeVerifier();
  localStorage.setItem("pkce_verifier", verifier);

  const challenge = await generateCodeChallenge(verifier);

  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    response_type: "code",
    scope: "openid profile email",
    redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URI,
    code_challenge: challenge,
    code_challenge_method: "S256"
  });

  window.location.href =
    `${process.env.REACT_APP_KEYCLOAK_AUTH_ENDPOINT}?${params.toString()}`;
}
