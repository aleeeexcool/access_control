//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./AccessControl.sol";

contract Demo is AccessControl {
    bool paused;
    mapping(address => uint) public balances;

    bytes32 public constant WITHDRAWER_ROLE = keccak256(bytes("WITHDRAWER_ROLE"));
    bytes32 public constant MINTER_ROLE = keccak256(bytes("MINTER_ROLE"));


    constructor(address _withdrawer, address _minter) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(WITHDRAWER_ROLE, _withdrawer);

        _grantRole(MINTER_ROLE, _minter);

        _setRoleAdmin(MINTER_ROLE, WITHDRAWER_ROLE);

    }

    function withdraw() external onlyRole(WITHDRAWER_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getBalance() external view onlyRole(MINTER_ROLE) returns (uint) {
        return address(this).balance;
    }

    function pause() external onlyRole(WITHDRAWER_ROLE) {
        paused = true;
    }
}
