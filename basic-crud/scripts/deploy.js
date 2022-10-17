const hre = require("hardhat");

async function main() {
  // get the contract
  const BasicCrudContract = await hre.ethers.getContractFactory("BasicCrud");

  // create a instance of the crud and deploy
  const BasicCrudInstance = await BasicCrudContract.deploy();
  await BasicCrudInstance.deployed();

  // read the public variable (public variable are getter functions by default)
  const employeeCountBefore = await BasicCrudInstance.employeeCount()

  // add a employee using the function created in contract 
  await BasicCrudInstance.addEmployee("Saravana", 23, "saravana.jn@developer.com", "0xd5e94701BF42d6926d2E92Ea2F00f3443f4263A0")

  const employeeCountAfter = await BasicCrudInstance.employeeCount()
  console.log(employeeCountBefore,employeeCountAfter)

  // read the public variable (if dynamic sized / custom type we need to pass args to get the value. All values cannot be got at once)
  const employeeDetails = await BasicCrudInstance.Employees(0)
  console.log(employeeDetails)

  // updating the details using function created in contract
  await BasicCrudInstance.updateEmployee("saravana.jn@developer.com", "Saravana.JN")

  const updatedEmployeeDetails = await BasicCrudInstance.Employees(0)
  console.log(updatedEmployeeDetails)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
