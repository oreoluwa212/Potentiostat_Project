import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";
import '../../src/App.css'


const CreateClientsPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex h-screen">
        {isOpen && (
          <div className="overlay" onClick={() => setIsOpen(false)}></div>
        )}
        <div
          className={`flex flex-col w-full ${isOpen ? "overflow-hidden" : ""}`}
        >
          <div className=" w-full px-[5%] bg-[#D9D9D9]">
            <div className=" ">
              <div className="h-[100px] flex justify-between items-center">
                {isOpen ? (
                  <FaTimes
                    onClick={() => setIsOpen(false)}
                    className=" cursor-pointer text-red-800 mds:text-[40px]"
                  />
                ) : (
                  <GiHamburgerMenu
                    onClick={() => setIsOpen(true)}
                    className="text-primary cursor-pointer mds:text-[40px]"
                  />
                )}
                <h1 className="text-primary font-semibold mds:text-[40px] leading-10 text-center">
                  AJAYI OREOLUWA'S POTENTIOSTAT
                </h1>
                <a href="#" className="text-green">
                  Link established
                </a>
              </div>
            </div>
          </div>
  
          <div className="flex relative h-full">
            <Sidebar isOpen={isOpen} />

          </div>
        </div>
      </div>
    );
}

export default CreateClientsPage