/**
 * ? Send email with the generated link to change the password.
 * @author "Sebastian Pavel"
 * @date January 2023
 */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineSend } from "react-icons/ai";
import Head from "next/head";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState<String>("");
  const [typing, setTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<String>("");
  const [errorMessage, setErrorMessage] = useState<String>("");

  useEffect(() => {
    email.length !== 0 ? setTyping(true) : setTyping(false);
    email.length === 0 ? setErrorMessage("") : null;
  }, [email]);

  const sendReq = async (e: any) => {
    setIsLoading(true);
    try {
      const data = await axios({
        method: "POST",
        url: `/api/auth/resetPassword`,
        data: {
          email: email,
        },
      });
      console.log(data);
      setSuccess("We have sent you an email.");
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message);
      console.log(error);
    }
        setIsLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Head>
        <title>Reset password</title>
      </Head>
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
          damping: 10,
          stiffness: 100,
        }}
        className="container w-full lg:w-1/2 pt-10 px-10 pb-4 rounded-md overflow-hidden"
      >
        <div className="relative z-0 w-full mb-2 group">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
            placeholder=" "
            autoComplete="adsas"
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your email
          </label>
        </div>
        <div className="flex justify-between items-center">
          <motion.button
            onClick={(e) => sendReq(e)}
            initial={{ 
              x: -100, 
              opacity: 0 
            }}
            transition={{
              duration: 100,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            animate={{
              x: typing ? 0 : -100,
              opacity: typing ? 1 : 0,
            }}
            className="mt-2 py-2 pr-10 text-yellow-500/50 text-2xl hover:text-yellow-500 ease-in-out duration-300"
          >
            <AiOutlineSend />
          </motion.button>
          <motion.span
            initial={{ x: 100, opacity: 0 }}
            transition={{
              duration: 100,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            animate={{
              x: errorMessage || success !== "" ? 0 : 100,
              opacity: errorMessage || success !== "" ? 1 : 0,
            }}
            className={`${errorMessage ? "text-red-500" : "text-lime-400"}`}
          >
            {errorMessage || success}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
