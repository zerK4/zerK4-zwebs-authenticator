import axios from "axios";
import { NextComponentType, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authentication";

const Header: NextComponentType = () => {
  const { userProfile, removeUser } = useAuthStore();
  const [user, setUser] = useState<String>("");

  const logoutHandler = async () => {
    const data = await axios.get("/api/auth/logout");
    removeUser();
  };

  useEffect(() => {
    setUser(userProfile?.firstName);
  }, [userProfile]);

  return (
    <div className="flex justify-between h-[5rem] items-center">
      <div className="logo">zwebs</div>
      <div className="flex items-center gap-2">
        <Link href={user ? "/" : "/login"}>
          <button
            onClick={() => (user ? logoutHandler() : null)}
            className="p-2 dark:text-[#5CB8E4] text-[#181818] opacity-50 font-bold text-xl hover:opacity-100 duration-300 ease-in-out"
          >
            {user ? "Logout" : "Login"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
