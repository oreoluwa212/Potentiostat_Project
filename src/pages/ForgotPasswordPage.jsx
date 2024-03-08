import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

useNavigate;
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    return (
      <div className="">
            <div className="flex flex-col justify-center items-center ">
      <div className="bg-[#fafafa] shadow-2xl shadow-gray-500/80 w-1/3 ">
      <div className=" flex flex-col gap-10 justify-center items-center h-[500px]">
    
              <div className="flex flex-col mds:gap-4 lgss:items-center">
                <h1 className="text-primary font-extrabold text-[28px]">
                  Reset Your Password
                </h1>
                <h3 className="lgss:text-[16px] mds:text-black text-gold font-semibold">
                  Enter your email address and we will send you a link to reset
                  your password
                </h3>
              </div>
              <form
                className="mds:w-[90%] lgss:w-[60%] w-[100%] justify-between mds:flex mds:flex-col mds:gap-6"
              >
                <div>
                  <input
                    type="text"
                    className="h-[48px] mt-5 mds:w-[100%] w-[100%] justify-center items-center bg-transparent border-primary border-[1px] placeholder:text-gold pl-4 rounded-[32px] text-[1rem] outline-none"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Link to={'/new-password'}>
                  <button
                    type="submit"
                    className="h-[48px] mt-6 mds:mt-8 w-[100%] mds:w-[100%] flex justify-center items-center bg-primary text-white rounded-[32px] text-[1.2rem]"
                  >
                    Submit Email
                  </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ForgotPasswordPage;
  