import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const validateUser = (username) => {
    //check if username is empty
    if (!username) {
      setError("You need to tell us your username to proceed");
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

    if (!validateUser(username)) {
      return;
    }
    if (!loader) {
      setLoader(true);
      axios
        .post(`${API_URL}api/v1/auth/forgot-password`, {
          username,
        })
        .then((r) => {
          setLoader(false);
          navigate("/new-password");
          console.log(r);
        })
        .catch((e) => {
          setLoader(false);
          console.log(e);
        });
    }
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center ">
        <div className="bg-[#fafafa] shadow-2xl shadow-gray-500/80 w-2/3 ">
          <div className=" flex flex-col gap-10 justify-center items-center h-[500px]">
            <div className="flex flex-col mds:gap-4 lgss:items-center">
              <h1 className="text-primary font-extrabold text-[28px]">
                Reset Your Password
              </h1>
              <h3 className="lgss:text-[16px] mds:text-black text-gold font-semibold">
                Enter your details and we will send you a token to reset your
                password
              </h3>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mds:w-[90%] lgss:w-[60%] w-[100%] justify-between mds:flex mds:flex-col mds:gap-6"
            >
              <div>
                <div className="flex flex-col w-full">
                  <label className="text-[#3B3F42] font-bold text-[16px]  ">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    name="name"
                    className="h-[50px]   w-full mt-1 px-[16px] font-medium border-[1px] mb-4 rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="h-[48px] mt-6 mds:mt-8 w-[100%] mds:w-[100%] flex justify-center items-center bg-primary text-white rounded-[32px] text-[1.2rem]"
                >
                  {loader ? <ClipLoader color="#ffffff" /> : "Submit Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
