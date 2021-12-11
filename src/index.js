import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-hb2qkwm0.au.auth0.com"
    clientId="nBYxAyU5UZ2rDBZcIxbGFx1UhYDVdIOp"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
