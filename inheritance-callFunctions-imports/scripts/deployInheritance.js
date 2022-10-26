const hre = require('hardhat');

async function main(){
  const Square = await hre.ethers.getContractFactory("Square");
  
  const InstanceOfSquare = await Square.deploy("I am test variable" ,10);
  await InstanceOfSquare.deployed();

  const areaAndPerimeter = await InstanceOfSquare.getAreaAndPerimeter()
  console.log(areaAndPerimeter)

  const testVariable = await InstanceOfSquare.testVariable()
  console.log(testVariable)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});