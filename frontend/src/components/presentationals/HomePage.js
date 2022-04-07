import React from "react";
import { Notification } from "./Notification";
import { ethers } from "ethers";
import anvil_emoji from "../../images/anvil_emoji.png";
import Hammer_emoji from "../../images/Hammer_emoji.png";
import { NavLink } from 'react-router-dom';

function MintButton() {
  return (
    <NavLink to="/mint">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 mt-6 border border-transparent text-lg
                  font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-300"
      >
        <img src={anvil_emoji} className="w-5 h-5 sm:w-8 sm:h-8 mr-3" alt="anvil" />
        Mint
      </button>
    </NavLink>
  )
}

function JoinButton() {
  return (
    <NavLink to="/join">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 mt-6 border border-transparent text-lg
                  font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-300"
      >
        <img src={Hammer_emoji} className="w-5 h-5 sm:w-8 sm:h-8 mr-3" alt="hammer" />
        Join
      </button>
    </NavLink>
  )
}

export function HomePage({ networkError, dismiss, account, hasInvite, hasHammer, hasAnvil }) {

  function displayConnected() {

    if (hasAnvil || hasHammer) {
      return (
        <div className="text-lg p-4 text-center">
          <div className="mt-10 md:mt-1 p-2 px-6 rounded text-center text-white ">
            <p>You are the proud owner of {hasAnvil ? "an Anvil " : ""} {(hasAnvil && hasHammer) ? "and " : ""} {hasHammer ? "a Hammer" : ""}</p>
            {hasAnvil ? (<div>You have {hasInvite} invitation{hasInvite > 1 ? "s" : ""} left </div>) : ""}


            {hasAnvil ? MintButton() : JoinButton()}

          </div>
        </div>
      )
    }

    return ("You have no Anvil nor Hammer")
  }

  function displayNotConnected() {
    return (
      <div className="text-lg p-4 text-center">
        <p>Please connect to your wallet.</p>
      </div>
    )
  }

  return (
    <div className="bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <div className="flex flex-row justify-center space-x-12 mb-0 mt-16 sm:mt-16">
            <img src={anvil_emoji} className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" alt="anvil" />
            <img src={Hammer_emoji} className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" alt="hammer" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl bold mt-4">Jericho</h1>
          <p className="text-lg sm:text-xl mt-6 mx-6 sm:mb-10">
            Where web3 builders meet, learn, and build together.
          </p>

        </div>

        {account ? displayConnected() : displayNotConnected()}

      </div>

      {networkError && (<Notification message={networkError} dismiss={dismiss} />)}

    </div>
  );
}
