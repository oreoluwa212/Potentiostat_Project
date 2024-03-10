import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import ClipLoader from "react-spinners/ClipLoader"


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false)
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [viewPassword, setViewPassword] = useState(false);
  const validateEmail = (email, password) => {
    // check if email is empty
    if (!email) {
      setError("Kindly tell us your mail");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    // const emailRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // if (!emailRegex.test(email)) {
    //   setError("Your email is not in the correct format");
    //   setTimeout(() => {
    //     setError("");
    //   }, 6000);
    //   return false;
    // }
    // check if password is empty
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

    if (!validateEmail(email, password)) {
      return;
    }
    if(!loader){
      setLoader(true)
      axios
        .post(`${API_URL}api/v1/auth/login`, {
          "username": email,
          password
        })
        .then((r) => {
          setLoader(false)
          navigate("/home")
          console.log(r);
        })
        .catch((e) => {
          setLoader(false)
          console.log(e);
        });

    }
  };
  return (
    <div className="font-lexend w-full flex flex-col justify-center items-center">
      <div className="mds:w-2/3 lgss:w-1/2 w-full pt-6 px-16 pb-12 bg-white shadow-2xl shadow-gray-500/80 rounded-[32px]">
        <h4 className="text-[36px] text-center font-bold text-primary">
          Welcome back!
        </h4>
        <h4 className="text-[16px] text-center text-[#645D5D]">
          Log in to your account and get tutored.
        </h4>
        <form className="w-full px-8 mt-2 pt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">

          <label className="text-[#3B3F42] font-bold text-[16px] ">Email</label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="h-[50px] w-full mt-1 px-[16px] font-medium border-[1px] mb-6 rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
          />
          </div>
          <div className="flex flex-col w-full">

          <label className="text-[#3B3F42] font-bold text-[16px]">
            Password
          </label>
          <label className="relative  flex items-center ">
            <input
              type={viewPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="h-[50px]   w-full mt-1 px-[16px] font-medium border-[1px] rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
            />
            {!viewPassword ? (
              <AiOutlineEyeInvisible
                className="text-3xl -ml-10 mt-[5px] text-[#3B3F42] placeholder:text-[#ADADAD]"
                onClick={() => setViewPassword((prev) => !prev)}
              />
            ) : (
              <AiOutlineEye
                className="text-3xl -ml-10 mt-[5px] text-[#3B3F42] placeholder:text-[#ADADAD]"
                onClick={() => setViewPassword((prev) => !prev)}
              />
            )}
          </label>
          </div>
          <h2
            onClick={() => navigate("/forgot-password")}
            className=" mt-4 cursor-pointer text-right font-bold font-manrope text-red-600"
          >
            Forgot password?
          </h2>
          {error && (
            <div className="bg-red-600 w-full  text-white text-[14px] rounded-xl justify-start items-center gap-2 flex h-[48px] px-2 font-bold mt-4">
              <BiErrorCircle className="text-xl" />
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full h-[52px] mt-8 rounded-lg bg-primary  text-[16px] text-white"
          >
            {loader? <ClipLoader color="#ffffff" />:"Login"}
            
          </button>
          <h4 className="font-manrope  text-[#645D5D] font-medium text-[15px] text-center mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                navigate("/");
              }}
              className=" text-primary font-bold cursor-pointer"
            >
              Create an account
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
