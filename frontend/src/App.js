import './styles/App.css';
import React, { useState, useEffect } from "react"
import InviteForm from './components/InviteForm';
import MintingHammer from './components/MintingHammer.js';
import { ConnectWallet } from './components/ConnectWallet';
import { NetworkErrorMessage } from './components/NetworkErrorMessage'; 

function App() {
  
  const { ethereum } = window;
  const [ account, setAccount ] = useState(undefined);
  const [signature, setSignature] = useState("");
  const [clipboard, setClipboard] = useState(false);
  const [networkError, setNetworkError] = useState(undefined);

  const checkupWallet = async () => {  
    if(!ethereum) {
      console.log("You need to install Metamask");
      alert("Get metamask");
        return;
    }
    else {console.log("We have Metamask");}

    const ethAccount = await ethereum.request({ method: 'eth_accounts' });
    console.log("account", ethAccount);

    if (ethAccount.length !== 0) {
      setAccount(ethAccount[0]);
      console.log("Account connected")
      //setupEventListener();
    }
    else {console.log("no account connected")};
    
  };

  const _connectWallet = async () => {

    try {

      if (!ethereum) {
        alert("Get metamask");
        return;
        }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts);
      setAccount(accounts[0]);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    checkupWallet();
  }, []);

  const invitLinkButton = () => {
    return (
      <>
        <div className="bg-white text-black overflow-x-scroll rounded px-6 pt-2 pb-2 mb-4  max-w-md mx-auto sm:max-w-xl">
          <button className="text-left">
            {signature === "" ? "": "Your invitation link: " + signature }
          </button>
        </div>
        <button onClick={() => {
          navigator.clipboard.writeText(signature);
          setClipboard(true);}}>
          {clipboard ? "Copied!" : "Copy to clipboard"}
        </button>
      </>
    )
  }

  // This method just clears part of the state.
  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  }

  if (!account) {
    return (
      <ConnectWallet 
        connectWallet={() => _connectWallet()} 
        networkError={networkError}
        dismiss={() => _dismissNetworkError()}
      />
    );
  }


  return (
    <div className="bg-black text-white h-screen overflow-scroll text-center">
      <div className="flex flex-col justify-start pt-20">
        <p className="text-6xl bold mb-10">The Forge summons</p>
        <p className="text-3xl semibold mb-10">The rules</p>
        <p>Anvil ownership unlocks 3 summons per blacksmith:</p>
        <div className="my-4">
          <InviteForm _setSignature={setSignature}/>
        </div>
        {signature === "" ? "" : invitLinkButton()}
        <div className="mt-6">
          <MintingHammer />
        </div>
      </div>
    </div>
  );
}

export default App;