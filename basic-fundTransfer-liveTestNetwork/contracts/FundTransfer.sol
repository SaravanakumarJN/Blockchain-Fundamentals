// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FundTransfer{
  event ETransferEther (
    address sender,
    address receiver,
    uint amount
  );

  function transferEther(address payable receiverAddress, uint amount) external payable {
    require(address(this).balance >= amount, "Insufficient Funds");
    
    receiverAddress.transfer(amount);
    emit ETransferEther(address(this), receiverAddress, amount);
  }

  function receiveEther() external payable {}
}