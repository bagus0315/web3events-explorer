// "use client"
import React from "react";
import { Navigation } from "../components/nav";
import { Web3event } from "../components/web3eventType";
import { MainPage } from "./main";

export default async function ExplorePage() {
  return (
    <div>
      <Navigation />
      <MainPage/>
    </div>
  );
};