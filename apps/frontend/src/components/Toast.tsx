import React from "react";
import useToast from "../hooks/useToast";

const Toast = () => {
  const { message } = useToast();

  if (!message) return null;

  return (
    <div
      className={`
        fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white
        transition-all duration-300
        ${message.type === "success" ? "bg-green-500" : "bg-red-600"}
      `}
    >
      {message.content}
    </div>
  );
};

export default Toast;