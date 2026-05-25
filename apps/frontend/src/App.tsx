import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";

import { ToastProvider } from "./contexts/toast.context";
import { AuthProvider } from "./contexts/auth.context";
import PublicLayout from "./routes/PublicRoute";
import ProtectedLayout from "./routes/ProtectedRoute";
import { SocketProvider } from "./contexts/socket.context";


const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <SocketProvider>

          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedLayout />}>

              <Route path="/home" element={<Home />} />
              <Route path="/meeting/:id" element={<Meeting />} />
            </Route>
          </Routes>
        </SocketProvider>

      </AuthProvider>
    </ToastProvider>
  );
};

export default App;