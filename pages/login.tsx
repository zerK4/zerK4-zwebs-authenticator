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
        "http://localhost:3000/api/auth/login",
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
        <title>zWebs building curve | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="w-full justify-center flex mb-[10rem] text-4xl text-neutral-500">
        Login
      </h1>
      <form className="flex flex-col gap-2 border-2 border-neutral-900 shadow-md shadow-neutral-500 p-2 text-white">
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
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="p-2 w-[25rem] rounded-sm outline-none bg-neutral-800 focus:bg-black border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="password"
        />
        <button
          onClick={(e) => loginHandler(e)}
          className="border-2 border-neutral-800 p-2 text-white hover:border-orange-400 ease-in-out duration-300"
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
          <div className="text-neutral-500">
            Would you want to{" "}
            <Link href="/register">
              <button className="text-orange-400">REGISTER</button>?
            </Link>
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
