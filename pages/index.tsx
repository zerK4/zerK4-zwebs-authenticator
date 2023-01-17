/**
 * ? Homepage function
 * @author "Sebastian Pavel"
 * @date January 2023
 */
import React, { useEffect, useState } from "react";
import Header from "../components/Header.component";
import Head from "next/head";
import { NextPage } from "next";
import { AiFillHeart } from "react-icons/ai";
import { SiNextdotjs, SiPrisma, SiTailwindcss } from "react-icons/si";
import useAuthStore from "../store/authentication";

type HomeInter = {
  cookie: any;
  data: any;
  users: any;
};
const Home: NextPage<HomeInter> = (props) => {
  const [user, setUser] = useState<any>({});
  const { userProfile } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="scroll-smooth pb-10 relative">
      <Head>
        <title>zWebs | Auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <h1 className="">
        {user?.firstName
          ? `Hello ${user?.firstName}`
          : "You are not authenticated yet"}{" "}
      </h1>
      <section className="relative flex flex-col p-4 gap-4 items-center h-fit mt-20 justify-center bg-black container rounded-lg">
        <h1 className="text-2xl text-gray-300 text-center">
          Full authentication & authorization system.
        </h1>
        <div className=" flex flex-col gap-10 items-center">
          <h3 className="flex items-center gap-2">
            Build with <AiFillHeart className="text-red-400" /> and:
          </h3>
          <div className="flex gap-6">
            <SiNextdotjs className="text-7xl opacity-50 hover:opacity-100 ease-in-out duration-300 cursor-pointer" />
            <SiTailwindcss className="text-7xl opacity-50 hover:opacity-100 ease-in-out duration-300 cursor-pointer" />
            <SiPrisma className="text-7xl opacity-50 hover:opacity-100 ease-in-out duration-300 cursor-pointer" />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
