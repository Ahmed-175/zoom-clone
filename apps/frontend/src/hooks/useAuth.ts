import { useContext } from "react";
import AuthContext from "../contexts/auth.context";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth context not defined");
  }
  return context;
};

export default useAuth;
