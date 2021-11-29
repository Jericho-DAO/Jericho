import React from "react";
import { HomePage } from "./presentationals/HomePage";
import Hammer_emoji from "../images/Hammer_emoji.png";

const TheRegister = (state) => {

  const { hasHammer, account, networkError, setNetworkError } = state.props;

  if (account === undefined) {
    return <HomePage
						 networkError={networkError}
						 dismiss={() => setNetworkError(undefined)}
             account={account}
					 />
  }

  function displayHasHammer() {
    return (
      <div>
        <p className="sm:text-xl text-center mb-6 sm:mb-8">Congratulations, you are a proud owner of a hammer.</p>
        <iframe 
          title="Airtable the register"
          src="https://airtable.com/embed/shr8SeKKTQlnJJpO4?backgroundColor=gray" 
          frameBorder="0" width="100%" height="2000" 
        />
      </div>
    )
  }

  function displayNoHammer() {
    return (
      <div className="flex flex-grow-0 justify-center items-center">
        <div className="text-lg semibold mt-4 md:mt-10 p-2 px-6 rounded text-center text-black bg-white">
          <p>You have no Hammer</p>
          <p>Sorry but you cannot register</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex-shrink w-11/12 sm:w-8/12 h-auto">
        <div className="flex flex-row sm:flex-col items-center justify-center my-6 sm:mt-0 space-x-4">
          <img src={Hammer_emoji} className="w-14 h-14 sm:w-16 sm:h-16 lg:w-24 lg:h-24 sm:mr-4" alt="hammer" />
          <p className="text-3xl sm:text-4xl lg:text-6xl bold">The Register</p>
        </div>

        { hasHammer ? displayHasHammer() : displayNoHammer() }

      </div>
    </div>
  );
}

export default TheRegister;
