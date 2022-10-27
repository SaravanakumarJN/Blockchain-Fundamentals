const hre = require('hardhat')

async function main(){
  const ErrorHandlingContract = await hre.ethers.getContractFactory("ErrorHandling")
  const ErrorHandlingContractInstance = await ErrorHandlingContract.deploy()
  await ErrorHandlingContractInstance.deployed()

  await ErrorHandlingContractInstance.addOwner(ErrorHandlingContractInstance.address, "Saravana").then(async (res) => {
    console.log("Added successfully")
    await ErrorHandlingContractInstance.owners(0).then((res) => {
      console.log(res)
    })
  }).catch((error) => {
    console.error(`Error while adding. Reason: ${error.message}`)
  })

  await ErrorHandlingContractInstance.addOwner("0xd5e94701BF42d6926d2E92Ea2F00f3443f4263A0", "Srini").then(async (res) => {
    console.log("Added successfully")
    await ErrorHandlingContractInstance.owners(1).then((res) => {
      console.log(res)
    })
  }).catch((error) => {
    console.error(`Error while adding. Reason: ${error.message}`)
  })

  await ErrorHandlingContractInstance.editOwner(ErrorHandlingContractInstance.address, 0, "Saravana JN").then(async (res) => {
    console.log("Updated successfully")
    await ErrorHandlingContractInstance.owners(0).then((res) => {
      console.log(res)
    })
  }).catch((error) => {
    console.error(`Error while updating. Reason: ${error.message}`)
  })

  await ErrorHandlingContractInstance.editOwner("0xd5e94701BF42d6926d2E92Ea2F00f3443f4263A0", 0, "Srini JN").then(async (res) => {
    console.log("Updated successfully")
    await ErrorHandlingContractInstance.owners(0).then((res) => {
      console.log(res)
    })
  }).catch((error) => {
    console.error(`Error while updating. Reason: ${error.message}`)
  })

  await ErrorHandlingContractInstance.checkIsAuthoredAddress("0xd5e94701BF42d6926d2E92Ea2F00f3443f4263A0").then(async (res) => {
    console.log("You are authored person")
  }).catch((error) => {
    console.error("You are not a authored person", error.message)
  })

  await ErrorHandlingContractInstance.checkIsAuthoredAddress(ErrorHandlingContractInstance.address).then(async (res) => {
    console.log("You are authored person")
  }).catch((error) => {
    console.error("You are not a authored person", error.message)
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})