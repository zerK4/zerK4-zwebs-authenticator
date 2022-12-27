import axios from "axios";
import React, { useState } from "react";
import { postImageHandler } from "../utils/imagesHandler";
import { AiOutlineCloudUpload } from "react-icons/ai";
import useAuthStore from "../store/authentication";

const NewPost = ({ cookie }: any) => {
  const { userProfile } = useAuthStore();
  const [imageInput, setImageInput] = useState<any>();
  const [image, setImage] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(userProfile);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImageInput(file);
    console.log(file);
  };

  const handleForm = async (e: any) => {
    const document = {
      imageInput: imageInput,
      title: title,
      content: content,
      currentUser: currentUser.email,
    };
    e.preventDefault();
    postImageHandler(document);
    console.log(userProfile);
  };

  return (
    <div className="w-full h-[80%]">
      <h1 className="text-2xl">New post</h1>
      <div className="border-b-2 border-black/30 my-2"></div>
      <form className="flex flex-col gap-4 w-full lg:w-[80%]">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="p-2 bg-black/30 outline-none border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="Please enter title"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="p-2 bg-black/30 outline-none border-2 border-transparent focus:border-orange-400 ease-in-out duration-300"
          placeholder="Pease enter text"
        />

        <div className="flex w-full items-center justify-center bg-grey-lighter">
          <label className="w-full flex justify-center gap-4 items-center px-4 py-4 bg-black/30 shadow-lg tracking-wide cursor-pointer">
            <AiOutlineCloudUpload className="text-4xl text-orange-400" />
            <span>Upload somethin!</span>
            <input type="file" className="hidden" onChange={handleImage} />
          </label>
        </div>

        <button className="" onClick={handleForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPost;
