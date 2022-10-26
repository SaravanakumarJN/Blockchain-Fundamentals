// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Quadrilateral {
  string public testVariable;
  uint public noOfSides = 4;

  constructor (string memory _testVariable){
    testVariable = _testVariable;
  }

  function getArea(uint l, uint b) public pure returns(uint){
    return l * b;
  }

  function getPerimeter(uint l, uint b) public pure returns(uint){
    return 2 * (l + b);
  }
}

// extending square from quadrilateral contract
contract Square is Quadrilateral {
  uint l;
  uint b;

  // getting the argument for parent contract from the child contract and passing it to parent (Note: needed only when parent contract takes a argument)
  constructor(string memory testVariable, uint a) Quadrilateral(testVariable) {
    l = a;
    b = a;
  }

  function getAreaAndPerimeter() external view returns(uint, uint) {
    // using the methods from parent (quadrilateral)
    uint area = getArea(l, b);
    uint perimeter = getPerimeter(l, b);

    return (area, perimeter);
  }
}