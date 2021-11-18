const { ethers } = require("hardhat");

const main = async () => {
    const [owner] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory("TheForge");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log("Contract is deployed on:", contract.address);

    const accounts = [owner.address, "0x06B5cB0300F69Ef69581C42dDA9216CEf0A18a53"];
    const amounts = ["3", "3"];

    let res = await contract.addInvite(accounts, amounts);

    res = await contract.hasInvite("0x06B5cB0300F69Ef69581C42dDA9216CEf0A18a53")

    const num = new ethers.BigNumber.from(res)

    console.log("result ", num.toNumber());

    // res = await contract.mint("0x06B5cB0300F69Ef69581C42dDA9216CEf0A18a53");

    // await res.wait();


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
