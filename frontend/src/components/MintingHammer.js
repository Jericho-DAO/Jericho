import { ethers } from "ethers";
import React, { useState } from "react"
import { NetworkErrorMessage } from "./presentationals/NetworkErrorMessage";
import { WaitingForTransactionMessage } from "./presentationals/WaitingForTransactionMessage";

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const _getRpcErrorMessage = (error) => {
  if (error.data) {
    return error.data.message;
  }

  return error.message;
}

const MintingHammer = (state) => {
    
  const [ addressInvitee, setAddressInvitee ] = useState("");

  const { hasInvite, theForgeSC, networkError, setNetworkError, txBeingSent, setTxBeingSent, txSuccess, setTxSuccess } = state.props;

  const mintHammer = async () => {
    const validAddress = ethers.utils.isAddress(addressInvitee);

    if(validAddress === false) {
      setNetworkError("Enter a valid address");
      return;
    }

    try {
      setNetworkError(undefined)

      let tx = await theForgeSC.mint(addressInvitee);

      setTxBeingSent(tx.hash);

      console.log("Mining...please wait.")

      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }

      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`);

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
    <div className="flex flex-row">
      <div className="flex-shrink w-full h-auto">
        <form className="flex flex-col items-center">
          <div className="bg-white rounded w-full px-5 pt-6 pb-8 mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="invitation"
            >
              Who will you summon?
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300
                        text-black rounded-lg  py-2 px-4 flex w-full appearance-none leading-normal"
              type="string"
              id="invitation"
              onChange={(e) => setAddressInvitee(e.target.value)}
              value={addressInvitee}
              placeholder="Insert wallet address..."
            />
          </div>

          <button
            className="bg-white hover:bg-gray-400 box-border h-16 text-black text-base w-auto px-8 font-bold rounded"
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
          <NetworkErrorMessage
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
