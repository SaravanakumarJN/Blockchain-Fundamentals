const { expect } = require("chai")
const hre = require("hardhat")

describe("Testsuit for ErrorHandling Contract", async () => {
  let ErrorHandlingContractInstance;
  
  /*
    Before running testcases initialising and deploying the contract
  */
  before(async () => {
    const ErrorHandlingContract = await hre.ethers.getContractFactory("ErrorHandling")
    ErrorHandlingContractInstance = await ErrorHandlingContract.deploy()
    await ErrorHandlingContractInstance.deployed()
  })

  it('Check addOwner function', async () => {
    let toAdd = "Saravana"
    let txReceipt = await ErrorHandlingContractInstance.addOwner(ErrorHandlingContractInstance.address, toAdd)
    // Waiting as it is a transaction function
    await txReceipt.wait()
    
    // No waiting required as it is a view function
    let lastElement = await ErrorHandlingContractInstance.getNoOfOwners()
    lastElement = Number(lastElement) - 1
    let owner0 = await ErrorHandlingContractInstance.owners(lastElement)

    // Checking is last element in array is the newly added element
    expect(owner0).to.equal(toAdd)
  })
})