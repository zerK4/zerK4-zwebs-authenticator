/**
 * ? Profile creation page
 * @author "Sebastian Pavel"
 * @date Januaury 2023
 */
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

type ProfileType = {
  token: string;
};

const { env: { URL } } = process

const CreateProfile: NextPage<ProfileType> = ({ token }) => {
  const router = useRouter();
  const [info, setInfo] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [phone, setPhone] = useState<String>("");
  const [jobTitle, setJobTitle] = useState<String>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const animer: any = {
    x: 0,
    position: "fixed",
    opacity: 1,
  };
  /**
   * ? Function handling the request to create the profile.
   * * try catch in order to avoid errors.
   */
  const updateProfile = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (firstName && lastName) {
      setError(false);
      try {
        const data = await axios({
          method: "POST",
          url: `/api/users/profile`,
          data: {
            token: token,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            jobTitle: jobTitle,
          },
        });
        setFirstName("");
        setLastName("");
        setPhone("");
        setJobTitle("");
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (e) {
        console.log(e, 'Got an error when sending profile data!');
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Head>
        <title>
          Profile creation
        </title>
      </Head>
      <motion.div
        initial={{ opacity: 0, x: 500 }}
        transition={{
          duration: 100,
          type: "spring",
          damping: 10,
          stiffness: 100,
        }}
        animate={animer}
        className={`container w-[90%] lg:w-1/2 p-10 rounded-md relative`}
      >
        {success ? (
          <Image
            src="/icons/excited.svg"
            height={100}
            width={100}
            alt="Happy svg icon"
            className="absolute -top-14"
          />
        ) : (
          <Image
            src="/icons/happy.svg"
            height={100}
            width={100}
            alt="Happy svg icon"
            className="absolute -top-14"
          />
        )}
        <div className="text-gray-300 mb-10 bg-slate-600 p-2 rounded-md">
          {error ? (
            <h3 className="text-red-500">
              C &apos; mon, just complete the fields! :D
            </h3>
          ) : success ? (
            <h3 className="text-lime-400">
              Great, i will redirect you to login!
            </h3>
          ) : (
            "Huraay, just write some details about you so we can let you in!"
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-4 group">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
              placeholder=" "
              autoComplete="adsas"
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First name *
            </label>
          </div>
          <div className="relative z-0 w-full mb-4 group">
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none  peer"
              placeholder=" "
              autoComplete="adsa"
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Last name *
            </label>
          </div>
          <div className="relative z-0 w-full mb-4 group">
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
              placeholder=" "
              autoComplete="adsa"
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone number
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-4 mt-4 group">
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            className="block border-transparent focus:border-transparent focus:ring-0 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
            placeholder=" "
            autoComplete="asdas"
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Job position
          </label>
          <button
            onMouseEnter={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
            className="absolute right-0 top-0 h-[100%] flex items-center"
          >
            <AiOutlineInfoCircle className="text-blue-500 text-xl" />
          </button>
          {info ? (
            <div className="absolute right-0 top-[120%] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-neutral-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Not mandatory but we strongly recommend it.
              </p>
            </div>
          ) : null}
        </div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <button
            type="submit"
            onClick={(e) => updateProfile(e)}
            className="p-2 bg-yellow-400 rounded-md px-6 text-black ring-4 ring-transparent hover:ring-yellow-200 movement "
          >
            Send
          </button>
        )}
      </motion.div>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const { query: { profile: token } } = ctx
  const { res: { writeHead: writeHeadRedirect } } = ctx
  const { res: {end: endResponse } } = ctx

  try {
    const responseData = await axios({
      method: "GET",
      url: `/api/users/profile`,
      data: {
        token: token,
      },
    });
  } catch (e: any) {
    const status = await e?.response?.status
    if (status === 401) {
      writeHeadRedirect(302, {
        Location: `/login`,
      });
      endResponse();
    }
  }

  return {
    props: {
      confirmation: "Congrats!",
      token: token,
    },
  };
}

export default CreateProfile;
