import './styles/App.css';
import { ethers } from "ethers";
import React, { useState, useEffect } from "react"

// Components with logic
import MintingHammer from './components/MintingHammer.js';
import TheRegister from './components/TheRegister.js';

// Components without any logic, they are just presentational ones
import { NoWalletDetected } from "./components/presentationals/NoWalletDetected";
import { ConnectWallet } from './components/presentationals/ConnectWallet';
import { NetworkErrorMessage } from './components/presentationals/NetworkErrorMessage'; 
import _connectWallet from './components/Initialize.js'

import TheForge from "./contracts/TheForge.json";
import Anvil from "./contracts/AnvilTheForge.json";

const CONTRACT_ADDRESS_THEFORGE = "0xE5868B98E594510788F469ec5ca0440FCAb05873";
const CONTRACT_ADDRESS_ANVIL = "0x619f82bf98423cd8BD31B5Cd26BeCBA095EC2b43";

function App() {
  
  const { ethereum } = window;
  const [ account, setAccount ] = useState(undefined);
  const [ hasHammer, setHasHammer ] = useState(false);
  const [ theForgeSC, setTheForgeSC ] = useState(false);
  const [ hasAnvil, setHasAnvil ] = useState(false);
  const [ anvilSC, setAnvilSC ] = useState(false);
  const [ networkError, setNetworkError ] = useState(undefined);
  const [ txBeingSent, setTxBeingSent ] = useState(undefined)
  const [ transactionError, setTransactionError ] = useState(undefined)

  const resetState = () => {
    setAccount(undefined)
    setTxBeingSent(undefined)
    setTransactionError(undefined)
    setNetworkError(undefined)
    setHasHammer(false)
    setHasAnvil(false)
  }

  // This method just clears part of the state.
  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  }

  if (ethereum === undefined) {
    return <NoWalletDetected />;
  }

  if (!account) {
    return (
      <ConnectWallet 
        connectWallet={() => {
           _connectWallet({
             setAccount,
             setHasHammer,
             setTheForgeSC,
             setHasAnvil,
             setAnvilSC,
             setNetworkError,
             resetState
           })
        }} 
        networkError={networkError}
        dismiss={() => _dismissNetworkError()}
      />
    );
  }

  if (hasHammer) {
    return (
      <div>
        <p className="text-md mb-10 text-center">{account}</p>
        <TheRegister />
      </div>
    );
  }

  if (!hasAnvil) {
    return (
      <div className="bg-black text-white h-screen overflow-scroll">
        <div className="flex flex-col pt-20">
          <p className="text-6xl bold mb-10 text-center">The Forge summons</p>
          <p className="text-md mb-10 text-center">{account}</p>
          <p className="text-3xl semibold mb-10 text-center">The rules</p>
          <p className="ml-36 mb-5">Anvil ownership unlocks 3 summons per blacksmith:</p>
          <ul className="ml-40 mb-10 list-disc list-inside">
            <li className="mb-2">Choose wisely who you summon to The Forge.</li>
            <li className="mb-2">The summoned person will receive a hammer NFT.</li>
            <li className="mb-2">This hammer NFT opens an application form to join The Forge. It doesn’t grant access to The Forge.</li>
            <li className="mb-2">Our knights review the application.</li>
            <li className="mb-2">If the application is accepted, the person joins The Forge as an apprentice.</li> 
            <li className="mb-2">Successful apprenticeship unlocks anvil ownership.</li>
            <li className="mb-2">If the application isn’t accepted, the person can sell the hammer NFT on the secondary market.</li>
          </ul>
          <div className="mt-6 text-center">
            <MintingHammer />
          </div>
        </div>
      </div>
    );

    }

  return (
      <div className="bg-black text-white h-screen overflow-scroll">
        <div className="flex flex-col pt-20">
          <p className="text-6xl bold mb-10 text-center">The Forge</p>
          <p className="text-md mb-10 text-center">{account}</p>
          <p className="text-3xl semibold mb-10 text-center">You have no anvil, no hammer</p>
          <p className="text-3xl semibold mb-10 text-center">come back when you have one you morron</p>
        </div>
      </div>
  )
}

export default App;
