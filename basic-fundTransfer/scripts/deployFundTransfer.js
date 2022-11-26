const hre = require("hardhat")

const runScript = async () => {
  const [deployer, receiver] = await hre.ethers.getSigners()

  const FundTransferContract = await hre.ethers.getContractFactory('FundTransfer')
  const FundTransferContractInstance = await FundTransferContract.deploy()
  await FundTransferContractInstance.deployed()

  // add fund to contract
  await FundTransferContractInstance.receiveEther({value: 2})

  const receiverBalance1 = await hre.ethers.provider.getBalance(receiver.address)
  
  const tx = await FundTransferContractInstance.transferEther(receiver.address, 1)
  // get the event emitted
  const txReceipt = await tx.wait()
  console.log(txReceipt.events.filter((x) => {return x.event == "ETransferEther"}))

  const receiverBalance2 = await hre.ethers.provider.getBalance(receiver.address)
  console.log(receiverBalance1, receiverBalance2)
}

runScript().catch((error) => {
  console.log(error)
  process.exitCode = 1
})