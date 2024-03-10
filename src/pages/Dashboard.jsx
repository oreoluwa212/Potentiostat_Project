import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";
import '../../src/App.css'


const Dashboard = () => {
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

        <div className="flex relative">
          <Sidebar isOpen={isOpen} />
          <div className="w-full h-full flex lgss:flex-row flex-col justify-between gap-4 z-0">
            <div className="lgss:w-[48%] px-[5%] pt-6 flex flex-col gap-7">
              <div className="bg-white rounded-lg shadow-2xl shadow-black/20 h-[260px] mds:w-3/5 px-[5%] py-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Starting Voltage:
                  </p>
                  <button className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <input
                      type="text"
                      className="w-2/3 bg-transparent outline-none text-primary"
                      placeholder="0.8764"
                    />
                    <div className="flex items-center gap-4">
                      <p>V</p>
                      <div className="flex flex-col gap-2">
                        <FaAngleUp />
                        <FaAngleDown />
                      </div>
                    </div>
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Stop Voltage:
                  </p>
                  <button className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <input
                      type="text"
                      className="w-2/3 bg-transparent outline-none text-primary"
                      placeholder="0.8764"
                    />
                    <div className="flex items-center gap-4">
                      <p>V</p>
                      <div className="flex flex-col gap-2">
                        <FaAngleUp />
                        <FaAngleDown />
                      </div>
                    </div>
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Scan Rate:
                  </p>
                  <button className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <input
                      type="text"
                      className="w-2/3 bg-transparent outline-none text-primary"
                      placeholder="10"
                    />
                    <div className="flex items-center gap-4">
                      <p>mV/s</p>
                      <div className="flex flex-col gap-2">
                        <FaAngleUp />
                        <FaAngleDown />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-2xl shadow-black/30 h-[500px] w-full px-[5%] py-3 flex flex-col justify-between">
                <h1>Chart</h1>
              </div>
            </div>

            <div className="lgss:w-[48%] px-[5%] pt-6 flex flex-col gap-10">
              <div className="bg-white rounded-lg shadow-2xl shadow-black/30 h-[450px] w-full px-[5%] py-3 flex flex-col justify-between">
                <h1>Table</h1>
              </div>
              <div className="w-full flex flex-col gap-10 justify-center items-center">
                <div className="w-[180px] h-[180px] rounded-[50%] shadow-green-lg flex justify-center items-center">
                  <button className="text-green text-[34px] font-bold">
                    START
                  </button>
                </div>
                <div className="flex justify-between items-center w-1/2">
                  <p className="text-primary font-semibold text-[18px]">
                    Running Time:
                  </p>
                  <button className="text-primary border-[1px] rounded-[16px] w-[150px] h-[50px] border-gray-400 font-bold text-[22px] italic px-4">
                    <p className="text-[20px]">00: 00: 00</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
