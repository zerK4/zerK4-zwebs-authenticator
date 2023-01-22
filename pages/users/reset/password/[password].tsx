/**
 * ? Change password page
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";

type PasswordType = {
  token: String;
};

const Password: NextPage<PasswordType> = ({ token }) => {
  const router = useRouter();
  const [success, setSuccess] = useState<String>("");
  const [typing, setTyping] = useState<boolean>(false);
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [error, setError] = useState<String>("");

  useEffect(() => {
    password.length !== 0 && confirmPassword.length !== 0
      ? setTyping(true)
      : setTyping(false);
    typing
      ? () => {
          setError(""), setSuccess("");
        }
      : null;
  }, [password, confirmPassword]);

  const resetPassword = async (e: any) => {
    if (password === confirmPassword) {
      try {
        const data = await axios({
          method: "PUT",
          url: `/api/auth/resetPassword`,
          data: {
            token: token,
            password: password,
          },
        });
        setSuccess(data.data.message);
        setError("");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Passwords are not the same!");
      setSuccess("");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
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
        <div className="relative z-0 w-full mb-8 group">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
            placeholder=" "
            autoComplete="adsas"
            required
          />
          <label className="peer-focus:font-medium border-transparent focus:border-transparent focus:ring-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Type a new password
          </label>
        </div>
        <div className="relative z-0 w-full mb-2 group">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
            placeholder=" "
            autoComplete="adsas"
            required
          />
          <label className="peer-focus:font-medium border-transparent focus:border-transparent focus:ring-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Type the password again
          </label>
        </div>
        <div className="flex justify-between items-center">
          <motion.button
            onClick={(e) => resetPassword(e)}
            initial={{ x: -100, opacity: 0 }}
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
            className="mt-2 py-2 pr-10"
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
              x: success.length !== 0 || error.length !== 0 ? 0 : 100,
              opacity: success.length !== 0 || error.length !== 0 ? 1 : 0,
            }}
            className={`${
              error.length !== 0 ? "text-red-500" : "text-lime-400"
            }`}
          >
            {success || error}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * ? Server side function that takes the token from the url.
 * * named password because it takes the name of the page.
 */

export async function getServerSideProps(ctx: any) {
  const token = ctx.query.password;

  return {
    props: {
      token: token,
    },
  };
}

export default Password;
