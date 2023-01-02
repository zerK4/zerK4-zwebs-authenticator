import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Link from "next/link";
import { NextPage, NextPageContext } from "next";
import useAuthStore from "../store/authentication";
import Head from "next/head";

interface Logi {
  logged?: boolean;
  ctx?: NextPageContext;
}

const Login: NextPage<Logi> = ({ logged }: any) => {
  const router = useRouter();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [isLoading, setisLoading] = useState<Boolean>(false);
  const [complete, setComplete] = useState<Boolean>(false);
  const [someIssue, setSomeIssue] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const { addUser } = useAuthStore();
  /**
   *
   * @param {*}
   * Login function.
   * Checks if everything is completed.
   * Makes the post request to server.
   * If message received is OK the account is logged and redirected to front page.
   */

  const loginHandler = async (e: any) => {
    e.preventDefault();
    const document = {
      email: email,
      password: password,
    };
    if (email && password) {
      const data = await axios.post(
        `/api/auth/login`,
        document
      );
      if (data.data.status === 200) {
        router.replace("/");
        console.log(data.data.person);
        addUser(data.data.person);
      } else if (data.data.status === 404) {
        setSomeIssue(true);
        setErrorMessage(data.data.message);
      } else if (data.data.status === 401) {
        setSomeIssue(true);
        setErrorMessage(data.data.message);
      }
      console.log(data);
      setComplete(false);
    } else {
      setComplete(true);
    }
  };
  /**
   * useEffect is checking if the account is logged by waiting for logged from getInitialProps.
   * Once this received, its value is true and isLogged function will rin in order to mage auths value true.
   */
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Head>
        <title>zWebs Auth | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="w-full justify-center flex mb-[5rem] text-4xl text-neutral-500">
        Login
      </h1>
      <form className="shadow-md rounded px-8 pt-6 w-full md:w-[25rem] pb-8 mb-4 bg-neutral-900 flex flex-col gap-6 text-white">
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
          onClick={(e) => loginHandler(e)}
          className="bg-neutral-700 hover:bg-neutral-800 rounded p-2 text-white ease-in-out duration-300"
        >
          {isLoading ? (
            <div className="flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            "Submit"
          )}
        </button>
        <div className="flex">
          <div className="text-neutral-500 flex items-center gap-2">
            Would you want to{" "}
            <div className="flex flex-col">
            <Link href="/register">
              <button className="text-neutral-400 hover:text-neutral-600 ease-in-out duration-300">REGISTER</button>?
            </Link>
            <Link href="#">
              <button className="text-neutral-400 hover:text-neutral-600 ease-in-out duration-300">Reset password</button>?
            </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
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
