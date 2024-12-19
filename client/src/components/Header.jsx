import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {AppContext} from '../context/AppContext.jsx'

function Header() {

  const {userData} = useContext(AppContext)

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-900">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}!
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">welcome</h2>
      <p className="mb-8 max-w-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        iusto!
      </p>
      <button
        onClick={() => navigate("/login")}
        className="border rounded-full px-8 py-2.5 text-white bg-orange-500 hover:text-white hover:bg-orange-700 transition-all"
      >
        Get Started
      </button>
    </div>
  );
}

export default Header;
