import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "@app/Hooks";
import { setUserToken, resetUserData, setUserData, setStoredInDB } from "@features/User/UserSlice";
import { setCartUser } from "@features/ShoppingCart/CartProducts";
import User from "@Models/Users/User";
import { getUserData } from "../../services/users";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const dispatch = useAppDispatch();

  const [token, setToken] = useState("")

  async function getToken() {
    const token = await getAccessTokenSilently()
    setToken(token)
    sessionStorage.setItem("token", token);
  }

  async function getUser() {
    if (user && isAuthenticated) {
      const dbuser: User = await getUserData(user.sub!);
      if (dbuser) {
        dispatch(setCartUser(user.sub!));
        dispatch(setUserData(dbuser));
        dispatch(setStoredInDB(true));
      }
    } else {
      dispatch(setCartUser(""));
      dispatch(resetUserData());
      dispatch(setStoredInDB(false));
    }
  }

  useEffect(() => {
    getToken();
    getUser();
  }, [])

  dispatch(setUserToken(token));

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? (
    <div>
      <span>{`${user?.given_name} ${user?.family_name}`} </span>
    </div>
  ) : (
    <></>
  );
};

export default Profile;
