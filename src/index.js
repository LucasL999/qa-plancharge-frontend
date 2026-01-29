import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';

//* Initialize Keycloak and then render the app
//* using double slash to escape from keycloak

//keycloak.init({ onLoad: 'login-required', chekLoginIframe: false, }).then(authentificated => {
  //if(!authentificated) {
    //window.location.reload();
  //}
  //console.log("Token Keycloak:", keycloak.token);
  //console.log("Roles", keycloak.realmAccess?.roles);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>);
//}); 



//* If you want to start measuring performance in your app, pass a function
//* to log results (for example: reportWebVitals(console.log))
//* or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
