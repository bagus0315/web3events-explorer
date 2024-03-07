// "use client"
import React from "react";
import { Navigation } from "../components/nav";
import { Web3event } from "../components/web3eventType";
import { fetchWeb3event } from "../api/fetchdata";
import { MainPage } from "./main";

export default async function ExplorePage() {
  const web3eventList: Web3event[] = await fetchWeb3event()

  return (
    <div>
      <Navigation />
      <MainPage web3eventList={web3eventList}/>
    </div>
  );
};