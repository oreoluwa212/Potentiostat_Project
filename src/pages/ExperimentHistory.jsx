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
          <div className=" w-full flex flex-col items-center pt-5 gap-8">
            <div className="flex lgss:flex-row flex-col gap-5 justify-between items-baseline w-3/5">
              <input
                type="text"
                className="bg-[#D9D9D9] lgss:w-[40%] w-full border-primary border-[1px] px-2 outline-none rounded-[8px] py-4"
                placeholder="Search Clients"
              />
            </div>
            <div className="bg-white rounded-lg shadow-2xl shadow-black/30 mb-5 lgss:w-[60%] w-[90%] h-full flex flex-col justify-between pt-7 ">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-[1px] border-gray-300">
                    <th className="">Date</th>
                    <th>Time</th>
                    <th>Client</th>
                  </tr>
                </thead>
                <tbody>
                  <input type="checkbox" />

                  <tr className="border-b-[1px] border-gray-300">
                    <td className="py-2 ">03/03/2024</td>
                    <td>03:00</td>
                    <td>raspberry-pi</td>
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
