const { ethers } = require("hardhat");

const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory("TheForge");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log("Contract is deployed on:", contract.address);


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
