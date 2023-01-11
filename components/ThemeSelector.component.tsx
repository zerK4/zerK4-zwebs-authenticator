import React, { useState, useEffect } from "react";
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";
import getTheme from "../store/pageStyle";

export default function ThemeSelector() {
  const [selected, setSelected] = useState<string>("black");
  const { setBlack, setWhite, selectedTheme } = getTheme();

  useEffect(() => {
    setSelected(selectedTheme);
  }, [selectedTheme]);
  return (
    <div className="flex items-center bg-transparent p-1 rounded-full w-[3rem] h-[3rem] overflow-hidden">
      <div
        onClick={() => setBlack()}
        className="p-1 dark:bg-[#181818] rounded-full bg-transparent movement dark:translate-x-7"
      >
        <MdDarkMode className="text-xl" />
      </div>
      <div
        onClick={() => setWhite()}
        className="p-1 bg-[#F2F2F2] rounded-full dark:bg-transparent movement dark:-translate-x-7"
      >
        <MdOutlineWbSunny className="text-2xl dark:text-white " />
      </div>
    </div>
  );
}
