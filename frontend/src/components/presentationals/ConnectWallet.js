import React from "react";
import logo from "../../images/Logo.png";
import { NavBar } from "./NavBar"
import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ networkError, dismiss }) {
  return (
    <div className="bg-black text-white">
      <div className="flex flex-col items-center">
        <img src={logo} className="w-52 h-52" alt="logo" />
        <div className="text-center">
          <h1 className="text-7xl mt-4">The Forge</h1>
          <p className="text-lg mt-6">
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
        <div className="text-lg p-4 text-center">
          <p>Please connect to your wallet.</p>
        </div>
      </div>
    </div>
  );
}
