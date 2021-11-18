import { ethers } from "ethers";
import React, { useState, useEffect } from "react"
import TheForge from "./../contracts/TheForge.json";

const CONTRACT_ADDRESS_THEFORGE = "0xcCF0673d78C07Be1FEb9c425BaEeCB2422b14Bd3";

const MintingHammer = () => {
    
    const { ethereum } = window;
    const [invitationMinting, setInvitationMinting] = useState("");
    
    const verify = async (splitInvite) => {
      try {
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const addressUser = await signer.getAddress();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS_THEFORGE, TheForge.abi, signer);
  
  
          console.log("Going to pop wallet now to pay gas...")
          let tx = await connectedContract.safeMint(addressUser, splitInvite[0], splitInvite[1]);
          console.log("Mining...please wait.", tx)
          await tx.wait()
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`);
        } else {console.log("We need ethereum dude");}
      } catch (error) {
        console.log(error);
      }
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const splitInvite = invitationMinting.split(",", 2);
      console.log("split", splitInvite[0], splitInvite[1]);
      verify(splitInvite);
    }
    
    return (
      <form className="">
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="invitation"
          >
            Who will you summon?
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 text-black rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="string"
            id="invitation"
            onChange={(e) => setInvitationMinting(e.target.value)}
            value={invitationMinting}
            placeholder="Insert wallet address..."
          />
        </div>
        <button className="bg-white hover:bg-gray-400 box-border h-16 w-48 text-black text-base font-bold mb-10 rounded" onClick={handleSubmit}>
          Summon
        </button>
      </form>
    )
  }

export default MintingHammer;