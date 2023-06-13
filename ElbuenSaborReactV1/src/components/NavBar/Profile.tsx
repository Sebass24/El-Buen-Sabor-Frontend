import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setUserToken, resetUserData, setUserData, setStoredInDB, setUserAuth0Data } from "@features/User/UserSlice";
import { setCartUser } from "@features/ShoppingCart/CartProducts";
import User from "@Models/Users/User";
import { getUserData } from "../../services/users";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { user: currentUser } = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  async function getToken() {
    const token = await getAccessTokenSilently()
    sessionStorage.setItem("token", token);
    dispatch(setUserToken(token));
  }

  async function getUser() {
    if (user && isAuthenticated) {
      console.log(user.sub);
      const dbuser: User = await getUserData(user.sub!);
      console.log(dbuser);
      if (dbuser && dbuser.name !== undefined) {
        dispatch(setCartUser(user.sub!));
        dispatch(setUserData(dbuser));
        dispatch(setStoredInDB(true));
      } else {
        dispatch(setCartUser(""));
        dispatch(resetUserData());
        dispatch(setStoredInDB(false));
      }
    }
  }

  useEffect(() => {
    getToken();
    getUser();
  }, [])

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? (
    <div>
      <span>{currentUser.name ? ` ${currentUser.name}` : "-"}</span>
      <span>{currentUser.lastName ? ` ${currentUser.lastName}` : "-"}</span>
    </div>
  ) : (
    <></>
  );
};

export default Profile;
