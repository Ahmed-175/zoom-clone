import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";

import { ToastProvider } from "./contexts/toast.context";
import { AuthProvider } from "./contexts/auth.context";
// import PublicLayout from "./routes/PublicRoute";
// import ProtectedLayout from "./routes/ProtectedRoute";
import CreateMeeting from "./pages/CreateMeeting";
import { SocketProvider } from "./contexts/socket.context";


const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <SocketProvider>

          <Routes>
            <Route >
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route>

              <Route path="/home" element={<Home />} />
              <Route path="/meeting/:id" element={<Meeting />} />
              <Route path="/create-meeting" element={<CreateMeeting />} />
            </Route>
          </Routes>
        </SocketProvider>

      </AuthProvider>
    </ToastProvider>
  );
};

export default App;