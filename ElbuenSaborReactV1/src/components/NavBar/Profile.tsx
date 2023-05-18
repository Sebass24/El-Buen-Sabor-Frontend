import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  async function accessToken() {
    console.log("entre culiado");
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://buensaborapi`,
        scope: "Admin",
      },
    });
    console.log(accessToken);
    sessionStorage.setItem("token", accessToken);
  }
  useEffect(() => {
    accessToken();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <span>{user?.name}</span>
    </div>
  ) : (
    <></>
  );
};

export default Profile;
