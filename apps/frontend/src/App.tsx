import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Meeting from "./pages/Meeting"
import { ToastProvider } from "./contexts/toast.context"

const App = () => {
  return (
    <>
      <ToastProvider>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/meeting/:id" element={<Meeting />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </ToastProvider>
    </>
  )
}

export default App