/*
Create a smart contract which
Can take the name, and age while deploying the smart contract
A function that when called returns a name ;
A function that will only be accessible outside the smart contract and can return your age*2
Deploy your smart contract with Remix and test it
*/
pragma solidity >=0.7.0 <0.9.0;

contract Task1{
    string name;
    uint age ;
    constructor(string memory _name, uint _age){
        name = _name;
        age = _age;
    }

    function getName () public view returns (string memory) {
        return name; 
    }

    function getAgeTwice () external view returns (uint) {
        return age * 2;
    }
}