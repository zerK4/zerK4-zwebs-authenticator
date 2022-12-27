import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

interface Pst {
  data: any;
}

const Posts: NextPage<Pst> = ({ data }) => {
  const [users, setUsers] = useState();
  useEffect(() => {
    setUsers(data);
    console.log(data);
  }, [data]);
  return <div>Posts</div>;
};

Posts.getInitialProps = async (ctx: any) => {
  const cookie = ctx?.req?.headers?.cookie;

  const { data } = await axios({
    method: "GET",
    url: "http://localhost:3000/api/users",
    headers: {
      cookie: cookie,
    },
  });
  console.log(data);

  return {
    data: data,
  };
};

export default Posts;
