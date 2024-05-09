import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";
import "../../src/App.css";
import mockData from "../components/MOCK_DATA.json";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../constants";

const ExpDetails = () => {
  let experiment = {};
  if (useLocation().state) {
    experiment = useLocation().state.experiment;
  }
  const { token } = useAuth();
  const [measurements, setMeasurement] = useState([]);
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
  function convertEpochToUTCDate(epochTimestamp) {
    // Create a new Date object from the epoch timestamp
    const date = new Date(epochTimestamp * 1000);  // Convert to milliseconds by multiplying by 1000

    // Return the UTC date and time in 'YYYY-MM-DD HH:MM:SS' format
    return date.toISOString().replace('T', ' ').substring(0, 19);
}
  const getExperimentMeasurement = async () => {
    try {
      let { data } = await axios.get(`${API_URL}/experiments/${experiment.id}/measurements`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      
      setMeasurement(data);
    } catch (error) { 
      console.log('c', error)
    }
  }
  useEffect(() => {
    console.log('Effect running', { token, experiment });
    getExperimentMeasurement();
  }, []);

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
                      <p>{experiment.start_voltage} V</p>
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
                      <p>{experiment.end_voltage} V</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Voltage Step:
                  </p>
                  <div className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <p className="bg-transparent outline-none text-primary"></p>
                    <div className="flex items-center gap-4">
                      <p>{experiment.voltage_step} V</p>
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
                        <th>Log</th>
                      </tr>
                    </thead>
                    <tbody>
                      {measurements.map((rowData, index) => (
                        <tr
                          className="border-b-[1px] border-gray-300"
                          key={index}
                        >
                          <td className="py-2 ">{rowData["id"]}</td>
                          <td>{convertEpochToUTCDate(rowData["timestamp"])}</td>
                          <td>{rowData["voltage"]}</td>
                          <td>{rowData["current"]}</td>
                          <td>{(rowData["current"]) / 1000}</td>
                          <td>{Math.log(rowData["current"])}</td>
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
