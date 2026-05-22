import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { login } from "../services/auth.service";

const Login = () => {
  const { showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      showError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const token = await login(form);

      localStorage.setItem("access_token", token);

      showSuccess("Login Successfully");

      navigator("/home");
    } catch (error: any) {
      console.error(error);

      showError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen text-center pt-10 relative">
      <h1 className="text-3xl md:text-6xl">
        Welcome To{" "}
        <span className="bg-blue-600 p-2 px-4 rounded-2xl text-white">
          Zoom
        </span>{" "}
        Clone
      </h1>

      <img
        src={"./zoom_2.webp"}
        alt="icon"
        className="w-15 h-15 object-cover absolute right-10 top-20 rotate-45"
      />

      <div className="h-fit min-h-50 p-10 md:p-14 w-140 text-center absolute left-5 bottom-15">
        <h1 className="text-2xl font-bold mb-5">Login Page</h1>

        {/* Email */}
        <div className="mb-4 text-left w-full space-y-2.5">
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            placeholder="test123@gmail.com..."
            className="block w-full bg-gray-100 rounded-lg p-2 outline-none"
          />
        </div>

        {/* Password */}
        <div className="text-left space-y-2.5">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="test@#123"
            className="block w-full bg-gray-100 rounded-lg p-2 outline-none"
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className={`w-full my-5 font-bold text-white rounded-2xl p-3 transition ${
            loading ? "bg-slate-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "loading..." : "login"}
        </button>

        <div className="text-sm text-gray-600">
          I don't have an account{" "}
          <Link className="text-blue-600 underline font-medium" to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;