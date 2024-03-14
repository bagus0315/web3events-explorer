import { CityEventType } from "@/app/components/cityEventType";
import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";

type Props = {
	web3event: CityEventType;
};

export const Article: React.FC<Props> = ({ web3event }) => {
	
	return (
		<Link href={`/explore/${web3event.id}`}>
			<article className="p-3 md:p-4">
				<div className="w-full h-[200px] relative rounded-lg overflow-hidden">
					<Image
						src={web3event.image}
						fill={true}
						alt={web3event.title}
						className="hover:brightness-50"
					/> 
				</div>
				<div className="min-h-[50px] lg:min-h-[60px]">
					<h2 className="z-20 mt-4 text-lg font-medium duration-1000 lg:text-xl text-zinc-300 
						group-hover:text-white font-display"
					>
						{web3event.title}
					</h2>
				</div>
				<p className="mt-2 z-20 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200 line-clamp-1">
					{web3event.organizer}
				</p>
				<span className="mt-2 text-xs duration-1000 text-zinc-300 group-hover:text-white 
					group-hover:border-zinc-200 drop-shadow-orange line-clamp-1"
				>
						{web3event.addr}
				</span>
				<div className="h-px w-full bg-zinc-700 my-2"></div>
				<div className="my-3 flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-300 group-hover:text-white 
						group-hover:border-zinc-200 drop-shadow-orange"
					>
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
