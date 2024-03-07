"use client"
import React from "react";
import { Card } from "@/app/components/card";
import { Article } from "./article";
import { Web3event } from "@/app/components/web3eventType";
import { LoadingComponent } from "@/app/components/loading";
import { useEffect, useState } from "react";

type Props = {
    web3eventList: Web3event[];
}

export const MainPage: React.FC<Props> = ({web3eventList}) => {

    const [ isLoading, setLoading ] = useState(true);
    const [ web3event, setWeb3event ] = useState<Web3event[]>([]);
    useEffect(() => {
        if (Array.isArray(web3eventList) && !undefined) {
            setWeb3event(web3eventList);
            setLoading(false);
        } else {
            setLoading(true);
            setWeb3event([]);
        }
    },[web3eventList])
    return (
        <div>
        {
            !isLoading
            ? <div className="px-6 pt-20 mx-auto space-y-8 max-w-[100rem] lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        web3event 
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        This is description about web3events for peopel who love blockchain.
                    </p>
                </div>
                <div className="w-full h-px bg-zinc-800" />
                <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-4">
                    {web3eventList.map((web3event) => (
                        <div className="grid grid-cols-1 gap-4">
                        <Card key={1}>
                            <Article web3event={web3event} />
                        </Card>
                        </div>
                    ))}
                </div>
            </div>
            : <LoadingComponent/>
        }
        </div>
    );
};