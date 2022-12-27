import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Card from "../components/Card.component";
import Header from "../components/Header.component";
import PostCard from "../components/PostCard.component";
import NewPost from "../components/NewPost.component";
import { AiOutlineClose } from "react-icons/ai";

type HomeInter = {
  thePosts: any;
  post: any;
  key: any;
  cookie: any;
};

const Home = (props: HomeInter) => {
  const [users, setUsers] = useState<any[]>();
  const [posts, setPosts] = useState<any[]>();
  const [newPost, setNewPost] = useState<boolean>(false);
  useEffect(() => {
    setPosts(props.thePosts);
    getUsers();
    console.log(props.thePosts, "posts");
  }, [props.thePosts]);

  const newPostHandler = () => {
    setNewPost(!newPost);
  };

  const getUsers = async () => {
    const { data } = await axios({
      method: "GET",
      url: "http://localhost:3000/api/users",
    });
    console.log(data, "users");
    setUsers(data);
  };

  return (
    <div className="text-white scroll-smooth pb-10 relative">
      <Head>
        <title>zWebs building curve | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Card newPostHandler={newPostHandler} />
      <div className="">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} users={users} />
        ))}
        {newPost ? (
          <div className="absolute bg-white/20 h-screen w-full left-0 top-0 flex items-center justify-center p-10 backdrop-blur-xl">
            <div
              onClick={newPostHandler}
              className="absolute right-10 top-10 bg-black/30 p-2 hover:bg-orange-400/40 ease-in-out duration-300 cursor-pointer"
            >
              <AiOutlineClose className="text-xl" />
            </div>
            <NewPost cookie={props.cookie} />
          </div>
        ) : null}
      </div>
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

  const { data } = await axios({
    method: "GET",
    url: "http://localhost:3000/api/posts",
  });
  return {
    thePosts: data,
    cookie: cookie,
  };
};
export default Home;
