import React, { useState } from "react";
import Chart from "react-apexcharts";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";
import '../../src/App.css'
import mockData from '../components/MOCK_DATA.json'


const ExpDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2001, 2003,
          2004, 2006, 2008, 2011,
        ],
      },
    },
    series: [
      {
        name: "People Born",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 67, 26, 36, 19, 27, 75, 19],
      },
    ],
  });

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

        <div className="flex relative">
          <Sidebar isOpen={isOpen} />
          <div className="w-full h-full flex lgss:flex-row flex-col z-0">
            <div className="lgss:w-[53%] px-[5%] pt-6 flex flex-col gap-7">
              <div className="bg-white rounded-lg shadow-2xl shadow-black/20 h-[250px] mds:w-3/5 px-[5%] py-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Starting Voltage:
                  </p>
                  <div className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <p className="w-2/3 bg-transparent outline-none text-primary"></p>
                    <div className="flex items-center gap-4">
                      <p>V</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Stop Voltage:
                  </p>
                  <div className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <p className="w-2/3 bg-transparent outline-none text-primary"></p>
                    <div className="flex items-center gap-4">
                      <p>V</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Scan Rate:
                  </p>
                  <div className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <p className="w-2/3 bg-transparent outline-none text-primary"></p>
                    <div className="flex items-center gap-4">
                      <p>V</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-2xl shadow-black/30 mb-5 w-full flex flex-col justify-between">
                <div className="h-full pt-4 px-2">
                  <Chart
                    options={state.options}
                    series={state.series}
                    type="line"
                    width="100%"
                    height={"700px"}
                  />
                </div>
              </div>
            </div>

            <div className="lgss:w-[45%] pt-6 flex flex-col gap-10">
              <div className="bg-white rounded-lg shadow-2xl shadow-black/30 overflow-auto h-[500px] w-full p-3 py-3 flex flex-col justify-between">
                <div className="">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border-b-[1px] border-gray-300">
                        <th className="">S/N</th>
                        <th>Time</th>
                        <th>Voltage</th>
                        <th>Current (mA)</th>
                        <th>Current(A)</th>
                        <th>Natural Log</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.map((rowData, index) => (
                        <tr
                          className="border-b-[1px] border-gray-300"
                          key={index}
                        >
                          <td className="py-2 ">{rowData["S/N"]}</td>
                          <td>{rowData["Time"]}</td>
                          <td>{rowData["Voltage"]}</td>
                          <td>{rowData["Current (mA)"]}</td>
                          <td>{rowData["Current(A)"]}</td>
                          <td>{rowData["Natural Log"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpDetails;
