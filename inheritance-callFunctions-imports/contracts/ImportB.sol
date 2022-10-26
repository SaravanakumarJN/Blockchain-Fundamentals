// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./ImportA.sol";

contract ImportB {
  address public contractImportA;

  constructor (address _contractImportA) {
    contractImportA = _contractImportA;
  }

  function welcomeUser() external view returns(string memory){
    ImportA instanceOfImportA = ImportA(contractImportA);
    string memory greetUserText = instanceOfImportA.greetUser();

    return string.concat(greetUserText, ", Welcome!!!");
  }
}