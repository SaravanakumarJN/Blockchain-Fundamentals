// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract A {
  string name;

  constructor(string memory _name){
    name = _name;
  }

  function greetUser() external view returns(string memory){
    return string.concat("Hello ", name);
  }
}

contract B {
  // variable to store the contract address of A
  address contractA;

  constructor(address _contractA){
    // storing address of contract A 
    contractA = _contractA;
  }

  function welcomeUser() external view returns (string memory) {
    // creating a instance of contract A
    A instanceOfA = A(contractA);

    // accessing contractA's method using the created instance
    string memory greetUserText = instanceOfA.greetUser();

    return string.concat(greetUserText, ", Welcome!!!");
  }
}