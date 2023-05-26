import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "@app/Hooks";
import { setUser } from "@features/User/UserSlice";
const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const dispatch = useAppDispatch()

  const [token, setToken] = useState("")
  useEffect(() => {
    async function getToken() {
      const token = await getAccessTokenSilently()
      setToken(token)
      sessionStorage.setItem("token", token)
    }
    getToken()
  }, [])

  dispatch(setUser(token))


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
