import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";
import "../../src/App.css";
import axios from "axios";
import { API_URL } from "../constants";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState("");
  const [stop, setStop] = useState("");
  const [scan, setScan] = useState("");
  const [runningTime, setRunningTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [experimentRunning, setExperimentRunning] = useState(false);
  let currentExperiment = {};
  const navigate = useNavigate();
  let clientId = "";
  if (useLocation().state) {
    clientId = useLocation().state.clientId;
  }

  const startExperiment = async () => {
    try {
      if (!start || !stop || !scan) {
        alert(
          "Enter the starting voltage, the stop voltage, and scan rate to proceed"
        );
      } else {
        if (experimentRunning) {
          if (
            window.confirm(
              "Experiment is already running. Are you sure you want to stop?"
            )
          ) {
            clearInterval(timerId);
            setRunningTime(0);
            setExperimentRunning(false);
            setTimerId(null);
          }
        } else {
          // Start the running time
          const id = setInterval(() => {
            setRunningTime((prevTime) => prevTime + 1);
          }, 1000);
          setTimerId(id);

          // Other logic to send data to the backend
          const data = {
            client_id: clientId,
            start_voltage: start,
            end_voltage: stop,
            voltage_step: scan,
          };
          setExperimentRunning(true);
          const response = await axios.post(
            `${API_URL}/experiments`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          currentExperiment = response.data;
          localStorage.setItem(
            "running_experiment",
            JSON.stringify(currentExperiment)
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopExperiment = () => {
    if (window.confirm("Are you sure you want to stop the experiment?")) {
      clearInterval(timerId);
      setRunningTime(0);
      setExperimentRunning(false);
      setTimerId(null);
      // Add logic to navigate to ExperimentDonePage
      currentExperiment = JSON.parse(
        localStorage.getItem("running_experiment")
      );
      axios
        .put(
          `${API_URL}/experiments/${currentExperiment.id}/stop`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      /*
this nt working yet something with the BE I guesss
      axios
        .get(
          `${API_URL}/api/v1/experiments/${currentExperiment.id}/measurements`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          save the res.data in a state so it will  accessible in the home route
          // navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
*/
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen">
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}
      <div
        className={`flex flex-col w-full ${isOpen ? "overflow-hidden " : ""}`}
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
        <div className="flex px-[5%] pt-4 text-primary font-semibold italic">
          <Link to={`/client-history/${clientId}`} state={{ clientId }}>
            <h1>View past experiments</h1>
          </Link>
        </div>
        <div className="flex relative">
          <Sidebar isOpen={isOpen} />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full h-full flex lgss:flex-row flex-col z-0"
          >
            <div className="lgss:w-[53%] px-[5%] pt-6 flex flex-col gap-7">
              <div className="bg-white rounded-lg shadow-2xl shadow-black/20 h-[250px] mds:w-3/5 px-[5%] py-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <p className="text-primary text-[18px] font-semibold">
                    Starting Voltage:
                  </p>
                  <button className="border-[1px] rounded-[16px] border-gray-500 w-[140px] h-[60px] flex justify-between items-center px-3">
                    <input
                      onChange={(eve) => {
                        setStart(eve.target.value);
                      }}
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
                      onChange={(eve) => {
                        setStop(eve.target.value);
                      }}
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
                      onChange={(eve) => {
                        setScan(eve.target.value);
                      }}
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
            </div>

            <div className="lgss:w-[45%] pt-6 flex flex-col gap-10">
              <div className="w-full flex flex-col gap-10 justify-center items-center">
                <div
                  onClick={experimentRunning ? stopExperiment : startExperiment}
                  className={`shadow-${
                    experimentRunning ? "red" : "green"
                  }-lg w-[180px] h-[180px] rounded-[50%] bg-white border flex justify-center items-center`}
                >
                  <button
                    className={`text-${
                      experimentRunning ? "red" : "green"
                    } text-[34px] font-bold`}
                  >
                    {experimentRunning ? "STOP" : "START"}
                  </button>
                </div>
                <div className="flex justify-between items-center w-1/2">
                  <p className="text-primary font-semibold text-[18px]">
                    Running Time:
                  </p>
                  <button
                    onClick={stopExperiment}
                    className="text-primary border-[1px] rounded-[16px] w-[150px] h-[50px] border-gray-400 font-bold text-[22px] italic px-4"
                  >
                    <p className="text-[20px]">{formatTime(runningTime)}</p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
