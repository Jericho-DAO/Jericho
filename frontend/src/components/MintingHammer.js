import { ethers } from "ethers";
import React, { useState, useEffect } from "react"
import { Notification } from "./presentationals/Notification";
import { WaitingForTransactionMessage } from "./presentationals/WaitingForTransactionMessage";
import TheForge from "../contracts/TheForge.json";

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const _getRpcErrorMessage = (error) => {
  if (error.data) {
    return error.data.message;
  }

  return error.message;
}

// useEffect

const MintingHammer = (state) => {
    
  const [ addressInvitee, setAddressInvitee ] = useState("");

  const { hasInvite, setHasInvite, theForgeSC, networkError, setNetworkError, txBeingSent, setTxBeingSent, txSuccess, setTxSuccess } = state.props;

  useEffect(() => {
    const CONTRACT_ADDRESS_THEFORGE = "0x358d5120491daBc7F5f7A7AA812CE2d19eE65BD5";
    console.log("here", txSuccess)
    
    async function inviteCheck() {
      
      try {
        
        const [selectedAddress] = await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const theForgeContract = new ethers.Contract(CONTRACT_ADDRESS_THEFORGE, TheForge.abi, signer);
  
        const balanceInvite = await theForgeContract.hasInvite(selectedAddress);
  
        let numberInvite = 0;
        
        if (balanceInvite._hex !== undefined ) {
          const bigNumInstance = ethers.BigNumber.from(balanceInvite);
          numberInvite = bigNumInstance.toNumber();
          console.log("here2")

          if (numberInvite !== hasInvite ) {setHasInvite(numberInvite);}
        }
  
      } catch(error) {
        console.log(error);
      }
    }

    inviteCheck();

  }, [txSuccess])

  const mintHammer = async () => {
    const validAddress = ethers.utils.isAddress(addressInvitee);

    if(validAddress === false) {
      return setNetworkError("Enter a valid address");
    }

    try {
      setNetworkError(undefined)

      let tx = await theForgeSC.mint(addressInvitee);

      setTxBeingSent(tx.hash);

      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }

      setTxSuccess(tx.hash);
    } catch (error) {

      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      setNetworkError(_getRpcErrorMessage(error));
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      setTxBeingSent(undefined);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (hasInvite > 0 ) {
      mintHammer();
    } else {
      setNetworkError("Sorry, you have no invitation left");
    }
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="px-4 sm:px-8 py-3">
        <h3 className="text-lg sm:text-xl px-10 sm:px-16 md:px-24 lg:px-36 leading-6 font-medium text-black">Who will you summon?</h3>
        <div className="text-gray-600 text-base md:text-lg mt-2">
            { hasInvite >= 0 && `${hasInvite} invitation${hasInvite > 1 ? "s" : ""} left`}
        </div>
        <form className="mt-3 sm:items-center">
          <div className="w-full sm:max-w-lg">
            <label htmlFor="email" className="sr-only">
              Ethereum address
            </label>
            <input
              type="string"
              name="Ethereum address"
              id="Ethereum address"
              className="shadow-sm block py-2 px-4 w-full text-black sm:text-sm border-gray-300 border rounded-md"
              placeholder="Insert wallet address..."
              onChange={(e) => setAddressInvitee(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center px-6 py-1 sm:py-2 border border-gray-500 shadow-sm font-medium rounded-md text-black bg-white hover:bg-gray-300 sw-auto sm:text-sm"
            onClick={handleSubmit}
          >
            Summon
          </button>
        </form>
        {txBeingSent && (
          <WaitingForTransactionMessage
            message={txBeingSent}
          />
        )}

        {(networkError || txSuccess) && (
          <Notification
            message={networkError || txSuccess}
            dismiss={() => {
              if (networkError) setNetworkError(undefined)
              else setTxSuccess(undefined)
            }}
            isTxSuccess={txSuccess}
          />
        )}
      </div>
    </div>
  )
}
 
export default MintingHammer;
