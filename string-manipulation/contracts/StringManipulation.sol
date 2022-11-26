// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*
  Strings 
    - strings don't have methods in it. So we convert them to bytes to perform the operations. (similar to String() constructor in js which converts strings to objects)
*/

contract StringManipulation{
  function length(string memory a) external pure returns(uint){
    return bytes(a).length;
  }

  function compareStrings (string memory a, string memory b) external pure returns(bool) {
    // kecak256 takes hash as input so using 'abi' inbuilt method we convert them to hash and compaee the bytes of hash 
    return keccak256(abi.encodePacked(a)) ==  keccak256(abi.encodePacked(b));
  }

  function concatenateStrings (string memory a, string memory b) external pure returns(string memory) {
    /*
    Steps
      - find the length of concatenated string
      - define a empty string with the length
      - define bytes using the created empty string
      - place the bytes of actual string one by one in required order in newly defined bytes
      - convert the created bytes to string
    */

    bytes memory aBytes = bytes(a);
    bytes memory bBytes = bytes(b);
    string memory ab = new string(aBytes.length + bBytes.length);
    bytes memory abBytes = bytes(ab);

    uint i = 0;
    uint j = 0;
    while(i < aBytes.length){
      abBytes[j] = aBytes[i];
      i++;
      j++;
    }

    i = 0;
    while(i < bBytes.length){
      abBytes[j] = bBytes[i];
      i++;
      j++;
    }

    return string(abBytes);
  }
}