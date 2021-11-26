import React from "react";
import { ConnectWallet } from "./presentationals/ConnectWallet";

const TheRegister = (state) => {

  const { hasHammer, account, networkError, _dismissNetworkError } = state.props;
  console.log("hammer!", hasHammer)

  if (account === undefined) {
    return <ConnectWallet networkError={networkError} dismiss={() => _dismissNetworkError()}/>
  }

  if (hasHammer) {
    return (
      <div className="bg-black text-white overflow-scroll">
        <div className="flex flex-row">
          <div class="flex-grow w-16"></div>
          <div class="flex-shrink w-4/5 h-auto">
            <p className="text-6xl bold my-8 text-center">The Register</p>
            <p className="text-xl text-center mb-10">Congratulations, you are a proud owner of a hammer.</p>
            <iframe 
              className=""
              src="https://airtable.com/embed/shr8SeKKTQlnJJpO4?backgroundColor=gray" 
              frameborder="0" onmousewheel="" width="100%" height="2000" 
            />
          </div>
          <div class="flex-grow w-16"></div>
        </div>
      </div>
      );
    }

  return (
    <div className="bg-black text-white overflow-scroll">
      <div className="flex flex-col pt-20">
        <p className="text-6xl bold mb-10 text-center">The Forge</p>
        <p className="text-3xl semibold mb-10 text-center">You have no hammer</p>
        <p className="text-3xl semibold mb-10 text-center">come back when you have one you morron</p>
      </div>
    </div>
  )
}

export default TheRegister;
