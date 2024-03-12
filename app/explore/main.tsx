"use client"
import React from "react";
import { Card } from "@/app/components/card";
import { Article } from "./article";
import { Web3event } from "@/app/components/web3eventType";
import { LoadingComponent } from "@/app/components/loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
    web3eventList: Web3event[];
}

export const  MainPage: React.FC = () => {

    const [ isLoading, setLoading ] = useState(true);
    const [ web3event, setWeb3event ] = useState<Web3event[]>([]);
    const [ pages, setPages ] = useState<number>(0);
    const [ status, setStatus ] = useState<number>(1);
    const [ queryType, setQueryType ] = useState<number>(0);
    const [ fetchFull, setFetchFull ] = useState(true);

    const fetchWeb3event = async (pages: number,status:number, queryType: number) => {
        const data = {
            "pages": pages,
            "page_size": 20,
            "keywords": "",
            "topic": null,
            "pay": null,
            "status": status,
            "query_type": queryType
        };
        try {
            const result: any = await axios.post(`/api/explore`,data)
            return result.data.data;
        } catch (error) {
            console.error('Error fetching web3event data list:', error);
            throw error;
        };
    }

    const fetchInitialData = async () => {
        setPages(0)
        setFetchFull(true)
        const web3eventList: Web3event[] = await fetchWeb3event(0, status, queryType);
        if (Array.isArray(web3eventList) && !undefined) {
            setWeb3event(web3eventList);
            setLoading(false);
        } else {
            setLoading(true);
            setWeb3event([]);
        }
    }

    const fetchMoreData =  async () => {
        const web3eventList: Web3event[] = await fetchWeb3event(pages+1, status, queryType);
        setPages(pages + 1)
        if (web3event !== undefined) {
            if (Array.isArray(web3eventList) && web3eventList.length !== 0) {
                setWeb3event([...web3event, ...web3eventList]);
                setLoading(false);
            } else if (web3eventList === null) {
                setFetchFull(false)
            }
        } else {
            setLoading(true);
            setWeb3event([]);
        } 
    }

    useEffect(() => {
        fetchInitialData();
    },[ status, queryType ]);

    return (
        <div>
        {
            !isLoading
            ? <div className="px-6 pt-[70px] mx-auto space-y-8 max-w-[100rem] lg:px-8 md:space-y-16">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        CommuneAI 
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        This is description about web3events for peopel who love blockchain.
                    </p>
                </div>
                <div className="w-full h-px bg-zinc-800" />
                <InfiniteScroll
                    dataLength={web3event.length}
                    next={fetchMoreData}
                    hasMore={fetchFull}
                    scrollThreshold={1}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-4">
                        {web3event.map((web3event, key) => (
                            <div key={key} className="grid grid-cols-1 gap-4">
                                <Card key={1}>
                                    <Article web3event={web3event} />
                                </Card>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
            : <LoadingComponent/>
        }
        </div>
    );
};