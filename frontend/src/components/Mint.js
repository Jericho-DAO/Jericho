import React from "react";
import { HomePage } from "./presentationals/HomePage.js";
import anvil_emoji from "../images/anvil_emoji.png";

// Components with logic
import MintingHammer from './MintingHammer.js';
import { NavLink } from "react-router-dom";


const Mint = (state) => {

  const { account, hasAnvil, networkError, setNetworkError, hasInvite } = state.props;

  function displayHasAnvil() {
    return (
      <div className="mt-6 text-center">
        <MintingHammer props={state.props} />
      </div>
    )
  }

  function displayNoAnvil() {
    return (
      <div className="flex flex-grow-0 justify-center items-center">
        <div className="text-lg semibold mt-4 md:mt-10 p-2 px-6 rounded text-center text-black bg-white">
          <p>You have no Anvil</p>
          <p>You can't mint a Hammer</p>
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
      <div className="flex flex-row sm:flex-col items-center my-6 sm:mt-0 mb-14 space-x-4">
        <img src={anvil_emoji} className="w-14 h-14 sm:w-16 sm:h-16 lg:w-24 lg:h-24 sm:mr-4" alt="anvil" />
        <p className="text-3xl sm:text-4xl lg:text-6xl bold">Mint a Hammer</p>
      </div>
      <div className="flex-shrink mb-4 w-auto h-auto px-6">
        Invite your friends to join Jericho:
        <ul className="ml-10 mt-5 list-disc list-outside">
          <div className="mb-1">
            <li>Invites are Hammer NFTs minted on Polygon.</li>
            <li>The Hammer of Jericho doesn't give access. It's a pass to apply.</li>
            <li>Insert your friend's ETH wallet address and mint a Hammer on Polygon (use a <a href="https://matic.supply/" className="underline">faucet</a>).</li>
            <li>Tell your friend to apply via this <NavLink to="/join" className="underline">link</NavLink></li>
            <li>The Guardians of Jericho review every application.</li>
          </div>
        </ul>
      </div>
      {hasAnvil ? displayHasAnvil() : displayNoAnvil()}
    </div>
  );
}

export default Mint;
