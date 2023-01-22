/**
 * ? Email verification page.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";

type Verification = {
  createProfile: boolean;
  confirmation: any;
  token: any;
};

const UserVerification: NextPage<Verification> = (props: Verification) => {

  return (
    <div className="h-screen justify-center w-full flex items-center">
      <Head>
        <title>Account verification</title>
      </Head>
      <div className="2xl:w-1/2 md:1/4 w-full">
        <div
          className={`rounded-md container py-10 gap-14 flex flex-col items-center justify-center p-4 overflow-hidden`}
        >
          <div className="text-md text-gray-200 shadow-md shadow-black bg-slate-700 p-2 rounded-md">
            Hi there, thanks for joining. <br /> We are sorry but we still need
            few more information from you.
            <br /> Just press on the button and enter the needed details.
          </div>
          <motion.div
            transition={{
              duration: 2,
              type: "fade",
              damping: 10,
              stiffness: 100,
            }}
            initial={{
              y: 50,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            className="h-[20rem] w-[20rem] rounded-lg relative"
          >
            <Image
              src="/welcome.svg"
              className="object-cover"
              width={300}
              height={300}
              alt="Welcome image"
              priority
            />
          </motion.div>
          <div className={`flex justify-center flex-col`}>
            <Link href={`/users/create/${props.token}`}>
              <button
                className="contrast p-2 text-neutral-600 w-[20rem] rounded-md hover:ring-2 hover:ring-yellow-400"
              >
                Create profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * ? Server side function.
 * * Makes a request when we press on the link from the email and confirms the email in backend.
 * ! If email is already verified the user is redirected directly to create a profile catching the 401 error.
 */

export async function getServerSideProps(ctx: any) {
  const { query: { userName: user } } = ctx
  const { query: { token } } = ctx
  const { res: { writeHead: writeHeadRedirect } } = ctx
  const { res: { end: endResponse } } = ctx

  let alreadyConfirmed = false;

  try {
    const data = await axios({
      method: "POST",
      url: "http://localhost:3000/api/auth/verification",
      data: {
        user: user,
        token: token,
      },
    });
  } catch (e: any) {
    if (e.response.status === 401) {
      writeHeadRedirect(302, {
        Location: `/users/create/${token}`,
      });
      endResponse();
    }
  }

  return {
    props: {
      confirmation: "Congrats!",
      user: user,
      token: token,
    },
  };
}

export default UserVerification;
