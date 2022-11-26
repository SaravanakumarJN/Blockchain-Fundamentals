// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*
Modifiers 
  - modifiers are middlewares to perform pre and post transaction logics
Events
  - events are used to send the data relatime outside blockchain (similar to socket event emitting)
Indexing
  - 'indexed' is used to index some variable that could later help in writing filter queries on that variable
  - Gas costly, and we can add only upto 3 indexing in a single event
*/

contract ModifiersEvents{
  uint public ownerChange;
  address public owner;
  bool private locked = false;

  // creating structure for event to be emitted
  event EOwnerChange (
    address prevOwner,
    address currOwner
  );

  constructor(uint _ownerChange){
    ownerChange = _ownerChange;
    owner = msg.sender;
  }

  modifier validateIsOwner(){
    /*
      _ is the same as the next() keyword in express 
        * anything above _ will be pre hook call
        * anything below _ will be post hook call
    */

   require(msg.sender == owner, "Unauthorised");
    _;
  }

  modifier validateAddress(address newOwnerAddress){
    require(newOwnerAddress != address(0), "Invalid address");
    _;
  }

  modifier updateOwnerChange() {
    _;
    ownerChange += 1;
  } 

  modifier blockReentrancy () {
    // check if already a transaction is processing, if yes throw error
    require(!locked, "Another transaction is running");

    locked = true;
    _;
    locked = false;
  }

  modifier emitOwnerChangeEvent (address newOwnerAddress) {
    emit EOwnerChange(owner, newOwnerAddress);
    _;
  }

  function changeOwner(address newOwnerAddress) public blockReentrancy validateIsOwner validateAddress(newOwnerAddress) updateOwnerChange emitOwnerChangeEvent(newOwnerAddress) {
    owner = newOwnerAddress;
  }
}