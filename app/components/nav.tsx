/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ConnectButton as PolConnectButton } from 'polconnect';
import { ConnectButton as RainConnectButton} from '@rainbow-me/rainbowkit';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

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
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b
				${
					isIntersecting
						? "bg-zinc-900/50 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row items-center py-4 mx-auto">
					<Link
						href="/"
						className="duration-200 text-violet-500 hover:text-zinc-100 text-3xl font-bold mr-32 whitespace-nowrap"
					>
						Commune AI
					</Link>

					<div className="flex flex-row justify-between items-center w-full">
						<div className="flex justify-around gap-12 items-center">
							<Link
								href="/explore"
								className="duration-200 py-3 rounded-lg text-violet-500 hover:text-zinc-100 text-center font-medium text-lg"
							>
								Explore
							</Link>

							<Link
								href="/map"
								className="duration-200 py-3 rounded-lg text-violet-500 hover:text-zinc-100 text-center font-medium text-lg"
							>
								Map
							</Link>
						</div>
						<div className="flex justify-around gap-12 items-center">
							<div>
								<PolConnectButton label='Polkadot' backGround='indingo' showChain={true} />
							</div>

							<div>
								<RainConnectButton.Custom>
								{({
									account,
									chain,
									openAccountModal,
									openChainModal,
									openConnectModal,
									authenticationStatus,
									mounted,
								}) => {
									const ready = mounted && authenticationStatus !== 'loading';
									const connected =
										ready &&
										account &&
										chain &&
										(!authenticationStatus ||
											authenticationStatus === 'authenticated');

									return (
										<div
											{...(!ready && {
												'aria-hidden': true,
												'style': {
													opacity: 0,
													pointerEvents: 'none',
													userSelect: 'none',
												},
											})}
										>
										{(() => {
											if (!connected) {
												return (
													<button className="inline-flex cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 py-1.5 px-3 text-white text-lg hover:animate-scaleSlow duration-500 font-semibold w-full"
														onClick={openConnectModal} type="button">
														Ethereum
													</button>
												);
											}
											return (
												<div className='inline-flex gap-3 border border-gray-700/70 py-1 px-1 rounded-lg shadow-md'>
													<button
														className='capitalize font-medium font-sans  text-gray-200 hover:text-white flex border border-gray-700/60 rounded-lg py-1 px-3 flex items-end justify-end gap-2 cursor-pointer hover:animate-scaleSlow duration-500'
														onClick={openChainModal}
														style={{ display: 'flex', alignItems: 'center' }}
														type="button"
													>
													{chain.hasIcon && (
														<div
															style={{
																background: chain.iconBackground,
																width: 24,
																height: 24,
																borderRadius: 999,
																overflow: 'hidden',
																marginRight: 4,
															}}
														>
															{chain.iconUrl && (
																<img
																	alt={chain.name ?? 'Chain icon'}
																	src={chain.iconUrl}
																	style={{ width: 24, height: 24 }}
																/>
															)}
														</div>
													)}
													{chain.name}
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 font-semibold text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>
													</button>
													<p className="font-semibold uppercase text-gray-400 font-mono hover:text-white/75 flex items-center">
														{account.displayBalance ? ` ${account.displayBalance}`: ''}
													</p>
													<button
														className='capitalize font-medium font-sans  text-gray-300 hover:text-white flex border border-gray-700/60 rounded-lg py-1 px-3 flex items-end justify-end gap-2 cursor-pointer hover:animate-scaleSlow duration-500 '
														onClick={openAccountModal}
														type="button">
														{account.displayName}
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 font-semibold text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>
													</button>
												</div>
											);
										})()}
										</div>
										);
									}}
								</RainConnectButton.Custom>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
