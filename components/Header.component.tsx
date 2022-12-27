import axios from "axios";
import { NextComponentType, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authentication";
import { HiLogout } from "react-icons/hi";

const Header: NextComponentType = () => {
  const { userProfile, removeUser } = useAuthStore();
  const [user, setUser] = useState();

  const logoutHandler = async () => {
    const data = await axios.get("http://localhost:3000/api/auth/logout");
    removeUser();
  };

  useEffect(() => {
    setUser(userProfile!);
  }, [userProfile]);

  return (
    <div className="text-white flex justify-between h-[5rem] items-center">
      <div className="logo">zwebs</div>
      <ul className="nav flex gap-6 items-center">
        <Link href="#">
          <li className="opacity-50 hover:opacity-100 ease-in-out duration-300">
            Home
          </li>
        </Link>
        <Link href="#">
          <li className="opacity-50 hover:opacity-100 ease-in-out duration-300">
            Projects
          </li>
        </Link>
        <Link href="#">
          <li className="opacity-50 hover:opacity-100 ease-in-out duration-300">
            Contact
          </li>
        </Link>
        <Link href={user ? "/" : "/login"}>
          <button
            onClick={() => (user ? logoutHandler() : null)}
            className="p-2 text-orange-400 opacity-50 hover:opacity-100 duration-300 ease-in-out"
          >
            {user ? <HiLogout className="text-2xl" /> : "Login"}
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
