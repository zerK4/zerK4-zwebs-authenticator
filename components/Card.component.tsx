import { NextComponentType } from "next";
import React from "react";

const Card = ({ newPostHandler }: any) => {
  return (
    <div className="bg-neutral-800 p-4 bg-opacity-40 backdrop-blur-md text-neutral-400 shadow-md shadow-neutral-900 flex items-center justify-between">
      <h1 className="">Card.component</h1>
      <button
        onClick={newPostHandler}
        className="bg-orange-400 py-2 px-6 rounded-md text-black bg-opacity-50 hover:bg-opacity-100 ease-in-out duration-300"
      >
        New
      </button>
    </div>
  );
};

export default Card;
