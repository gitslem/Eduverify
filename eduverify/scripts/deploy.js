const { ethers } = require("hardhat");

async function main() {
  const EduVerify = await ethers.getContractFactory("EduVerify");
  const eduVerify = await EduVerify.deploy();
  await eduVerify.waitForDeployment(); // Wait for the contract to be mined
  const address = await eduVerify.getAddress(); // Get the deployed contract address
  console.log("EduVerify deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});