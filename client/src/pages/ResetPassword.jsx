import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputField = React.useRef([]);

  const inputHandle = (e, index) => {
    if (e.target.value.length > 0 && index < inputField.current.length - 1) {
      inputField.current[index + 1].focus();
    }
  };

  const inputDelete = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputField.current[index - 1].focus();
    }
  };

  const inputPaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputField.current[index]) {
        inputField.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputField.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <img
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32"
      />
      {/* Enter Your Email ID Here To Reset Your Password  */}
      {!isEmailSent && (
        <form
          onClick={onSubmitEmail}
          className="bg-orange-600 rounded-lg shadow-lg w-96 pr-8 pl-8 pb-8 pt-8 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className=" text-gray-200 text-xl text-center mb-6">
            Enter Your Registerd Email
          </p>
          <div className="flex items-center border-b border-none py-2">
            <span className="material-icons text-orange-300 text-2xl">
              <MdOutlineEmail />
            </span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="w-full bg-orange-500 border-none px-3 py-2 rounded-lg text-xl text-gray-900 outline-none"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}

      {/* OTP Input Form  */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-orange-600 rounded-lg shadow-lg w-96 pr-8 pl-8 pb-8 pt-8 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className=" text-gray-200 text-xl text-center mb-6">
            Enter the 6 digit code sent to your email
          </p>
          <div className="flex justify-between mb-8 " onPaste={inputPaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-orange-200 text-gray-700 text-center text-xl rounded-md"
                  ref={(e) => (inputField.current[index] = e)}
                  onInput={(e) => inputHandle(e, index)}
                  onKeyDown={(e) => inputDelete(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}
      {/* Enter New Password Form  */}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={submitNewPassword}
          className="bg-orange-600 rounded-lg shadow-lg w-96 pr-8 pl-8 pb-8 pt-8 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className=" text-gray-200 text-xl text-center mb-6">
            Enter New Password Below
          </p>
          <div className="flex items-center border-b border-none py-2">
            <span className="material-icons text-orange-300 text-2xl">
              <CiLock />
            </span>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              placeholder="New Password"
              className="w-full bg-orange-500 border-none px-3 py-2 rounded-lg text-xl text-gray-900 outline-none"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
