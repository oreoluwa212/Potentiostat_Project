import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { API_URL } from "../constants";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const validateEmail = (
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword
  ) => {
    //check if first name is empty
    if (!firstName) {
      setError("You need to tell us your first name to proceed");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    //check if last name is empty
    if (!lastName) {
      setError("You need to tell us your last name to proceed");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    //check if username is empty
    if (!username) {
      setError("You need to tell us your username to proceed");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    // check if email is empty
    if (!email) {
      setError("kindly add your email");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    // check if email is in the correct format using a regular expression
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      setError("Your email is not in the correct format");
      setTimeout(() => {
        setError("");
      }, 6000);
      return false;
    }

    // check if password is empty
    if (!password) {
      setError("kindly add your desired password");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

    if (!passwordRegex.test(password.trim())) {
      setError(
        "Password must contain atleast 8 characters, 1 uppercase, 1 digit, 1 lowercase and 1 special character"
      );
      setTimeout(() => {
        setError("");
      }, 6000);
      return false;
    }
    // check if confirmed password is empty
    if (!confirmPassword) {
      setError("Retype your password in the field above");
      setTimeout(() => {
        setError("");
      }, 5000);
      return false;
    }

    if (confirmPassword !== password) {
      setError("Oops!!! Your passwords do not match");
      setTimeout(() => {
        setError("");
      }, 6000);
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(firstName, lastName, username, email, confirmPassword, password)) {
      return;
    }
    if(!loader){
      setLoader(true)
      axios
        .post(`${API_URL}api/v1/users`, {
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword
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
    <div className="bg-white font-lexend w-full mt-5 flex flex-col gap-8 justify-center items-center">
      <div className="mds:w-2/3  px-16 pt-6 pb-6 bg-white shadow-2xl shadow-gray-500/80 rounded-lg">
        <h4 className="text-[36px] text-center font-extrabold text-primary">
          Welcome to Ajayi's Project!
        </h4>
        <h4 className="text-[16px] text-center text-[#645D5D]">
          Create an account and get started.
        </h4>
        <form className="w-full px-8 mt-2 pt-4" onSubmit={handleSubmit}>
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex flex-col w-full">
              <label className="text-[#3B3F42] font-bold text-[16px]  ">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                name="name"
                className="h-[50px]   w-full mt-1 px-[16px] font-medium border-[1px] mb-4 rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
              />
            </div>
          </div>
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex flex-col w-full">
              <label className="text-[#3B3F42] font-bold text-[16px]  ">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                name="name"
                className="h-[50px]   w-full mt-1 px-[16px] font-medium border-[1px] mb-4 rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
              />
            </div>
          </div>

          <div className="flex w-full justify-between items-center gap-2">
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
          </div>

          <div className="flex flex-col w-full">
            <label className="text-[#3B3F42] font-bold text-[16px] ">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              name="email"
              className="h-[50px]   w-full mt-1 px-[16px] font-medium border-[1px] mb-4 rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
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
                className="h-[50px]   w-full mt-1 px-[16px] font-medium mb-4 border-[1px] rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
              />
              {!viewPassword ? (
                <AiOutlineEyeInvisible
                  className="text-3xl -ml-10 mb-2 text-[#ADADAD]"
                  onClick={() => setViewPassword((prev) => !prev)}
                />
              ) : (
                <AiOutlineEye
                  className="text-3xl -ml-10 mb-2 text-[#ADADAD]"
                  onClick={() => setViewPassword((prev) => !prev)}
                />
              )}
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[#3B3F42] font-bold text-[16px]">
              Confirm Password
            </label>
            <label className="relative  flex items-center ">
              <input
                type={viewConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirm-password"
                className="h-[50px]   w-full mt-1 px-[16px] font-medium border-[1px] rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
              />
              {!viewConfirmPassword ? (
                <AiOutlineEyeInvisible
                  className="text-3xl -ml-10 mt-[5px] text-[#ADADAD]"
                  onClick={() => setViewConfirmPassword((prev) => !prev)}
                />
              ) : (
                <AiOutlineEye
                  className="text-3xl -ml-10 mt-[5px] text-[#ADADAD]"
                  onClick={() => setViewConfirmPassword((prev) => !prev)}
                />
              )}
            </label>
            {error && (
              <div className="bg-red-600 w-full  text-white text-[14px] rounded-xl justify-start items-center gap-2 flex h-[55px] p-2 font-bold mt-4">
                <BiErrorCircle className="text-xl" />
                {error}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-[52px] mt-8 rounded-lg bg-primary  text-[16px] text-white"
          >
            {loader ? <ClipLoader color="#ffffff" /> : "Sign Up"}
          </button>
          <h4 className="font-manrope  text-[#645D5D] font-medium text-[15px] text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => {
                navigate("/home");
              }}
              className=" text-primary font-bold cursor-pointer"
            >
              Log in
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
