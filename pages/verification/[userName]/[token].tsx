/**
 * ? Email verification page.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import axios from "axios";
import Link from "next/link";
import React from "react";
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
          className={`rounded-md container gap-4 flex flex-col items-center justify-center p-4 overflow-hidden`}
        >
          <div className="text-md text-gray-200 p-2 rounded-md">
            <h1 className="border-b-2 border-neutral-900 pb-2 mb-4 text-2xl">Hi there, thanks for joining.</h1> 
            <p className="text-neutral-500">We still need
            few more information from you.</p>
            <p className="text-neutral-500">Just press on the button and enter the needed details.</p>
          </div>
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

  const URL = process.env.URL

  try {
    const data = await axios({
      method: "POST",
      url: `${URL}/api/auth/verification`,
      data: {
        user: user,
        token: token,
      },
    });
  } catch (e: any) {
    if (e?.response?.status === 401) {
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
