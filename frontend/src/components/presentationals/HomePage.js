import React from "react";
import logo from "../../images/Logo.png";
import { NavBar } from "./NavBar"
import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function HomePage({ networkError, dismiss, account }) {

  function displayConnected() {
    return (
      <div className="text-lg p-4 text-center">
        <p>You have X hammer and Y Anvil</p>
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
        <img src={logo} className="w-0 h-0 sm:w-52 sm:h-52" alt="logo" />
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl mt-4">The Forge</h1>
          <p className="sm:text-lg mt-6 mx-6">
            A place where crypto entrepreneurs learn, meet and buidl together.
          </p>

          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        { account ? displayConnected() : displayNotConnected() }
      </div>
    </div>
  );
}
