import React, { useState, useEffect } from "react"
import { ethers } from "ethers";

import TheForge from "../contracts/TheForge.json";
import Anvil from "../contracts/AnvilTheForge.json";

const CONTRACT_ADDRESS_THEFORGE = "0xE5868B98E594510788F469ec5ca0440FCAb05873";
const CONTRACT_ADDRESS_ANVIL = "0x619f82bf98423cd8BD31B5Cd26BeCBA095EC2b43";

const HARDHAT_ID = '1337';
const RINKEBY_ID = '4';


const _connectWallet = async (stateManagement) => {
  const { setAccount, setNetworkError, resetState } = stateManagement;

  try {

    const [selectedAddress] = await window.ethereum.enable();

    console.log(selectedAddress)
    if (window.ethereum.networkVersion !== HARDHAT_ID && window.ethereum.networkVersion !== RINKEBY_ID) {
      setNetworkError("Please connect Metamask to LocalHost:8545 or Rinkeby")

      return;
    }


    _initialize(selectedAddress, stateManagement);

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return resetState();
      }
      
      _initialize(newAddress, stateManagement);
    });
    
    // We reset the dapp state if the network is changed
    window.ethereum.on("networkChanged", ([networkId]) => {
      resetState();
    });

    setAccount(selectedAddress);

  } catch (error) {
    console.log(error);
  }
}


const _initialize = (selectedAddress, stateManagement) => {
  const { setAccount } = stateManagement;

  setAccount(selectedAddress);

  _intializeEthers(selectedAddress, stateManagement);
}

const _intializeEthers = async (selectedAddress, stateManagement) => {
  const { setHasHammer, setTheForgeSC, setHasAnvil, setAnvilSC } = stateManagement;
  try {

    // We initialize ethers by creating a provider using window.ethereum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const theForgeContract = new ethers.Contract(CONTRACT_ADDRESS_THEFORGE, TheForge.abi, signer);
    const anvilContract = new ethers.Contract(CONTRACT_ADDRESS_ANVIL, Anvil.abi, signer);
    console.log(selectedAddress)
    const balanceHammer = await theForgeContract.balanceOf(selectedAddress, 0);
    const balanceAnvil = await anvilContract.balanceOf(selectedAddress);

    setTheForgeSC(theForgeContract);
    setAnvilSC(anvilContract);

    console.log("balance for anvil ", balanceAnvil, balanceAnvil > 0);

    if (balanceHammer > 0) setHasHammer(true);

    if (balanceAnvil > 0) setHasAnvil(true);

  } catch(error) {
    console.log(error);
  }
}

export default _connectWallet;
