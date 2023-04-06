import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/LandingPhoto/LandingPhoto";
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-e6nyf0w5r4ztsond.us.auth0.com'
      clientId='VEfWrreLSzXGJqCb433UDqlu3bPb8j7Q'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
