import React from "react";
import { HomePage } from "./presentationals/HomePage.js";
import anvil_emoji from "../images/anvil_emoji.png";

// Components with logic
import MintingHammer from './MintingHammer.js';


const Summon = (state) => {

  const { account, hasAnvil, networkError, setNetworkError } = state.props;

  function displayHasAnvil() {
    return (
      <div className="mt-6 text-center">
        <MintingHammer props={state.props}/>
      </div>
    )
  }

  function displayNoAnvil() {
    return (
      <div className="flex flex-grow-0 justify-center items-center">
        <div className="text-lg semibold mt-4 md:mt-10 p-2 px-6 rounded text-center text-black bg-white">
          <p>You have no Anvil</p>
          <p>You cannot summon anyone</p>
        </div>
      </div>
    )
  }

  if (account === undefined) {
    return <HomePage
						 networkError={networkError}
						 dismiss={() => setNetworkError(undefined)}
             account={account}
					 />
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row sm:flex-col items-center my-6 sm:mt-0 space-x-4">
        <img src={anvil_emoji} className="w-14 h-14 sm:w-16 sm:h-16 lg:w-24 lg:h-24 sm:mr-4" alt="anvil" />
        <p className="text-3xl sm:text-4xl lg:text-6xl bold">The Forge summons</p>
      </div>
      <p className="text-2xl md:text-3xl semibold mb-4">The rules</p>
        <div className="flex-shrink w-auto h-auto px-6">
          Anvil ownership unlocks 3 summons per blacksmith:
          <ul className="ml-10 mt-5 list-disc list-outside">
            <div className="mb-1">
              <li>Choose wisely who you summon to The Forge.</li>
              <li>The summoned person will receive a hammer NFT.</li>
              <li>This hammer NFT opens an application form to join The Forge. It doesn’t grant access to The Forge.</li>
              <li>Our knights review the application.</li>
              <li>If the application is accepted, the person joins The Forge as an apprentice.</li> 
              <li>Successful apprenticeship unlocks anvil ownership.</li>
              <li>If the application isn’t accepted, the person can sell the hammer NFT on the secondary market.</li>
            </div>
          </ul>
        </div>
      { hasAnvil ? displayHasAnvil() : displayNoAnvil() }
    </div>
  );
}

export default Summon;
