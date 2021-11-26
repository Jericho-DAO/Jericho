  import { ethers } from "ethers";
import React, { useState, useEffect } from "react"


const MintingHammer = (state) => {
    
  const { ethereum } = window;
  const [ addressInvitee, setAddressInvitee ] = useState("");

  const { hasInvite, theForgeSC } = state.props;

  const mintHammer = async () => {
    try {
      if (ethereum) {
        if(ethers.utils.isAddress(addressInvitee)) {
          console.log("Going to pop wallet now to pay gas...")
          let tx = await theForgeSC.mint(addressInvitee);
          console.log("Mining...please wait.")
          await tx.wait()
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`);
        } else (alert("Enter a valid address"));
      } else {console.log("We need ethereum");}
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasInvite > 0 ) {
      mintHammer();
    } else {alert("Sorry, you have no invitation left")}
  }
  // max-w-md sm:max-w-xl
  return (
    <div className="flex flex-row">
      <div class="flex-grow w-16"></div>
      <div class="flex-shrink w-3/5 h-auto">
        <form className="flex flex-col items-center">
          <div className="bg-white rounded w-full px-5 pt-6 pb-8 mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="invitation"
            >
              Who will you summon?
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 text-black rounded-lg  py-2 px-4 flex w-full appearance-none leading-normal"
              type="string"
              id="invitation"
              onChange={(e) => setAddressInvitee(e.target.value)}
              value={addressInvitee}
              placeholder="Insert wallet address..."
            />
          </div>
          <button className="bg-white hover:bg-gray-400 box-border h-16 text-black text-base w-auto px-8 font-bold rounded" onClick={handleSubmit}>
            Summon
          </button>
        </form>
      </div>
      <div class="flex-grow w-16"></div>
    </div>
  )
}

export default MintingHammer;
