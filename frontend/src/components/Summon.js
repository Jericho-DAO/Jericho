import React from "react";
import { ConnectWallet } from "./presentationals/ConnectWallet.js";

// Components with logic
import MintingHammer from './MintingHammer.js';

const Summon = (state) => {

  const { account, hasAnvil, hasInvite, theForgeSC, networkError, _dismissNetworkError } = state.props;
  console.log("test", account, hasAnvil, hasInvite);

  if (account === undefined) {
    return <ConnectWallet networkError={networkError} dismiss={() => _dismissNetworkError()}/>
  }
  
  if (hasAnvil) {
    return (
      <div className="bg-black text-white overflow-scroll">
        <div className="flex flex-col pt-10">
          <p className="text-6xl bold mb-5 text-center">The Forge summons</p>
          <p className="text-3xl semibold mb-10 text-center">The rules</p>
          <div className="flex flex-row">
            <div class="flex-grow w-16 h-16"></div>
            <div class="flex-shrink w-3/5 h-auto">
              Anvil ownership unlocks 3 summons per blacksmith:
              <ul className="ml-10 mt-5 list-disc list-outside">
                <li className="mb-2">Choose wisely who you summon to The Forge.</li>
                <li className="mb-2">The summoned person will receive a hammer NFT.</li>
                <li className="mb-2">This hammer NFT opens an application form to join The Forge. It doesn’t grant access to The Forge.</li>
                <li className="mb-2">Our knights review the application.</li>
                <li className="mb-2">If the application is accepted, the person joins The Forge as an apprentice.</li> 
                <li className="mb-2">Successful apprenticeship unlocks anvil ownership.</li>
                <li className="mb-2">If the application isn’t accepted, the person can sell the hammer NFT on the secondary market.</li>
              </ul>
            </div>
            <div class="flex-grow w-16 h-16"></div>
          </div>
          <div className="mt-6 text-center">
            <MintingHammer props={{ hasInvite, theForgeSC }}/> 
          </div>
        </div>
      </div>
    );
    }

  return (
      <div className="bg-black text-white overflow-scroll">
        <div className="flex flex-col pt-20">
          <p className="text-6xl bold mb-10 text-center">The Forge</p>
          <p className="text-md mb-10 text-center">{account}</p>
          <p className="text-3xl semibold mb-10 text-center">You have no anvil</p>
          <p className="text-3xl semibold mb-10 text-center">come back when you have one you morron</p>
        </div>
      </div>
  )
}

export default Summon;
