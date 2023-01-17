/**
 * ? Login function.
 * @author "Sebastian Pavel"
 * @date January 2023
 * ? Checks if everything is completed.
 * ? Makes the post request to server.
 * ? Checks if the email is confirmed.
 * ? Checks if the user has a profile or not.
 * ? If message received is OK the account is logged and redirected to front page.
 */

import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiOutlineExclamationCircle, AiOutlineSend } from "react-icons/ai";
import Link from "next/link";
import { NextPage, NextPageContext } from "next";
import useAuthStore from "../store/authentication";
import Head from "next/head";
import { motion } from "framer-motion";
/**
 * ? Icons import from react-icons.
 */
import { TfiWrite } from "react-icons/tfi";
import { BiReset } from "react-icons/bi";

type Logi = {
  logged?: boolean;
  ctx?: NextPageContext;
};

const Login: NextPage = ({ logged }: Logi) => {
  const router = useRouter();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [isLoading, setisLoading] = useState<Boolean>(false);
  const [complete, setComplete] = useState<Boolean>(false);
  const [someIssue, setSomeIssue] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [notValidated, setNotValidated] = useState<Boolean>(false);
  const [sentAgain, setSentAgain] = useState<Boolean>(false);
  const [typing, setTyping] = useState<Boolean>(false);
  const { addUser } = useAuthStore();

  useEffect(() => {
    email.length !== 0 && password.length !== 0
      ? setTyping(true)
      : setTyping(false);
    typing
      ? () => {
          setSomeIssue(false);
        }
      : null;
  }, [password, email]);

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const document = {
      email: email,
      password: password,
    };
    if (email && password) {
      let data;
      /**
       * * Try getting the data from the server.
       */
      try {
        data = await axios.post(`/api/auth/login`, document);
        if (data.status === 200) {
          router.replace("/");
          addUser(data.data.person);
        } else if (data.status === 404) {
          setSomeIssue(true);
          setErrorMessage(data.data.message);
        }
      } catch (err: any) {
        /**
         * ! Catching errors if there are any, in our case if the email is not validated or the user does not have a profile.
         */
        console.log(err, "erro here");
        if (err.response.status === 401) {
          if (err.response.data?.need) {
            console.log("you need to create an profile");
            setTimeout(() => {
              router.push(`/users/create/${err?.response?.data?.token}`);
            }, 2000);
          } else {
            setNotValidated(true);
            console.log(err);
          }
        }
        setSomeIssue(true);
        setErrorMessage(err.response.data.message);
      }
      setComplete(false);
    } else {
      setComplete(true);
    }
  };
  /**
   * ? Verified function that handles the server request in order to start the verification.
   */
  const verifier = async () => {
    const data = await axios({
      method: "PUT",
      url: "http://localhost:3000/api/auth/register",
      data: {
        email: email,
      },
    });
    console.log(data);
  };

  /**
   * useEffect is checking if the account is logged by waiting for logged from getInitialProps.
   * Once this received, its value is true and isLogged function will rin in order to mage auths value true.
   */
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <Head>
        <title>zWebs Auth | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
        }}
        className="w-full flex justify-center"
      >
        {notValidated ? (
          <div className="max-w-sm p-6 border bg-white border-gray-200 rounded-lg shadow-md dark:container overflow-hidden">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b-2 pb-4 border-neutral-700">
              Oooooh, so you did not validated the account yet.
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
              C &apos; mon, not so hard, only open your email address and smash that
              link so we can let you in.
            </p>
            <div className="flex gap-4 items-center">
              <Link
                href="https://gmail.google.com/"
                className="inline-flex items-center px-3 py-2 text-sm text-black font-medium text-center rounded-lg contrast"
              >
                Open mailbox
              </Link>
              {sentAgain ? (
                <button className="text-green-400">Sent!</button>
              ) : (
                <button
                  onClick={() => {
                    verifier(), setSentAgain(true);
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm text-red-500 font-medium text-center rounded-lg"
                >
                  Send email again.
                </button>
              )}
            </div>
          </div>
        ) : (
          <form className="overflow-hidden shadow-md rounded px-8 pt-6 w-full md:w-[25rem] pb-8 mb-4 dark:bg-neutral-900 dark:shadow-black bg-[#F2F2F2] shadow-[#181818]/30 flex flex-col gap-6 dark:border dark:border-black">
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
            <div className="relative z-0 w-full mb-2 group">
              <input
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                type="email"
                className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 peer"
                placeholder=" "
                autoComplete="adsas"
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-2 group">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block py-2.5 border-transparent focus:border-transparent focus:ring-0 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
                placeholder=" "
                autoComplete="adsas"
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
            {isLoading ? (
              <div className="flex justify-center">
                <div className="loader"></div>
              </div>
            ) : (
              <motion.div className="flex">
                <motion.button
                  onClick={(e) => loginHandler(e)}
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
                  onClick={(e) => loginHandler(e)}
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
            <div className="flex border-t-2 pt-4 border-neutral-800">
              <div className="w-full flex justify-between items-center gap-2">
                <Link href="/register">
                  <button className="text-neutral-400 hover:text-neutral-600 ease-in-out duration-300 flex items-center gap-2">
                    <TfiWrite /> Register
                  </button>
                </Link>
                <Link href={`/users/reset/`}>
                  <button className="text-neutral-400 hover:text-neutral-600 ease-in-out duration-300 flex items-center gap-2">
                    <BiReset />
                    Reset password
                  </button>
                </Link>
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
/**
 * ? Checks if there is a cookie present, if any the user is redirected to homepage.
 */
Login.getInitialProps = async (ctx) => {
  if (ctx?.req?.headers?.cookie && ctx?.req) {
    ctx?.res?.writeHead(302, {
      Location: "/",
    });
    ctx?.res?.end();
  }
  return { logged: true };
};

export default Login;
