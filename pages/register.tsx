/**
 * ? Register function
 * @author "Sebastian Pavel"
 * @date january 2023
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
/**
 *
 * @returns
 */
import { AiOutlineExclamationCircle, AiOutlineSend } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";

const Register: NextPage = () => {
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [complete, setComplete] = useState<Boolean>(false);
  const [created, setCreated] = useState<Boolean>(false);
  const [someIssue, setSomeIssue] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [typing, setTyping] = useState<Boolean>(false);

  useEffect(() => {
    email.length !== 0 && password.length !== 0 && username.length !== 0
      ? setTyping(true)
      : setTyping(false);
    typing
      ? () => {
          setSomeIssue(false);
        }
      : null;
  }, [password, email]);

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
    if (username && email && password) {
      setComplete(false);
      const document = {
        username: username,
        email: email,
        password: password,
      };
      const data = await axios.post(`/api/auth/register`, document);
      if (data.data.status === 403) {
        setSomeIssue(true);
        setErrorMessage(data.data.message);
      } else {
        setSomeIssue(false);
        setCreated(true);
      }
    } else {
      setComplete(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 2,
          type: "fade",
        }}
        className="w-full flex justify-center"
      >
        {created ? (
          <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2,
            type: "fade",
          }}
          className="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:container">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Email confirmation
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    We have sent you a confirmation email.
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Please open your inbox, have a look for the email and click
                    the button inside, we are waiting for you to join!
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Link href="https://mail.google.com/">
                    <button
                      type="button"
                      className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center contrast ring-2 ring-neutral-900 hover:ring-yellow-400 movement"
                    >
                      Open my inbox.
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <form className="shadow-md dark:shadow-black rounded px-8 pt-6 w-full md:w-[25rem] pb-8 mb-4 dark:bg-neutral-900 dark:border  dark:border-black flex flex-col gap-2  bg-[#F2F2F2] shadow-[#181818]/30">
            {complete || someIssue ? (
              <div className="flex items-center gap-2 mb-4 border-b-2 pb-4 border-neutral-800">
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
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
                placeholder=" "
                autoComplete="adsas"
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Username
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                type="text"
                className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
                placeholder=" "
                autoComplete="adsas"
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
                placeholder=" "
                autoComplete="adsas"
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
            {isLoading ? (
              <div className="w-full flex">
                <div className="loader"></div>
              </div>
            ) : (
              <motion.div className="flex">
                <motion.button
                  onClick={(e) => register(e)}
                  initial={{ x: -100 }}
                  transition={{
                    duration: 100,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  animate={{
                    x: typing ? 10 : -100,
                    opacity: typing ? 1 : 0,
                  }}
                  className={`text-yellow-400 w-fit rounded-full text-2xl`}
                >
                  <AiOutlineSend />
                </motion.button>
                <motion.span
                  transition={{
                    duration: 100,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  animate={{
                    opacity: typing ? 0 : 1,
                  }}
                  className="text-yellow-500 ml-[5rem]"
                >
                  {typing ? "" : "Please complete!"}
                </motion.span>
              </motion.div>
            )}
            <div className="flex items-center gap-2 border-t-2 pt-4 border-neutral-800 mt-2">
              <Link href="/login">
                <button className="flex items-center gap-2 opacity-50 hover:opacity-100 ease-in-out duration-300">
                  <BiLogIn />
                  Login
                </button>
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
