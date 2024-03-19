import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp, FaArrowRight, FaPlus, FaTimes } from "react-icons/fa";
import "../../src/App.css";
import { Link } from "react-router-dom";

const ExperimentHistory = () => {
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
              <div className="flex gap-3 justify-center items-center">
                <a href="#" className="text-primary">
                  pi-ajayi
                </a>
                <FaAngleDown />
              </div>
            </div>
          </div>
        </div>

        <div className="flex relative h-full">
          <Sidebar isOpen={isOpen} />
          <div className="-5 w-full flex flex-col  items-center pt-5 gap-8">
            <div className="flex justify-between items-baseline w-3/5">
              <input
                type="text"
                className="bg-[#D9D9D9] w-[40%] border-primary border-[1px] pl-6 outline-none rounded-[8px] h-[60px]"
                placeholder="Search Clients"
              />
              <button className="text-white bg-primary w-[120px] h-[40px] inline-flex justify-between px-2 items-center">
                <FaPlus /> New Client
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-2xl shadow-black/30 mb-5 w-1/3 h-full flex flex-col justify-between p-7 ">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-[1px] border-gray-300">
                    <th className="">Date</th>
                    <th>Time</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  <input type="checkbox" />

                  <tr className="border-b-[1px] border-gray-300">
                    <td className="py-2 ">03/03/2024</td>
                    <td>03:00</td>
                    <td>Mild Steel 1</td>
                    <Link to={"/experiment-details"}>
                      <td>
                        <FaArrowRight />
                      </td>
                    </Link>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentHistory;
