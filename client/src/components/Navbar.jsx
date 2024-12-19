import React, { useContext } from "react";
import { assets } from "../assets/assets";
import {useNavigate} from 'react-router-dom'
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


function Nabar() {

  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContext)
  const setVerificationOtp = async()=> {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const logout = async()=> {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedIn(false)
      data.success && setUserData(false)
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Logo" className=" w-30 sm:w-32" />
      {userData ? (
        <div className="w-8 h-8 justify-center items-center text-center pt-1 rounded-full bg-orange-500 text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="w-28 list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={setVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className=" py-1 px-2 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border rounded-lg px-6 py-2 text-white bg-orange-500 hover:bg-orange-700 text-lg transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
}

export default Nabar;
