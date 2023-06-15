import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setUserToken, resetUserData, setUserData, setStoredInDB, setUserRole } from "@features/User/UserSlice";
import { setCartUser } from "@features/ShoppingCart/CartProducts";
import User from "@Models/Users/User";
import { getUserData } from "@services/users";

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
      const dbuser: User = await getUserData(user.sub!);
      if (dbuser && dbuser.name !== undefined) {
        console.log(dbuser)
        dispatch(setUserData(dbuser));
        dispatch(setStoredInDB(true));
        if (dbuser.role?.id === undefined) {
          dispatch(setUserRole({
            id: 2,
            description: "Cliente",
          }))
        } else {
          dispatch(setUserRole(dbuser.role))
        }
        dispatch(setCartUser(dbuser));
      } else {
        dispatch(setCartUser(null as any));
        dispatch(resetUserData());
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
