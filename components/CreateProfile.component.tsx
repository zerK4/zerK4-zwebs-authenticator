import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { NextComponentType } from "next";
import axios from "axios";

type Prof = {
  createProfile: any;
};
const CreateProfile: NextComponentType<Prof> = ({
  createProfile,
  token,
}: any) => {
  const [info, setInfo] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<any>();
  const [lastName, setLastName] = useState<any>();
  const [phone, setPhone] = useState<any>();
  const [jobTitle, setJobTitle] = useState<any>(undefined);

  const animer: any = {
    x: createProfile ? 0 : 500,
    position: createProfile ? "relative" : "fixed",
    opacity: createProfile ? 1 : 0,
  };

  const updateProfile = async (e: any) => {
    e.preventDefault();
    console.log("hit here");

    const data = await axios({
      method: "POST",
      url: "http://localhost:3000/api/users/profile",
      data: {
        token: token,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        jobTitle: jobTitle,
      },
    });
    console.log(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 100,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      animate={animer}
      className={`${createProfile ? "" : "hidden"}`}
    >
      <h2 className="text-gray-500 mb-10">
        Huraay, just write some details about you so we can let you in!
      </h2>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={firstName || " "}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
            placeholder=" "
            autoComplete="adsas"
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            First name *
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={lastName || " "}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-0 peer"
            placeholder=" "
            autoComplete="adsa"
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Last name *
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={phone || " "}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-0 peer"
            placeholder=" "
            autoComplete="adsa"
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-focus:dark:text-yellow-400/50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Phone number
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={jobTitle || " "}
          onChange={(e) => setJobTitle(e.target.value)}
          type="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none peer"
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
          <div className="absolute right-0 top-[120%] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Not mandatory but we strongly recommend it.
            </p>
          </div>
        ) : null}
      </div>
      <button onClick={(e) => updateProfile(e)} className="">
        Send
      </button>
    </motion.div>
  );
};

export default CreateProfile;
