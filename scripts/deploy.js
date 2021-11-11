const { ethers } = require("hardhat");

const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory("TheForge");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log("Contract is deployed on:", contract.address);

    let setAddress = await contract._setAddressVerifySignature("0xb856f896c560eF1e1CdBad9F66BeB3c8B264Fd26");

    await setAddress.wait();

    // let minting2 = await contract.makeAnEpicNFT();

    // await minting2.wait();


};

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();