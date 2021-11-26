import * as React from 'react';
import { useState } from "react";
import { Outlet, Routes, Route } from 'react-router-dom';

import Summon from './components/Summon';
import { NavBar } from './components/presentationals/NavBar';
import initialize from './components/Initialize.js';
import logo from "./images/Logo.png";
import { NetworkErrorMessage } from './components/presentationals/NetworkErrorMessage';
import { NoWalletDetected } from './components/presentationals/NoWalletDetected';
import TheRegister from './components/TheRegister';
import { ConnectWallet } from './components/presentationals/ConnectWallet';

export default function App() {

	const { ethereum } = window;
	const [ account, setAccount ] = useState(undefined);
	const [ hasHammer, setHasHammer ] = useState(false);
	const [ theForgeSC, setTheForgeSC ] = useState(false);
	const [ hasAnvil, setHasAnvil ] = useState(false);
	const [ anvilSC, setAnvilSC ] = useState(false);
	const [ hasInvite, setHasInvite ] = useState(false);
	const [ networkError, setNetworkError ] = useState(undefined);
	const [ txBeingSent, setTxBeingSent ] = useState(undefined)
	const [ transactionError, setTransactionError ] = useState(undefined);

	const resetState = () => {
		setAccount(undefined)
		setTxBeingSent(undefined)
		setTransactionError(undefined)
		setNetworkError(undefined)
		setHasHammer(false)
		setHasAnvil(false)
		setHasInvite(false)
	}
	
	// This method just clears part of the state.
	const dismissNetworkError = () => {
		setNetworkError(undefined);
	}

	if (ethereum === undefined) {
		return <NoWalletDetected />;
	}

	const connectWallet = () => {
		initialize({
			setAccount,
			setHasHammer,
			setTheForgeSC,
			setHasAnvil,
			setAnvilSC,
			setHasInvite,
			setNetworkError,
			resetState
		})
	}

	const HomePage = () => {
		
		if (account === undefined) {
			return <ConnectWallet networkError={networkError} dismiss={() => dismissNetworkError()}/>
		}

		return (
			<div>
				<div className="flex flex-col items-center">
					<img src={logo} className="w-52 h-52" alt="logo" />
					<div className="text-center">
						<h1 className="text-7xl mt-4">The Forge</h1>
						<p className="text-lg mt-6">
							A place where crypto entrepreneurs learn, meet and buidl together.
						</p>
						<p className="text-lg p-4 text-center">You have X and Y hammer</p>
					</div>
				</div>
			</div>
		)
	}

	const Layout = () => {
		return (
			<div className="bg-black text-white h-screen">
				<NavBar
					connectWallet={connectWallet}
					account={account}
				/>
					<Outlet />
			</div>
		);
	}
	console.log("ham", hasHammer);

	return (
		<Routes>
			<Route  element={<Layout />}>
				<Route 
					path="/"
					element={<HomePage/>}
				/>
				<Route path="summon" element={<Summon props={ { account, hasAnvil, hasInvite, theForgeSC, networkError, dismissNetworkError } }/>} />
				<Route path="register" element={<TheRegister props={ { hasHammer, account, networkError, dismissNetworkError } }/>} />
				<Route
					path="*"
					element={
						<main className="bg-black text-white overflow-scroll">
								<p className="text-3xl semibold mt-20 text-center">There's nothing here!</p>
						</main>
					}
				/>
			</Route>
		</Routes>
	)
}
