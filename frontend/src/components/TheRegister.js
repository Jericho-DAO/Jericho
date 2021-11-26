import React from "react";
import { HomePage } from "./presentationals/HomePage";

const TheRegister = (state) => {

  const { hasHammer, account, networkError, dismissNetworkError } = state.props;
  console.log("hammer!", hasHammer)

  if (account === undefined) {
    return <HomePage
						 networkError={networkError}
						 dismiss={() => dismissNetworkError()}
             account={account}
					 />
  }

  function displayHasHammer() {
    return (
      <div>
        <p className="text-xl text-center mb-10">Congratulations, you are a proud owner of a hammer.</p>
        <iframe 
          title="Airtable the register"
          src="https://airtable.com/embed/shr8SeKKTQlnJJpO4?backgroundColor=gray" 
          frameBorder="0" onmousewheel="" width="100%" height="2000" 
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
    <div className="flex flex-row">
      <div className="flex-grow w-16"></div>
      <div class="flex-shrink w-4/5 h-auto">
        <p className="text-6xl bold my-8 text-center">The Register</p>
        { hasHammer ? displayHasHammer() : displayNoHammer() }
      </div>
      <div class="flex-grow w-16"></div>
    </div>
  );
}

export default TheRegister;
