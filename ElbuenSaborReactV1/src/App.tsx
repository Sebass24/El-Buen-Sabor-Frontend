import { useState } from "react";
import { Provider } from "react-redux";
import IndexRouter from "./routers/IndexRouter";
// import { store } from "./App/store";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    // <Provider store={store}>
    <>
      <IndexRouter />
      <Footer />
    </>
    // </Provider>
  );
}

export default App;
