"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
export const Navigation: React.FC = () => {
    const ref = useRef<HTMLElement>(null);
    const [ isIntersecting, setIntersecting ] = useState(true);
    
    useEffect(() => {
        if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
    }, []);

    return (
        <header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/50 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-2 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/explore"
							className="duration-200 p-3 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-violet-700"
						>
							Explore
						</Link>
						<Link
							href="/map"
							className="duration-200 p-3 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-violet-700"
						>
							Map
						</Link>
					</div>

					<Link
						href="/"
						className="duration-200 text-violet-400 hover:text-zinc-100 text-3xl font-bold"
					>
						Commune AI
					</Link>
				</div>
			</div>
        </header>
    )
}