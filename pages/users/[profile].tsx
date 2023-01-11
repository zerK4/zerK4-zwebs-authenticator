/**
 * ? Users profile function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserType } from "../../utils/interfaces/ClientInterface";
import { motion } from "framer-motion";
import Link from "next/link";

type ProfileType = {
  cookie: String;
  data: UserType;
  user: UserType;
};

const Profile: NextPage<ProfileType> = (props) => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [onImage, setOnImage] = useState<boolean>(false);

  useEffect(() => {
    setUser(props.data);
    console.log(props.data, "data from user");
  }, [props.data]);

  const onImageHandler = () => {
    setOnImage(!onImage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "fade", duration: 1 }}
        className="bg-neutral-200 re-shadow dark:container p-6 rounded-lg relative"
      >
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <div className="flex justify-center mb-6">
                <div
                  onMouseEnter={() => onImageHandler()}
                  onMouseLeave={() => onImageHandler()}
                  className={` dark:bg-neutral-900 bg-neutral-300 rounded-full h-[115px] w-[115px] flex items-center justify-center p-2 border dark:border-neutral-700 border-gray-400`}
                >
                  <div
                    className={`${
                      onImage
                        ? "absolute dark:bg-black bg-gray-100 rounded-md ease-in-out duration-300 h-full w-full left-0 top-0"
                        : "relative object-contain h-[115px] w-[115px] overflow-hidden rounded-full"
                    } flex items-center justify-center`}
                  >
                    <Image
                      src={
                        user?.profile?.avatar || "/userAvatar/defaultAvatar.svg"
                      }
                      height={100}
                      width={100}
                      alt="User profile image"
                      className={`${
                        onImage ? "h-[90%] w-[90%] object-contain" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-200">
                {user?.profile?.firstName + " " + user?.profile?.lastName}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white dark:bg-neutral-900 re-shadow px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 dark:border-neutral-800 bg-gray-50 dark:bg-black px-3 text-sm text-gray-500">
                          https://
                        </span>
                        <Link href="https://zwebs.ro">
                          <p
                            id="company-website"
                            className="block w-full flex-1 p-2 bg-gray-50 dark:bg-black dark:border-neutral-800 border rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            zwebs.ro
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      About
                    </label>
                    <div className="mt-1">
                      <p className="mt-1 block w-full rounded-md border-gray-300 dark:bg-black p-2 dark:border-neutral-800 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        A full stack web developer based in Iasi, Romania.
                        Currently working as a senior analyst since several
                        years and coding from almost 1.5 years on my own.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Posts
                    </label>
                    <div className="mt-1 flex flex-wrap items-center gap-2 max-h-[20rem] overflow-auto">
                      {user?.posts?.map((post, i) => (
                        <div
                          key={i}
                          className=" p-2 dark:bg-black rounded-md border dark:border-neutral-800 hover:dark:border-yellow-400 hover:border-pink-400 movement bg-gray-200 border-gray-300"
                        >
                          {post?.image ? (
                            <Image
                              src={post?.image}
                              height={100}
                              width={100}
                              alt={post.title}
                              className="object-cover min-w-[5rem] w-20 md:w-36"
                            />
                          ) : (
                            <div className="flex items-center animate-pulse justify-center w-full h-24 bg-gray-300 rounded sm:w-36 dark:bg-gray-700">
                              <svg
                                className="w-12 h-12 text-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 640 512"
                              >
                                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Current position
                    </label>
                    <div className="mt-1 p-2 dark:bg-black rounded-md dark:border-neutral-800 border">
                      {user?.profile?.jobPosition}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
      <div />
    </div>
  );
};
export async function getServerSideProps(ctx: any) {
  const username = ctx.query.profile;
  const cookie = ctx?.req.headers.cookie;

  const data = await axios({
    method: "POST",
    url: "http://localhost:3000/api/users/getOne",
    headers: {
      cookie: cookie,
    },
    data: {
      username: username,
    },
  });
  console.log(data);

  return {
    props: {
      data: data.data.data,
    },
  };
}

export default Profile;
