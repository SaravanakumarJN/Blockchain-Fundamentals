// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BasicCrud{
  struct iEmployee{
    string name;
    uint256 age;
    string email;
    address walletAddress;
  }
  
  iEmployee[] public Employees;
  uint256 public employeeCount;

  constructor(){
    employeeCount = 0;
  }

  function addEmployee(string memory name, uint256 age, string memory email, address walletAddress) external returns(iEmployee[] memory) {
    iEmployee memory newEmployee = iEmployee(name, age, email, walletAddress);
    Employees.push(newEmployee);
    employeeCount++;
    return Employees;
  } 

  function updateEmployee(string memory identifier, string memory name) external returns(bool) {
    for(uint i = 0; i < employeeCount; i++){
      if(stringEqualityCheck(Employees[i].email, identifier)){
        Employees[i].name = name;
        return true;
      }
    }
    return false;
  }

  function stringEqualityCheck(string memory input1, string memory input2) internal pure returns(bool){
    return keccak256(abi.encodePacked(input1)) == keccak256(abi.encodePacked(input2));
  }

  function getIndex(string calldata identifier) internal view returns(bool, uint) {
    for(uint i = 0; i < employeeCount; i++){
      if(stringEqualityCheck(Employees[i].email, identifier)){
        return (true, i);
      }
    }

    return (false, 0);
  }

  // only clears the object values but still the object is in the array
  function deleteEmployee1(string calldata identifier) external {
    (bool isFound, uint index) = getIndex(identifier);
    if(isFound){
      delete Employees[index];
      employeeCount--;
    }
  }

  // clears the object completely from the array
  function deleteEmployee2(string calldata identifier) external {
    (bool isFound, uint index) = getIndex(identifier);
    if(isFound){
      for(uint i = index; i < employeeCount-1; i++){
        Employees[i] = Employees[i+1];
      }
      Employees.pop();
      employeeCount--;
    }
  }
}