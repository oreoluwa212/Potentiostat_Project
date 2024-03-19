import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import '../App.css'
import { useAuth } from "../context/auth-context";


const Sidebar = ({ isOpen }) => {
  const {logout} = useAuth()
  const [activebutton, setActiveButton] = useState(2);
  useEffect(() => {
    if (location.pathname === "/home") setActiveButton(1);
    else if (location.pathname === "/create-client") setActiveButton(2);
  }, [location.pathname]);
  return (
    <div className="">
      {isOpen && (
        <div className="absolute z-10 w-2/3 lgss:w-1/6 flex flex-col border-r font-lexend border-[#FF8C42] shadow-lg pt-[5%] shadow-gray-400/50 h-full justify-start px-4 items-start bg-white">
          <div className=" w-full h-full pb-6 flex flex-col gap-3 justify-between items-center">
            <div className="flex flex-col gap-3 w-full">
            <Link
              to="/home"
              className={
                activebutton === 1
                  ? "flex justify-between text-[20px] text-white items-center font-bold  rounded-full px-4 bg-primary w-full h-[60px]"
                  : "flex justify-between text-[20px] text-[#6B7276] items-center font-bold  px-4  w-full h-[60px]"
              }
            >
              <h4 className="">Dashboard</h4>
              <FaHome className="text-[24px]" />
            </Link>
            <Link
              to="/create-client"
              className={
                activebutton === 2
                  ? "flex justify-between text-[20px] text-white items-center font-bold  rounded-full px-4 bg-primary w-full h-[60px]"
                  : "flex justify-between text-[20px] text-[#6B7276] items-center font-bold  px-4  w-full h-[60px]"
              }
            >
              <h4 className="">Clients</h4>
              <BiSolidUserCircle className="text-[24px]" />
            </Link>

            <button
              onClick={logout}
              className="flex mt-20 border-none justify-between text-[20px] text-[#B82323] items-center  font-bold  px-4  w-full "
            >
              Logout
              <HiOutlineLogout className="text-[24px]" />
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
