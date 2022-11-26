const hre = require("hardhat");

async function main() {
  const StringManipulation = await hre.ethers.getContractFactory("StringManipulation");
  const stringManipulation = await StringManipulation.deploy();
  await stringManipulation.deployed();

  const length = await stringManipulation.length('saravana')
  console.log(length)

  const isSameString1 = await stringManipulation.compareStrings('saravana', 'saravana')
  console.log(isSameString1)

  const isSameString2 = await stringManipulation.compareStrings('Saravana', 'saravana')
  console.log(isSameString2)

  const concatString = await stringManipulation.concatenateStrings("Saravana", "kumar")
  console.log(concatString)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
