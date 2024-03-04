import type { Web3event } from "../components/web3eventType";
import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";

type Props = {
	web3event: Web3event;
};

export const Article: React.FC<Props> = ({ web3event }) => {
	return (
		<Link href={`/projects/${web3event.id}`}>
			<article className="p-4 md:p-8">
				{/* <div className="w-full h-[100px]">
					<Image
						src={web3event.image}
						fill={true}
						alt={web3event.title}
					/> 
				</div> */}
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
					{web3event.title}
				</h2>
				<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{web3event.organizer}
				</p>
				<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{web3event.addr}
				</span>
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{web3event.start_time}
					</span>
					<span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />
						{web3event.click_num}
					</span>
				</div>
			</article>
		</Link>
	);
};
