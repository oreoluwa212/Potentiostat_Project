import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { API_URL } from "../constants";
import axios from "axios";
import { useAuth } from "../context/auth-context";
import { json } from "react-router";

const NewClient = ({ setOpenModal, setRefreshCount }) => {
  const { token } = useAuth();
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const clients = [];

  const validateEmail = (username, password) => {
    // check if email is empty
    if (!username) {
      setError("Kindly tell us your username");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    if (!password) {
      setError("We need your password to proceed");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(username, password)) {
      return;
    }
    if (!loader) {
      setLoader(true);
      axios
        .post(
          `${API_URL}api/v1/clients`,
          {
            identifier: username,
            secret: password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((r) => {
          clients.push(r.data)
          localStorage.setItem("clients" , JSON.stringify(clients));
          setLoader(false);
          setSuccess(`A new user has been created with name ${username}`);
          setRefreshCount((prev) => prev+1);
          setTimeout(() => {
            setSuccess("");
            setOpenModal((prev) => !prev);
          }, 2500);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };
  return (
    <div className="inset-0 fixed w-full flex justify-center items-center backdrop-blur-sm bg-[#000000] bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg shadow-black/30 w-10/12 mds:w-1/2 flex flex-col p-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-semibold text-[22px]">Add a Client</h1>
          <FaTimes
            onClick={() => setOpenModal((prev) => !prev)}
            className="text-[18px] cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <label htmlFor="address">Username</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent border-primary border-[1px] rounded-[8px]  py-3 px-4"
          />
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <label htmlFor="address">Password</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-primary border-[1px] rounded-[8px] py-3 px-4"
          />
        </div>
        {success && (
          <div className="bg-green w-full  text-white text-[13px] rounded-xl justify-start items-center gap-4 flex p-3 font-bold mt-4">
            <FaRegCheckCircle className="text-xl" />
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-600 w-full  text-white text-[13px] rounded-xl justify-start items-center gap-4 flex p-3 font-bold mt-4">
            <BiErrorCircle className="text-xl" />
            {error}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-primary text-white mt-6 py-2"
        >
          {loader ? <ClipLoader color="#ffffff" /> : "Connect"}
        </button>
      </div>
    </div>
  );
};

export default NewClient;
