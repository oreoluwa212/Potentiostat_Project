import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../context/auth-context";
import { FaRegCheckCircle } from "react-icons/fa";

const Login = () => {
  const location = useLocation();
  const { state } = location;
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const { from = "/home" } = state || {};
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

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
        .post(`${API_URL}api/v1/auth/login`, {
          username,
          password,
        })
        .then((r) => {
          setLoader(false);
          setSuccess("You have succesfully logged in");
          setTimeout(() => {
            authenticate(r.data.access_token);
            setSuccess("");
            navigate(from);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setTimeout(() => {
            setError("");
          }, 3000);
          setLoader(false);
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
            <label className="text-[#3B3F42] font-bold text-[16px] ">
              Username
            </label>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
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
            <div className="bg-red-600 w-full  text-white text-[14px] rounded-xl justify-start items-center gap-2 flex h-[48px] p-3 font-bold mt-4">
              <BiErrorCircle className="text-xl" />
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green w-full  text-white text-[13px] rounded-xl justify-start items-center gap-4 flex p-3 font-bold mt-4">
              <FaRegCheckCircle className="text-xl" />
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full h-[52px] mt-8 rounded-lg bg-primary  text-[16px] text-white"
          >
            {loader ? <ClipLoader color="#ffffff" /> : "Login"}
          </button>
          <h4 className="font-manrope  text-[#645D5D] font-medium text-[15px] text-center mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                navigate("/signup");
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
