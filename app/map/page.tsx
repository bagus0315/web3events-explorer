"use Client"
import { Navigation } from "../components/nav";

export default function MapPage() {
    return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="w-full mx-auto mt-32 text-center text-white">
					Map
				</div>
			</div>
		</div>
    );
};