// "use client"
import React, { useEffect } from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Web3event } from "../components/web3eventType";
import axios from "axios";
import { LoadingComponent } from "../components/loading";
import { fetchWeb3event } from "../api/fetchdata";
import { MainPage } from "./main";


// const web3event: Web3event = {
//   id: 6691,
//   start_time: "2024-02-21T20:00:00Z",
//   end_time: "2024-02-29T23:00:00Z",
//   register_type: 1,
//   image: "https://web3eventfile.s3.ap-southeast-1.amazonaws.com/media%2F1701756785056-a332551c9d4e51a127964261184a84da1e08d6f2.png",
//   title: "Developer Week 2024",
//   organizer: "Developer Week 2024",
//   addr: "Bay Area, Spear Street, SF, California, USA",
//   click_num: 58,
//   is_collect: 0,
//   is_like: 0
// }

export default async function ExplorePage() {


  const web3eventList: Web3event[] = await fetchWeb3event()

  return (
    <div>
      <Navigation />
      <MainPage web3eventList={web3eventList}/>
    </div>
  );
};