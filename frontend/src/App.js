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
    <div className="bg-black text-white h-screen overflow-scroll">
      <div className="flex flex-col pt-20">
        <p className="text-6xl bold mb-10 text-center">The Forge summons</p>
        <p className="text-3xl semibold mb-10 text-center">The rules</p>
        <p className="ml-36 mb-5">Anvil ownership unlocks 3 summons per blacksmith:</p>
        <ul className="ml-40 mb-10 list-disc list-inside">
          <li className="mb-2">Choose wisely who you summon to The Forge.</li>
          <li className="mb-2">The summoned person will receive a hammer NFT.</li>
          <li className="mb-2">This hammer NFT opens an application form to join The Forge. It doesn’t grant access to The Forge.</li>
          <li className="mb-2">Our knights review the application.</li>
          <li className="mb-2">If the application is accepted, the person joins The Forge as an apprentice.</li> 
          <li className="mb-2">Successful apprenticeship unlocks anvil ownership.</li>
          <li className="mb-2">If the application isn’t accepted, the person can sell the hammer NFT on the secondary market.</li>
        </ul>
        {/* <div className="my-4 text-center">
          <InviteForm _setSignature={setSignature}/>
        </div> */}
        {/* {signature === "" ? "" : invitLinkButton()} */}
        <div className="mt-6 text-center">
          <MintingHammer />
        </div>
      </div>
    </div>
  );
}

export default App;