import axios from "axios";
import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Register: NextPage = () => {
  const [username, setUsername] = useState<String>("");
  const [firstname, setFirstname] = useState<String>("");
  const [lastname, setLastname] = useState<String>("");
  const [eventcode, setEventCode] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [complete, setComplete] = useState<Boolean>(false);
  const [created, setCreated] = useState<Boolean>(false);
  const [someIssue, setSomeIssue] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const router = useRouter();
  /**
   *
   * @param {*}
   * Registration function, check if everything is completed.
   * Making the post request after passing the initial step.
   * Returns messages, if error, error is displayed on the screen using jsx.
   */
  const register = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (username && firstname && lastname && email && password && eventcode) {
      setComplete(false);
      const document = {
        firstName: firstname,
        lastName: lastname,
        username: username,
        email: email,
        password: password,
        eventCode: eventcode,
      };
      const data = await axios.post(
        "http://localhost:3000/api/auth/register",
        document
      );
      if (data.data.status === 403) {
        console.log(data.data);
        setSomeIssue(true);
        setErrorMessage(data.data.message);
      } else {
        setSomeIssue(false);
        setCreated(true);
        console.log(data);
        setTimeout(() => router.replace("/login"), 6000);
      }
    } else {
      setComplete(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white">
      <h1 className="w-full justify-center flex mb-[10rem] text-4xl text-neutral-500">
        {created ? "Congrats, account created successfuly!" : "Register"}
      </h1>
      <form className="flex flex-col gap-2 border-2 border-neutral-900 shadow-md shadow-neutral-500 p-2">
        {complete || someIssue ? (
          <div className="flex items-center gap-2">
            <AiOutlineExclamationCircle className="text-red-500 text-4xl" />
            <p className="text-red-500">
              {complete
                ? "Please, just complete all the fields!"
                : someIssue
                ? errorMessage
                : null}
            </p>
          </div>
        ) : null}
        <input
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="first name"
        />
        <input
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="lastname"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="username"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="password"
        />
        <input
          onChange={(e) => setEventCode(e.target.value)}
          type="text"
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="event code"
        />
        <button
          onClick={(e) => register(e)}
          className="border-2 border-neutral-800 p-2 text-white hover:border-orange-400 ease-in-out duration-300"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
