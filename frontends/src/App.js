import './styles/App.css';
import React, { useState, useEffect } from "react"
import InviteForm from './components/InviteForm';
import MintingHammer from './components/MintingHammer.js';

function App() {
  
  const { ethereum } = window;
  const [ account, setAccount ] = useState("");

  const [signature, setSignature] = useState("");
  const [clipboard, setClipboard] = useState(false);

  const checkupWallet = async () => {  
    if(!ethereum) {
      console.log("Yu need to install Metamask");
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

  const connectWallet = async () => {

    try {

      if (!ethereum) {
        alert("Get metamask");
        return;
        }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts);
      setAccount(accounts[0]);
      //setupEventListener();

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkupWallet();
  }, []);

  const renderNotConnectedContainer = () => (
    <button className="bg-white hover:bg-gray-400 box-border h-16 w-48 text-black text-lg font-bold mb-10 rounded" onClick= {connectWallet}>
      Connect to Wallet
    </button>
  );

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

  return (
    <div className="bg-black text-white h-screen overflow-scroll text-center">
      <div className="flex flex-col justify-start pt-20">
        <p className="text-6xl bold mb-10">The Forge - Hammer invitation</p>
        <div>
         {account === "" ? renderNotConnectedContainer() : ""}
        </div>
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