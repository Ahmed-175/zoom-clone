import { useContext } from "react";
import ToastContext from "../contexts/toast.context";

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("context of the taost not defined");
  }

  return context;
};

export default useToast;
