import React from "react";
import { NetworkErrorMessage } from "./NetworkErrorMessage";
import { ethers } from "ethers";
import anvil_emoji from "../../images/anvil_emoji.png";
import Hammer_emoji from "../../images/Hammer_emoji.png";
import { NavLink } from 'react-router-dom';

export function HomePage({ networkError, dismiss, account, hasInvite, hasHammer, hasAnvil }) {

  function displayConnected() {
    
    const Ownership = () => {
      
      const SummonButton = () => {
        return (
          <NavLink to="/summon">
            <button
            type="button"
            className="inline-flex items-center px-4 py-2 mt-6 border border-transparent text-lg font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-300"
            onClick=""
            >
              <img src={anvil_emoji} className="w-0 h-0 sm:w-8 sm:h-8 sm:mr-4" alt="anvil" />
              Summon
            </button>
          </NavLink>
        )
      }

      const RegisterButton = () => {
        return (
          <NavLink to="/register">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mt-6 border border-transparent text-lg font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-300"
            >
              <img src={Hammer_emoji} className="w-0 h-0 sm:w-8 sm:h-8 sm:mr-4" alt="hammer" />
              Register
            </button>
          </NavLink>
        )
      }

      function InviteLeft() {
        return (
          <div>
            { numberInvite >0 && `You have ${numberInvite} invitation${numberInvite > 1 ? "s" : ""} left`}
          </div>)
      }
      
      if ( hasAnvil || hasHammer) {
        return (
          <>
            <p>{`You are the proud owner of ${hasAnvil ? "an Anvil " : "" } ${(hasAnvil && hasHammer) ? "and " : ""} ${hasHammer ? "a Hammer" : ""}`}</p>
            <InviteLeft/>
            { hasAnvil ? SummonButton() : RegisterButton()}
          </>
        )
      } 

      return ("You have no Anvil nor Hammer")
    }

    let numberInvite = 0;
      
    if (hasInvite._hex !== undefined ) {
      const bigNumInstance = ethers.BigNumber.from(hasInvite);
      numberInvite = bigNumInstance.toNumber();
    }
    
    return (
      <div className="text-lg p-4 text-center">
        <div className="mt-10 md:mt-1 p-2 px-6 rounded text-center text-white ">
         <Ownership />
        </div>
      </div>
    )
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
          <div className="flex flex-row justify-center space-x-10 mb-0 mt-16 sm:mt-2">
            <img src={anvil_emoji} className="w-14 h-14 sm:w-16 sm:h-16 lg:w-24 lg:h-24 sm:mr-4" alt="anvil" />
            <img src={Hammer_emoji} className="w-14 h-14 sm:w-16 sm:h-16 lg:w-24 lg:h-24 sm:mr-4" alt="hammer" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl bold">The Forge</h1>
          <p className="text-lg sm:text-xl mt-6 mx-6 mb-16">
            A place where crypto entrepreneurs learn, meet and buidl together.
          </p>

        </div>
        
        { account ? displayConnected() : displayNotConnected() }
      </div>

      {networkError && (
        <NetworkErrorMessage
          message={networkError}
          dismiss={dismiss}
        />
      )}
    </div>
  );
}
