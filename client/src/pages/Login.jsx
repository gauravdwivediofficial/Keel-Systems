import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitFunction = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 sm:px-0 bg-white">
      {/* Container */}
      <div className="flex w-[80%] max-w-4xl h-[80vh] justify-around overflow-hidden rounded-lg  ">
        {/* Logo Section */}
        <div className="flex w-1/2 items-center justify-around bg-none">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Keel Systems Logo"
            className="w-3/4"
          />
        </div>

        {/* Divider */}
        <div className="h-full w-px bg-gray-300 hover:bg-gray-300"></div>
        <div className="h-full w-px bg-gray-300 hover:bg-gray-300"></div>

        {/* Login Form Section */}
        <div className="flex w-1/2 flex-col justify-center px-12">
          <h2 className="text-3xl font-semibold text-gray-400 text-center mb-3">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>

          <form onSubmit={onSubmitFunction} className="space-y-6">
            {state === "Sign Up" && (
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="material-icons text-gray-800 text-2xl">
                  <IoPersonOutline />
                </span>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  className="w-full border-none px-3 py-2  text-gray-700 outline-none "
                  required
                />
              </div>
            )}
            {/* Email Input */}

            <div className="flex items-center border-b border-gray-300 py-2">
              <span className="material-icons text-gray-800 text-2xl">
                <MdOutlineEmail />
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full border-none px-3 py-2  text-gray-700 outline-none "
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <span className="material-icons text-gray-800 text-2xl">
                <CiLock />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="w-full border-none px-3 py-2 text-gray-700 outline-none"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded bg-[#df813e] px-4 py-2 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500"
            >
              {state}
            </button>
          </form>
          {state === "Login" && (
            <div className="mt-4 text-end">
              <a
                href="/reset-password"
                className="text-base text-gray-600 font-medium hover:underline"
              >
                Forgot password
              </a>
            </div>
          )}
          {state === "Sign Up" ? (
            <div className="mt-4 text-end">
              <p className="text-base text-gray-600 font-medium">
                Already have and account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-[#df813e] cursor-pointer underline"
                >
                  Login here
                </span>
              </p>
            </div>
          ) : (
            <div className="mt-4 text-end">
              <p className="text-base text-gray-600 font-medium">
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-[#df813e] cursor-pointer underline"
                >
                  Sign Up
                </span>
              </p>
            </div>
          )}

          {/* Forgot Password */}
        </div>
      </div>
    </div>
  );
}

export default Login;
