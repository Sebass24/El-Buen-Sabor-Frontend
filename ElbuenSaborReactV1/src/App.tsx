import { useState } from "react";
import { Provider } from "react-redux";
import IndexRouter from "./routers/IndexRouter";
// import { store } from "./App/store";
import Footer from "./components/Footer/Footer";
import { Store } from "./app/Store";
import Loading from "components/Loading/Loading";

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
