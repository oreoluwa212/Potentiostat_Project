import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";

useNavigate;
const CreateNewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
    const [error, setError] = useState("");
  const validateEmail = (username, token, password, confirmPassword) => {
    //check if last name is empty
    if (!token) {
      setError("You need to enter your token to proceed");
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

    if (
      !validateEmail(
        username,
        token,
        confirmPassword,
        password
      )
    ) {
      return;
    }
    if (!loader) {
      setLoader(true);
      axios
        .post(`${API_URL}/auth/reset-password`, {
          username,
          token,
          password,
          confirmPassword,
        })
        .then((r) => {
          setLoader(false);
          navigate("/home");
          console.log(r);
        })
        .catch((e) => {
          setLoader(false);
          console.log(e);
        });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="bg-[#fafafa] shadow-xl shadow-gray-500/80 w-2/3 ">
        <div className=" flex flex-col gap-10 justify-center items-center h-[500px]">
          <div className="">
            <h1 className="text-primary font-bold text-[30px]">
              Create a New Password
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mds:w-[90%] lgss:w-[60%] w-[100%] justify-between flex flex-col lgssgap-6 gap-3 "
          >
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
                  className="h-[50px] w-full mt-1 px-[16px] font-medium border-[1px] rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-[#3B3F42] font-bold text-[16px]">
                Token
              </label>
              <label className="relative  flex items-center ">
                <input
                  type= "text"
                  value={token}
                  placeholder="Enter Your Password"
                  onChange={(e) => setToken(e.target.value)}
                  name="token"
                  className="h-[50px] w-full mt-1 px-[16px] font-medium border-[1px] rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
                />
              </label>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-[#3B3F42] font-bold text-[16px]">
                Password
              </label>
              <label className="relative  flex items-center ">
                <input
                  type={viewPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="h-[50px]   w-full mt-1 px-[16px] font-medium border-[1px] rounded-lg border-primary outline-none bg-white text-[#3B3F42] placeholder:text-[#ADADAD] transition duration-200"
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
