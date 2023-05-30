import React from "react";
import ReactDOM from "react-dom/client";
// import NavBar from "./components/NavBar/NavBar";
// import Landing from "./components/LandingPhoto/LandingPhoto";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-a6tntsf5lyicxsfn.us.auth0.com"
      clientId="smzKUEQwvdCTTg9RGvmKj9REsGRfweuK"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://buensaborapi",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
