"use client"
import React, { useEffect, useState } from "react";
import { Navigation } from "@/app/components/nav";
import { LoadingComponent } from "@/app/components/loading";
import axios from "axios";
import { CityDataType, CityEventType } from "@/app/components/cityEventType";
import InfiniteScroll from "react-infinite-scroll-component";
import { GlobeIcon, CaptionsIcon } from "lucide-react";
import { Card } from "@/app/components/card";
import { Article } from "../article";
import cls from "classnames";

interface PageProps {
	params: {
		id: number;
	};
}

const Page: React.FC<PageProps> = ({ params }) => {

	const { id } = params;

	const [ isLoading, setLoading ] = useState(true);
	const [ cityData, setCityData ] = useState<CityDataType>();
	const [ cityEvent, setCityEvent ] = useState<CityEventType[]>([]);
	const [ pages, setPages ] = useState<number>(0);
	const [ status, setStatus ] = useState<number>(1);
	const [ queryType, setQueryType ] = useState<number>(0);
	const [ fetchFull, setFetchFull ] = useState(false)

	const fetchCityData = async (id: number) => {
		try {
			const result = await axios.get(`/api/city/`,{
				params: {
					id: id
				}
			});
			setCityData(result.data.data);
		} catch (error) {
			console.error('Error fetching city data list:', error);
			throw error;
		}
	}

	const fetchCityEvent = async (city: string, pages: number, status:number, queryType: number) => {
		const data = {
			"city": city,
			"pages": pages,
			"page_size": 20,
			"keywords": "",
			"topic": null,
			"pay": null,
			"status": status,
			"query_type": queryType
		};
		try {
			const result: any = await axios.post(`/api/city`,data);
			return result.data.data;
		} catch (error) {
			console.error('Error fetching city events data list:', error);
			throw error;
		};
	}

	const fetchInitialData = async () => {
		if (cityData !== undefined) {
			const web3eventList: CityEventType[] = await fetchCityEvent(cityData?.city_id, 0, status, queryType);
			if (Array.isArray(web3eventList) && web3eventList.length !== 0) {
				setCityEvent(web3eventList);
				setPages(1)
				setFetchFull(true)
				setLoading(false)
			} else {
				setLoading(true)
				setCityEvent([])
			}
		}
	}

	const fetchMoreData = async () => {
		if (cityData !== undefined) {
			const web3eventList: CityEventType[] = await fetchCityEvent(cityData?.city_id, pages, status, queryType);
			setPages(pages + 1)
			if (cityEvent !== undefined) {
				if (Array.isArray(web3eventList) && web3eventList.length !== 0) {
					setCityEvent([...cityEvent, ...web3eventList]);
					setLoading(false)
				} else if (web3eventList === null) {
					setFetchFull(false)
				} else {
					setLoading(true)
				}
			} else {
				setLoading(true)
				setCityEvent([])
			}            
		}
	}

	const fetchSortData = async (newStatus: number, newQueryType: number) => {
		if (cityData !== undefined) {
			const web3eventList: CityEventType[] = await fetchCityEvent(cityData.city_id, 0, newStatus, newQueryType);
			if (Array.isArray(web3eventList) && web3eventList.length !== 0) {
				setCityEvent(web3eventList);
				setPages(1)
				setFetchFull(true)
				setStatus(newStatus)
				setQueryType(newQueryType)
				setLoading(false)
			} else {
				setLoading(true)
				setCityEvent([])
			}
		}
	}

	useEffect(() => {
		fetchCityData(id);
	},[])

	useEffect(() => {
		fetchInitialData()
	}, [ cityData, status, queryType ])

	return (
		<div>
			<Navigation/>
			<div>
		{
			!isLoading
			? <div className="px-6 pt-[100px] mx-auto max-w-[100rem] lg:px-8">
				<div className="flex gap-8 relative overflow-hidden">
					<img src={cityData?.image} alt={cityData?.name} className="absolute w-full h-full -z-10 blur-2xl" />
					<div className="absolute w-full h-full -z-10 bg-[#000000] opacity-45"/>
					<div className="w-[50%]">
						<div className=" rounded-2xl overflow-hidden">
							<img src={cityData?.image} alt={cityData?.name} />
						</div>
					</div>
					<div className="w-[50%] p-2">
						<h2 className="text-4xl font-bold text-zinc-200 lg:text-4xl pt-7 pb-4">
							Events in {cityData?.name} 
						</h2>
						<div className="w-full flex items-center py-4">
							<GlobeIcon size={30} color="#ddd" strokeWidth={2} />
							<div className=" text-xl text-zinc-300 ml-2">Time Zone: {cityData?.timezone}</div>
						</div>
						<div className="w-full h-px bg-zinc-500"/>
						<div className="w-full flex items-center py-4">
							<CaptionsIcon size={30} color="#ddd" strokeWidth={2} />
							<div className=" text-xl text-zinc-300 ml-2">Events: {cityData?.count} in total</div>
						</div>
						<div className="w-full h-px bg-zinc-500"/>
					</div>
				</div>
				<div className=" h-20"/>
				<div className="w-full mb-4 flex justify-start items-center mr-8">
					<div className="flex justify-start gap-3">
						<div className={cls("rounded-lg font-semibold px-3 py-2 text-center cursor-pointer hover:bg-violet-700 w-24",`${queryType == 0 ? "bg-violet-700 text-zinc-200": "bg-zinc-800 bg-opacity-70 text-zinc-300"}`)} onClick={() => {fetchSortData(1, 0)}}>Time</div>
						<div className={cls("rounded-lg font-semibold px-3 py-2 text-center cursor-pointer hover:bg-violet-700 w-24",`${queryType == 3 ? "bg-violet-700 text-zinc-200": "bg-zinc-800 bg-opacity-70 text-zinc-300"}`)} onClick={() => {fetchSortData(1, 3)}}>Hot</div>
						<div className={cls("rounded-lg font-semibold px-3 py-2 text-center cursor-pointer hover:bg-violet-700 w-24",`${queryType == 2 ? "bg-violet-700 text-zinc-200": "bg-zinc-800 bg-opacity-70 text-zinc-300"}`)} onClick={() => {fetchSortData(1, 2)}}>New</div>
					</div>
				</div>
				<InfiniteScroll
					dataLength={cityEvent.length}
					next={fetchMoreData}
					hasMore={fetchFull}
					scrollThreshold={1}
					loader={<h4>Loading...</h4>}
				>
					<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-4">
						{cityEvent.map((cityEvent, key) => (
							<div key={key} className="grid grid-cols-1 gap-4">
								<Card key={1}>
									<Article web3event={cityEvent} />
								</Card>
							</div>
						))}
					</div>
				</InfiniteScroll>
			</div>
			: <LoadingComponent/>
		}
		</div>
		</div>
	);
};

export default Page;