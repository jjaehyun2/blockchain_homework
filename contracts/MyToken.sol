// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyToken {
    string public name; //string 타입은 memory가 필요
    string public symbol; //eth
    uint8 public decimals; //uint8 --> 8 bit unsigned int ,...., uint256
    //public : 자동으로 getter 생성
    uint256 public totalSupply; //전체 몇개 발행
    mapping(address => uint256) public balanceOf;//누가 몇개

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }
    //external 외부에서 호출 public 외부 내부 호출
    // function totalSupply() external view returns (uint256) {
    //     return totalSupply;
    // }

    // function balanceOf(address owner) external view returns (uint256) {
    //     return balanceOf[owner];
    // }

    // function name() external view returns (string memory) {
    //     return name;
    // }
}