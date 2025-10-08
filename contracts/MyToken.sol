// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyToken {
    string public name; //string 타입은 memory가 필요
    string public symbol; //eth
    uint8 public decimals; //uint8 --> 8 bit unsigned int ,...., uint256
    //public : 자동으로 getter 생성
    uint256 public totalSupply; //전체 몇개 발행
    mapping(address => uint256) public balanceOf;//누가 몇개//조회하는거는 동일한 값을 리턴해준다 tx를 만들 필요없음

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _amount) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
         //msg.sender : 배포한 사람
        _mint(_amount * 10 ** uint256(decimals), msg.sender);
    
    }
    //화페 발행시 mint
    //external 외부에서 호출 public 외부 내부 호출
    //internal 내부에서만 호출 _를 앞에 붙임
    function _mint(uint256 amount, address owner) internal {
        totalSupply += amount;
        balanceOf[owner] += amount;
    }

    function transfer(uint256 amount, address to) external { //tx로 호출됨 -> tx생성
        require(balanceOf[msg.sender] >= amount, "insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
    }
}