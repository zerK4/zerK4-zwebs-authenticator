import React, { useEffect } from "react";
import { NextPage } from "next";
import "../styles/globals.css";

const MyApp: NextPage = ({ Component, pageProps }: any) => {
  return (
    <div className="bg-black min-h-screen px-4 sm:px-20 md:px-[10rem] xl:px-[20rem] scroll-smooth">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
