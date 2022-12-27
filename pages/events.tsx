import axios from "axios";
import { NextPage } from "next";
import Router from "next/router";
import React from "react";

interface Event {
  projects: any;
}

const Events: NextPage<Event> = ({ projects }) => {
  // console.log(projects);
  return <div>events</div>;
};

Events.getInitialProps = async (ctx: any) => {
  const cookie = ctx?.req?.headers?.cookie;

  const data = await axios({
    method: "GET",
    url: "http://localhost:3000/api/events",
    headers: {
      cookie: cookie,
    },
  });
  console.log(data.status, "ctx here");
  if (data.data.status === 401 && !ctx.req) {
    Router.replace("/login");
  }
  if (data.data.status === 401 && ctx.req) {
    ctx?.res?.writeHead(302, {
      Location: "/login",
    });
    ctx?.res?.end();
  }

  return {
    projects: data.status,
  };
};

export default Events;
