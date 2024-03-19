import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown, FaAngleUp, FaPlus, FaTimes } from "react-icons/fa";
import '../../src/App.css'
import { Link } from "react-router-dom";
import NewClient from "../components/NewClient";
import { useAuth } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../constants";
import { ClipLoader } from "react-spinners";


const CreateClientsPage = () => {
  const {token} = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [clients, setClients] = useState([])
    const [loader, setLoader] = useState(false)
    const [refreshCount, setRefreshCount] = useState(0)

    useEffect(() => {
 if (!loader) {
   setLoader(true);
   axios
     .get(
       `${API_URL}api/v1/clients/`,
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     )
     .then((r) => {
       setLoader(false);
      setClients(r.data.content)
     })
     .catch((error) => {
       console.log(error);
       setLoader(false);
     });
 }
    }, [token, refreshCount])

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
                <button
                  onClick={() => setOpenModal((prev) => !prev)}
                  className="text-white bg-primary w-[120px] h-[40px] inline-flex justify-between px-2 items-center"
                >
                  <FaPlus /> New Client
                </button>
              </div>
              <div className="bg-white rounded-lg  border-2 border-gray-200 shadow-xl mb-5 w-10/12 md:w-2/3 lgss:w-1/2 h-[300px] overflow-auto p-4 ">
                {loader ? (
                  <div className="w-full flex justify-center items-center mt-6">
                    <ClipLoader color="#000000"  />
                  </div>
                ) : (
                  <div className="w-full">
                    {clients.length >= 1 ? (
                      <div className="w-full grid grid-cols-2 gap-2 mds:grid-cols-3 md:grid-cols-4">
                        {clients.map((client, index) => (
                          <Link key={index} >
                            <div className="bg-white rounded-lg shadow-lg shadow-black/20 h-[100px] mds:w-[120px] flex flex-col justify-center items-center">
                              <p className="text-primary font-semibold">
                                {client.identifier}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <h4>No available clients</h4>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {openModal && <NewClient setRefreshCount={setRefreshCount} setOpenModal={setOpenModal} />}
      </div>
    );
}

export default CreateClientsPage