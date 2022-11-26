const hre = require("hardhat")

const runScript = async () => {
  const FundTransferContract = await hre.ethers.getContractFactory('FundTransfer')
  const FundTransferContractInstance = await FundTransferContract.deploy()
  await FundTransferContractInstance.deployed()

  console.log("Contract address", FundTransferContractInstance.address)

  // add fund to contract from deployer's wallet
  await FundTransferContractInstance.receiveEther({value: 20000000000})

  const receiverBalance1 = await hre.ethers.provider.getBalance("0x57a7134E58c279506282ab9211F6d9C14ab28AB1")
  
  const tx = await FundTransferContractInstance.transferEther("0x57a7134E58c279506282ab9211F6d9C14ab28AB1", 10000000000)
  // get the event emitted
  const txReceipt = await tx.wait()
  console.log(txReceipt.events.filter((x) => {return x.event == "ETransferEther"}))

  const receiverBalance2 = await hre.ethers.provider.getBalance("0x57a7134E58c279506282ab9211F6d9C14ab28AB1")
  console.log(receiverBalance1, receiverBalance2)
}

runScript().catch((error) => {
  console.log(error)
  process.exitCode = 1
})