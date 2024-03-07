"use client"
import React from "react";
import { Web3eventDetail } from "@/app/components/web3eventType";
import { Web3eventDescription } from "@/app/components/web3eventType";
import { LoadingComponent } from "@/app/components/loading";
import Image from "next/image";
import { MapPinIcon, CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
    web3eventDetail: Web3eventDetail;
};

export const EventDetailPage: React.FC<Props> = ({web3eventDetail}) => {
    const [ isLoading, setLoading ] = useState(true);
    const [ web3event, setWeb3event ] = useState<Web3eventDetail|undefined>();
    const [ description, setDescription ] = useState<string>("");

    useEffect(() => {
        if (web3eventDetail && !undefined) {
            setWeb3event(web3eventDetail);
            const description = JSON.parse(web3eventDetail.description) as Web3eventDescription;
            if (description) {
                const text = description.content.modules[0].text;
                console.log(text);
                setDescription(text);
            }
            setLoading(false);
        } else {
            setLoading(true);
            setWeb3event(undefined);
        }
    },[web3eventDetail])

    return (
        <div>
            {
                ! isLoading && web3event
                ? <div className="px-6 pt-20 mx-auto space-y-8 max-w-[100rem] lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                    <div className="flex flex-col gap-4 lg:flex-row justify-center items-start">
                        <div className="flex flex-col w-full max-w-[650px] mx-auto lg:mx-0 gap-4">
                            <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
                                <Image
                                    src={web3event?.image}
                                    fill={true}
                                    alt={web3event?.title}
                                />
                            </div>
                            <div className="bg-zinc-800 p-4 text-zinc-200 rounded-lg">
                                <div className="flex">
                                    {
                                        web3event?.topics_name.length !== 0
                                        ?<div className="max-w-[80%] w-auto flex px-2 py-1 rounded-2xl bg-neutral-700 items-center">
                                            <div className="mr-2 text-xs text-zinc-300">Featured in</div>
                                            {web3event?.topics_name.map((topic, key) => 
                                                <div key={key} className=" underline text-zinc-200">{topic}</div>    
                                            )}
                                            <div className=""></div>
                                        </div>
                                        :<div></div>
                                    }
                                </div>
                                <div className="py-2">
                                    <h2 className="z-20 mt-4 text-3xl font-extrabold duration-1000 lg:text-5xl text-zinc-200 
                                        group-hover:text-white font-display"
                                    >
                                        {web3event?.title}
                                    </h2>
                                </div>
                                <div className="py-2 flex">
                                    <div className=" w-12 h-12 rounded-xl border border-solid border-slate-500 mr-3 flex 
                                        justify-center items-center"
                                    >
                                        <CalendarIcon className="text-zinc-400"/>
                                    </div>
                                    <div className=" flex flex-col">
                                        <p className=" text-lg font-bold">{web3event?.start_time}</p>
                                        <p>{web3event?.timezone}</p>
                                    </div>
                                </div>
                                <div className="py-2 flex">
                                    <div className=" w-12 h-12 rounded-xl border border-solid border-slate-500 mr-3 flex 
                                        justify-center items-center"
                                    >
                                        <MapPinIcon className="text-zinc-400"/>
                                    </div>
                                    <div>
                                        <p className=" text-lg font-bold">{web3event?.addr}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-zinc-200 w-full max-w-[650px] mx-auto lg:mx-0">
                            <div className="p-4 rounded-lg bg-zinc-800 w-full">
                                <div className="py-4">
                                    <p className=" text-3xl font-extrabold pl-4 border-l-8 border-green-400">About the event</p>
                                </div>
                                <div className="w-full h-[2px] bg-slate-500 mb-4"></div>
                                <div>
                                    <div className="event-description" dangerouslySetInnerHTML={{__html: `${description}`}}></div>   
                                </div>
                            </div>
                            <div className="mt-4 flex gap-4 w-full">
                                <div className="w-[50%] p-4 rounded-lg bg-zinc-800">
                                    <div className="my-2 pl-2 border-l-8 border-green-400 flex items-center">
                                        <p className="text-xl font-bold text-zinc-300">Hosted by </p>
                                    </div>
                                    <div className="w-full h-[2px] bg-slate-500 mb-4"></div>
                                    <div className="my-2 pl-2 flex items-center">
                                        <p className="text-lg text-zinc-400">Hosted by </p>
                                        <p className="pl-2 text-xl font-semibold">{web3event?.organizer}</p>
                                    </div>
                                </div>
                                <div className="w-[50%] p-4 rounded-lg bg-zinc-800">
                                    <div className="my-2 pl-2 border-l-8 border-green-400 flex items-center">
                                        <p className="text-xl font-bold text-zinc-300">Submitted by</p>
                                    </div>
                                    <div className="w-full h-[2px] bg-slate-500 mb-4"></div>
                                    <div className="my-2 pl-2 flex items-center">
                                        <div className=" w-10 h-10 mr-6 relative overflow-hidden rounded-full">
                                            <Image
                                                src={web3event?.manager?.avatar}
                                                fill
                                                alt=""
                                            />
                                        </div>
                                        <p className="text-xl font-semibold">{web3event?.manager?.nickname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                : <LoadingComponent/>
            }
        </div>
    );
}