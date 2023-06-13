import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "@app/Hooks";
import { setCartUser } from "@features/ShoppingCart/CartProducts";
import { resetUserData, setStoredInDB } from "@features/User/UserSlice";
const LogOutAuth = () => {
  const { logout } = useAuth0();

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    dispatch(setCartUser(""));
    dispatch(resetUserData());
    dispatch(setStoredInDB(false));
  };

  return (
    <span
      style={{
        cursor: "pointer",
        width: "100%",
        display: "block",
        padding: "0 1rem",
      }}
      onClick={() => handleLogOut()}
    >
      Cerrar sesión
    </span>
  );
};

export default LogOutAuth;
