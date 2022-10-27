// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// import 'hardhat/console.sol';

contract ErrorHandling{
  string[] public owners;

  function addOwner(address callerAddress, string memory name) external returns(bool) {
    /*
    Require (if the condition fails all the state changes and processes are undone and the remaining gas is refunded)
      checks the condition in first argument
        => if true, proceed further
        => else reverts the transaction with second argument as error message
    */
    require(callerAddress == address(this), "You are not authored to make change (Require)");
    owners.push(name); 
    return true;
  }

  function editOwner(address callerAddress, uint index, string memory name) external returns(bool) {
    /*
    Revert
      call revert with a error message to cancel the transaction
    */
   if(callerAddress == address(this)){
      owners[index] = name;
      return true;
   }
   else{
    revert("You are not authored to make change (Revert)");
   }
  }

  function checkIsAuthoredAddress(address toCheckAddress) external view returns(bool) {
    /*
    Asset (if the condition fails all the state changes and processes are undone and the remaining gas is not returned back)
      => if true, proceeds further
      => else reverts the transaction with panic error message
    */
    assert(toCheckAddress == address(this));
    return true;
  }

  function getNoOfOwners() external view returns(uint) {
    return owners.length;
  }
}