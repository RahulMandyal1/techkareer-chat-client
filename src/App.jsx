import React from "react"
import Routes from "./routes/index"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  )
}

export default App
