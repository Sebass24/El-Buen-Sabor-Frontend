import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setUserToken, resetUserData, setUserData, setStoredInDB, setUserRole } from "@features/User/UserSlice";
import { setCartUser } from "@features/ShoppingCart/CartProducts";
import User from "@Models/Users/User";
import { getUserData } from "@services/users";
import { fetchAddresses, fetchPhones } from "@features/User/UserThunk";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "@app/Store";
import { AnyAction } from "@reduxjs/toolkit";
import Role from "@Models/Users/Role";
import NewClientModal from "components/Users/UsersPersonalData/NewClientModal";


const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user: currentUser, token } = useAppSelector(state => state.users);
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const dispatch = useAppDispatch();
  const thunkdispatch: ThunkDispatch<RootState, unknown, AnyAction> = useAppDispatch();

  async function getToken() {
    const token = await getAccessTokenSilently()
    sessionStorage.setItem("token", token);
    dispatch(setUserToken(token));
  }

  async function getUser() {
    try {
      getToken();
      if (token && user && isAuthenticated) {
        const dbuser: User = await getUserData(user.sub!);
        if (dbuser.name !== null) {
          dispatch(setUserData(dbuser));
          dispatch(setStoredInDB(true));
          thunkdispatch(fetchAddresses(dbuser.id as number));
          thunkdispatch(fetchPhones(dbuser.id as number));
          if (dbuser.role === null) {
            dispatch(setUserRole({
              id: 2,
              description: "Cliente",
            }))
          } else {
            dispatch(setUserRole(dbuser.role as Role))
          }
          dispatch(setCartUser(dbuser));
        } else {
          setShowNewClientModal(true);
          dispatch(setCartUser(null as any));
          dispatch(resetUserData());
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleNewClientModal = () => {
    setShowNewClientModal(false);
  }

  useEffect(() => {
    getUser();
  }, [token])

  return (
    <div>

      <span>{currentUser.name ? ` ${currentUser.name}` : "-"}</span>
      <span>{currentUser.lastName ? ` ${currentUser.lastName}` : "-"}</span>
      {showNewClientModal ? <NewClientModal onClose={handleNewClientModal} /> : ""}
    </div>
  )
};

export default Profile;
