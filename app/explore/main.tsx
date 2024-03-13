"use client"
import React from "react";
import { Card } from "@/app/components/card";
import { Article } from "./article";
import { Web3event } from "@/app/components/web3eventType";
import { LoadingComponent } from "@/app/components/loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, FreeMode, Navigation, Autoplay } from 'swiper/modules';
import { CaptionsIcon, MapPinIcon } from "lucide-react";

type Props = {
    web3eventList: Web3event[];
}

export const  MainPage: React.FC = () => {

    const [ isLoading, setLoading ] = useState(true);
    const [ web3event, setWeb3event ] = useState<Web3event[]>([]);
    const [ pages, setPages ] = useState<number>(0);
    const [ asteriskData, setAsteriskData ] = useState();
    const [ asteriskImages, setAsteriskImages ] = useState([]);
    const [ countInfo, setCountInfo ] = useState<any>({});
    const [ popCities, setPopCities ] = useState([]);
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

    const fetchAsteriskData = async () => {
        try {
            const result = await axios.post(`/api/asterisk`);
            const data = result.data.data;
            const ImageData = data.map((event: any) => (
                {
                    image: event.image,
                    title: event.title
                }
                
            ));
            setAsteriskImages(ImageData)
        } catch (error) {
            console.error('Error fetching asterisk data', error);
            throw error;
        }
    }

    const fetchPopCitiesData = async () => {
        try {
            const result: any = await axios.get(`/api/asterisk`);
            const data = result.data.data;            
            const ImageData = data.map((city: any) => (
                {
                    image: city.image,
                    name: city.name,
                    id: city.id
                }
            ));
            setPopCities(ImageData)
        } catch (error) {
            
        }
    }

    const fetchCountInfo = async () => {
        try {
            const result = await axios.get(`/api/countInfo`);
            const data = result.data.data;
            setCountInfo(data)            
        } catch (error) {
            console.error('Error fetching countInfo', error);
            throw error;
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

    useEffect(() => {
        fetchCountInfo();
        fetchAsteriskData();
        fetchPopCitiesData();
    },[]);

    return (
        <div>
        {
            !isLoading
            ? <div className="px-6 pt-[100px] mx-auto max-w-[100rem] lg:px-8">
                <div className="flex items-center">
                    <div className="w-[40%] pl-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                            Explore Web3events 
                        </h2>
                        <p className="mt-4 text-zinc-400">
                            You can explore web3events here with CommuneAI.
                        </p>
                        <div className="flex justify-center items-center gap-4 h-[200px]">
                            <div className="flex items-center gap-[10px]">
                                <CaptionsIcon size={32} color="#dddddd" strokeWidth={3} />
                                <div className="text-4xl text-zinc-200 font-bold font-sans">{countInfo?.event_count}</div>
                                <div className="text-xl text-zinc-400 font-semibold">+ events</div>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <MapPinIcon size={32} color="#dddddd" strokeWidth={3} />
                                <div className="text-4xl text-zinc-200 font-bold font-sans">{countInfo?.city_count}</div>
                                <div className="text-xl text-zinc-400 font-semibold">+ cities</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[60%] flex-1">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 650,
                                modifier: 1,
                                slideShadows: false,
                                scale:0.5,
                            }}
                            loop={true}
                            pagination={{
                                clickable:true,
                            }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false
                            }}
                            modules={[ EffectCoverflow, Pagination, Autoplay ]}
                            className="asteriskSwiper"
                        >
                            {asteriskImages.map((event:any ,key) => (
                                <SwiperSlide key={key}>
                                    <div className="rounded-lg bg-zinc-800 border border-zinc-700">
                                        <div className="p-4 rounded-lg overflow-hidden">
                                            <img src={event.image} />
                                        </div>
                                        <div className="px-4 pb-4">
                                            <h1 className=" text-slate-200 text-xl">{event.title}</h1>
                                        </div>
                                    </div>
                                </SwiperSlide>   
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="w-full">
                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={15}
                        freeMode={true}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={true}
                        modules={[FreeMode, Pagination, Navigation]}
                        className="popCitiesSwiper"
                    >
                        {popCities.map((city:any ,key) => (
                            <SwiperSlide key={key}>
                                <div className=" w-full rounded-lg overflow-hidden relative hover:cursor-pointer">
                                    <img src={city.image} />
                                    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-300">{city.name}</h2>
                                </div>
                            </SwiperSlide>   
                        ))}
                    </Swiper>
                </div>
                <div className="w-full h-px bg-zinc-800 my-4" />
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