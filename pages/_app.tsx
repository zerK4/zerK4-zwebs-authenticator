/**
 * ? Main function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import "../styles/globals.css";
import getTheme from "../store/pageStyle";

const MyApp: NextPage = ({ Component, pageProps, props }: any) => {
  const { selectedTheme } = getTheme();
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    setTheme(selectedTheme);
    if (selectedTheme == "black") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selectedTheme]);

  return (
    <div
      className={`ease-in-out dark:bg-[#1A1A1A] dark:text-[#F2F2F2] bg-[#F2F2F2] text-[#181818] min-h-screen px-4 sm:px-20 md:px-[10rem] xl:px-[20rem] scroll-smooth overflow-y-hidden`}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
