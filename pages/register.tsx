import axios from "axios";
import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";

const Register: NextPage = () => {
  const [username, setUsername] = useState<String>("");
  const [firstname, setFirstname] = useState<String>("");
  const [lastname, setLastname] = useState<String>("");
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
    if (username && firstname && lastname && email && password) {
      setComplete(false);
      const document = {
        firstName: firstname,
        lastName: lastname,
        username: username,
        email: email,
        password: password,
      };
      const data = await axios.post(
        `/api/auth/register`,
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
      <form className="rounded px-8 pt-6 w-full md:w-[25rem] pb-8 mb-4 bg-neutral-900 border-2 border-neutral-800 flex flex-col gap-6 text-white">
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
                    className="p-2 w-full rounded outline-none bg-neutral-700 focus:bg-neutral-800 ease-in-out duration-300"
          placeholder="first name"
        />
        <input
          onChange={(e) => setLastname(e.target.value)}
          type="text"
                    className="p-2 w-full rounded outline-none bg-neutral-700 focus:bg-neutral-800 ease-in-out duration-300"
          placeholder="lastname"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
                    className="p-2 w-full rounded outline-none bg-neutral-700 focus:bg-neutral-800 ease-in-out duration-300"
          placeholder="username"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
                    className="p-2 w-full rounded outline-none bg-neutral-700 focus:bg-neutral-800 ease-in-out duration-300"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
                    className="p-2 w-full rounded outline-none bg-neutral-700 focus:bg-neutral-800 ease-in-out duration-300"
          placeholder="password"
        />
        <button
          onClick={(e) => register(e)}
          className="bg-neutral-700 hover:bg-neutral-800 rounded p-2 text-white ease-in-out duration-300"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            "Submit"
          )}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">Already have an account?</span>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
