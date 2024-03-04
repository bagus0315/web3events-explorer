"use client"
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Web3event } from "../components/web3eventType";
import axios from "axios";


  const web3event : Web3event = {
    id: 6691,
    start_time: "2024-02-21T20:00:00Z",
    end_time: "2024-02-29T23:00:00Z",
    register_type: 1,
    image: "https://web3eventfile.s3.ap-southeast-1.amazonaws.com/media%2F1701756785056-a332551c9d4e51a127964261184a84da1e08d6f2.png",
    title: "Developer Week 2024",
    organizer: "Developer Week 2024",
    addr: "Bay Area, Spear Street, SF, California, USA",
    click_num: 58,
    is_collect: 0,
    is_like: 0
  }

export default  function ExplorePage() {

  // const web3eventList: Web3event[] = await axios({
  //   method: 'post',
  //   url: 'https://www.web3event.org/web3event/api/v1/events/query',
  //   data: {
  //     "pages": 0,
  //     "page_size": 20,
  //     "keywords": "",
  //     "topic": null,
  //     "pay": null,
  //     "status": 1,
  //     "query_type": 0
  //   },
  // })
  // .then((response) => {
  //   const web3eventList: Web3event[] = response.data.data;
  //   console.log(web3eventList);
  //   return web3eventList;
  // })
  // .catch((error) => {
  //   console.log(error);
  //   throw error;
  // });

  return (
      <div>
          <Navigation/>
          <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
      <div className="max-w-2xl mx-auto lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          Web3 events
        </h2>
        <p className="mt-4 text-zinc-400">
          This is description about web3events for peopel who love blockchain.
        </p>
      </div>
      <div className="w-full h-px bg-zinc-800" />
      <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
              <Card key={1}>
                <Article web3event={web3event} />
              </Card>
        </div>
        <div className="grid grid-cols-1 gap-4">
              <Card key={2}>
                <Article web3event={web3event} />
              </Card>
        </div>
        {/* <div className="grid grid-cols-1 gap-4">
          {sorted
            .filter((_, i) => i % 3 === 2)
            .map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
        </div> */}
      </div>
    </div>            
      </div>
  );
};