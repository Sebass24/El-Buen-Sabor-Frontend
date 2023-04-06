import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from "react-redux";
import IndexRouter from './routers/indexRouter';
import { store } from "./App/store";

function App() {

  return (
    <Provider store={store}>
      <IndexRouter />
    </Provider>
  )
}

export default App
