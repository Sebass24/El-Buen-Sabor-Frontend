import { Provider } from "react-redux";
import IndexRouter from "./routers/IndexRouter";
// import { store } from "./App/store";
import Footer from "./components/Footer/Footer";
import { Store } from "./app/Store";
import Loading from "components/Loading/Loading";
import { debounce } from "@mui/material";
import { saveState } from "@app/BrowserStorage";

// here we subscribe to the store changes
Store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState("cardProducts", Store.getState().cart);
  }, 800)
);

/* saveState("redux", Store.getState());
saveState("cartProducts", Store.getState().cart); */

function App() {
  return (
    <Provider store={Store}>
      <>
        <Loading />
        <IndexRouter />
        <Footer />
      </>
    </Provider>
  );
}

export default App;
