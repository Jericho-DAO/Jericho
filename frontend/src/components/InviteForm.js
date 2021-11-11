import { ethers } from "ethers";
import React, { useState, useEffect } from "react"
import VerifySignature from "../contracts/VerifySignature.json";

const CONTRACT_ADDRESS_SIGNATURE = "0xb856f896c560eF1e1CdBad9F66BeB3c8B264Fd26";


const InviteForm = ({_setSignature}) => {

    const { ethereum } = window;
    const [addressInvit, setAddressInvit] = useState("");
    
    const getMessageHash = async () => {
      try {
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const addressUser = await signer.getAddress();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS_SIGNATURE, VerifySignature.abi, signer);
          //console.log(connectedContract);
          console.log("address", addressUser);
  
          if(ethers.utils.isAddress(addressInvit)) {
            let tx = await connectedContract.getMessageHash(addressInvit);
            //console.log("add", addressInvit, "hash", tx);
            ethereum.request({method: 'personal_sign', params: [addressUser, tx]}
              ).then((value) => {
                const invitation = addressUser + "," + value;
                console.log("singatureee", value);
                console.log("invit",invitation);
                _setSignature(invitation);
                });
          }
          else (alert("Enter a valid address"))
        } else {console.log("We need ethereum dude");}
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(addressInvit);
      getMessageHash();
    }
    
    return (
      <form className="">
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="address"
          >
            Who do you want to invit?
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 text-black rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="address"
            id="addressInvite"
            onChange={(e) => setAddressInvit(e.target.value)}
            value={addressInvit}
            placeholder="ETH address..."
          />
        </div>
        <button className="bg-white hover:bg-gray-400 box-border h-16 w-48 text-black text-base font-bold mb-4 rounded" onClick={handleSubmit}>
          Generate invitation
        </button>
      </form>
    )
  }

export default InviteForm;
