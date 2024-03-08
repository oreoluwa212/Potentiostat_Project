import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

useNavigate;
const CreateNewPassword = () => {
  const location = useLocation();
  let userId = "";
  if (location.search) {
    userId = location.search.slice(1);
  }
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="bg-[#fafafa] shadow-2xl shadow-gray-500/80 w-1/3 ">
      <div className=" flex flex-col gap-10 justify-center items-center h-[500px]">
            <div className="">
              <h1 className="text-primary font-bold text-[30px]">
                Create a New Password
              </h1>
            </div>
            <form
              className="mds:w-[90%] lgss:w-[60%] w-[100%] justify-between flex flex-col lgssgap-6 gap-3 "
            >
              <div className="">
                <label htmlFor="NewPassword" className="font-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  name="NewPassword"
                  onChange={(e) => {
                    setPasword(e.target.value);
                  }}
                  className="h-[48px] mds:w-[100%] w-[100%] justify-center items-center bg-transparent border-primary border-[1px] placeholder:text-gold pl-4 rounded-[32px] text-[1rem] outline-none"
                  placeholder="Enter New Password"
                />
              </div>
              <div className="">
                <label htmlFor="ConfirmPassword" className="font-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="h-[48px] mds:w-[100%] w-[100%] justify-center items-center bg-transparent border-primary border-[1px] placeholder:text-gold pl-4 rounded-[32px] text-[1rem] outline-none"
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="submit"
                className="h-[48px] lgss:mt-6 mt-4 mds:mt-0 w-[100%] mds:w-[100%] flex justify-center items-center bg-primary text-white rounded-[32px] text-[1.2rem]"
              >
                Create New Password
              </button>
            </form>
          </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
