// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ImportA {
  string public name;

  constructor(string memory _name){
    name = _name;
  }

  function greetUser() external view returns(string memory){
    return string.concat("Hello ", name);
  }
}