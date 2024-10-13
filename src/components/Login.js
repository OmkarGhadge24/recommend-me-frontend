import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { ThemeContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to login");
    }
  };

  return (
    <div
      className={`w-full max-w-sm mx-auto mt-10 px-4 sm:px-6 md:px-8 lg:px-0 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`w-full border p-2 mb-4 rounded-md focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 focus:ring-blue-500"
          }`}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`w-full border p-2 mb-4 rounded-md focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
              : "bg-white border-gray-300 focus:ring-blue-500"
          }`}
        />
        <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4 text-center mb-6">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-500 cursor-pointer"
        >
          Sign up
        </span>
      </p>
      <BackButton />
    </div>
  );
};

export default Login;
