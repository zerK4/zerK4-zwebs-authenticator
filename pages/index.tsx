import React from "react";
import Head from "next/head";
import Header from "../components/Header.component";
import {SiNextdotjs, SiTailwindcss, SiPrisma} from "react-icons/si"

type HomeInter = {
  cookie: any;
};

const Home = (props: HomeInter) => {

  return (
    <div className="text-white scroll-smooth pb-10 relative">
      <Head>
        <title>zWebs | Auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <section className="">
    <div className="py-8 px-4 mx-auto mt-[10rem] text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Authentication package.</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Full authentication package, register, login, logout, using database, cookies and local storage.</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        </div>
        <div className="px-4 mx-auto text-center flex flex-col items-center lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">tech used</span>
            <div className="flex items-center flex-wrap md:flex-nowrap justify-center md:justify-between mt-8 text-gray-500">
                <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <button className="flex items-center gap-6"><SiNextdotjs className="text-5xl"/> <span className="text-2xl font-bold">NextJs</span> </button>                     
                </a>
                <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <button className="flex items-center gap-6"><SiTailwindcss className="text-5xl"/> <span className="text-2xl font-bold">TailwindCSS</span> </button>                     
                </a>
                <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <button className="flex items-center gap-6"><SiPrisma className="text-5xl"/> <span className="text-2xl font-bold">PrismaIO</span> </button>                     
                </a>
            </div>
        </div> 
    </div>
</section>
    </div>
  );
};
/**
 *
 * @param ctx
 * @returns posts from api
 */

Home.getInitialProps = async (ctx: any) => {
  const cookie = ctx?.req?.headers?.cookie;

  return {
    cookie: cookie,
  };
};
export default Home;
