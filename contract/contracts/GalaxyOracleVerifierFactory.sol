// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./GalaxyOracleVerifier.sol"; // Make sure the path is correct

contract GalaxyOracleVerifierFactory {
    // Array to store addresses of deployed GalaxyOracleVerifier contracts
    address[] public deployedVerifiers;

    // Event to emit when a new verifier is deployed
    event VerifierDeployed(address verifierAddress, address oracleSigner);

    // Function to deploy a new GalaxyOracleVerifier contract using CREATE2
    function createVerifier(address _oracleSigner) public returns (address) {
        bytes memory bytecode = getBytecode(_oracleSigner);
        address verifierAddress;

        assembly {
            verifierAddress := create2(0, add(bytecode, 0x20), mload(bytecode), "0x")
            if iszero(extcodesize(verifierAddress)) {
                revert(0, 0)
            }
        }

        deployedVerifiers.push(verifierAddress);
        emit VerifierDeployed(verifierAddress, _oracleSigner);
        return verifierAddress;
    }

    // Function to get the bytecode of the GalaxyOracleVerifier contract
    function getBytecode(address _oracleSigner) public pure returns (bytes memory) {
        bytes memory bytecode = type(GalaxyOracleVerifier).creationCode;
        return abi.encodePacked(bytecode, abi.encode(_oracleSigner));
    }

    // Function to compute the address of the GalaxyOracleVerifier contract before deployment
    function computeAddress(bytes32 _salt, address _deployer) public pure returns (address) {
        bytes memory bytecode = getBytecode(address(0));
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), _deployer, _salt, keccak256(bytecode)));
        return address(uint160(uint(hash)));
    }

    // Function to get the list of all deployed verifiers
    function getDeployedVerifiers() public view returns (address[] memory) {
        return deployedVerifiers;
    }
}
