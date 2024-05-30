// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IGalaxyOracleVerifier.sol";

contract Datafeed {
    IGalaxyOracleVerifier public verifierContract;
    mapping(bytes32 => bool) public verifiedPayloads;

    // Type hash for the payload structure
    bytes32 public constant PAYLOAD_TYPEHASH =
        keccak256("Payload(uint256 timestamp,string payloadType,bytes value,bytes32 salt)");

    constructor(address _verifierAddress) {
        verifierContract = IGalaxyOracleVerifier(_verifierAddress);
    }

    // Function to receive, hash, and verify a payload
    function verifyPayload(IGalaxyOracleVerifier.Payload memory payload, bytes memory signature) public returns (bool) {
        bytes32 payloadHash = hashPayload(payload);

        // Check if the payload has already been verified
        require(!verifiedPayloads[payloadHash], "Payload already verified");

        // Verify the signature using the GalaxyOracleVerifier contract
        bool isValid = verifierContract.verifySignature(payload, signature);

        // Store the verification result
        if (isValid) {
            verifiedPayloads[payloadHash] = true;
        }

        return isValid;
    }

    // Function to hash the payload using its structure
    function hashPayload(IGalaxyOracleVerifier.Payload memory payload) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    PAYLOAD_TYPEHASH,
                    payload.timestamp,
                    keccak256(bytes(payload.payloadType)),
                    keccak256(payload.value),
                    payload.salt
                )
            );
    }

    // Function to check if a payload has been verified
    function isPayloadVerified(IGalaxyOracleVerifier.Payload memory payload) public view returns (bool) {
        bytes32 payloadHash = hashPayload(payload);
        return verifiedPayloads[payloadHash];
    }
}
