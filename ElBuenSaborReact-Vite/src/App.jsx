import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from "react-redux";
import IndexRouter from './routers/indexRouter';
import { store } from "./App/store";
import Footer from './components/Footer/Footer';


function App() {

  return (
    <Provider store={store}>
      <IndexRouter />
      <Footer />
    </Provider>
  )
}

export default App
