import { NextComponentType } from "next";
import Image from "next/image";
import React, { Component } from "react";

export type Post = {
  post: any;
  users: any;
};

const PostCard = ({ post, users }: Post) => {
  const dateHandler = () => {
    const x = post.createdAt;
    const opDate = x.split("T");
    const date = opDate[0];

    const t = opDate[1].split(".");
    const time = t[0];
    return date;
  };

  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">{post.postTitle}</h1>
        <div className="">
          <div className="">
            <span className="text-orange-400/40">by </span>
            {users?.map((user: any) =>
              user.id === post.userId
                ? user.firstName + " " + user.lastName
                : null
            )}
          </div>
          <p>
            <span className="text-orange-400/40">at </span> {dateHandler()}
          </p>
        </div>
      </div>
      <div className="border-2 border-white/10 flex justify-center">
        <Image
          loading="lazy"
          src={post?.postImage}
          alt={post.postTitle}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default PostCard;
