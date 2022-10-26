const hre = require('hardhat');

async function main(){
  const ImportA = await hre.ethers.getContractFactory("ImportA");
  
  const InstanceOfImportA = await ImportA.deploy("Saravana");
  await InstanceOfImportA.deployed();

  const ImportB = await hre.ethers.getContractFactory("ImportB")

  const InstanceOfImportB = await ImportB.deploy(InstanceOfImportA.address)
  await InstanceOfImportB.deployed()

  const welcomeUserText = await InstanceOfImportB.welcomeUser()
  console.log(welcomeUserText)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});