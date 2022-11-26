const hre = require("hardhat")

async function runScript(){
  // by default account1 would be the owner of this contarct 
  const [account1, account2, account3] = await hre.ethers.getSigners()
  const ModifiersEventsContract = await hre.ethers.getContractFactory("ModifiersEvents")
  const ModifiersEventsContractInstance = await ModifiersEventsContract.deploy(0)
  await ModifiersEventsContractInstance.deployed()

  const owner1 = await ModifiersEventsContractInstance.owner()
  const ownerChange1 = await ModifiersEventsContractInstance.ownerChange()
  console.log(owner1, ownerChange1)

  const tx = await ModifiersEventsContractInstance.changeOwner(account2.address)

  // reading the event emitted by transaction
  const txReceipt = await tx.wait()
  console.log(txReceipt.events?.filter((x) => {return x.event == "EOwnerChange"}))

  const owner2 = await ModifiersEventsContractInstance.owner()
  const ownerChange2 = await ModifiersEventsContractInstance.ownerChange()
  console.log(owner2, ownerChange2)

  // try to change owner with unauthorised address to check the working of modifiers
  // await ModifiersEventsContractInstance.connect(account2).changeOwner(account2.address)
}

runScript().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})