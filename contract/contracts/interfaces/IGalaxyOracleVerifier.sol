// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IGalaxyOracleVerifier {
    // Type hash for the EIP-712 domain structure
    function EIP712DOMAIN_TYPEHASH() external view returns (bytes32);

    // Type hash for the payload structure
    function PAYLOAD_TYPEHASH() external view returns (bytes32);

    // Domain separator used to prevent signature replay across different domains
    function DOMAIN_SEPARATOR() external view returns (bytes32);

    // Address of the authorized Oracle signer
    function oracleSigner() external view returns (address);

    // Payload structure matching the expected data format
    struct Payload {
        uint256 timestamp;
        string payloadType;
        bytes value;
        bytes32 salt;
    }

    // Function to hash the payload using its structure
    function hashPayload(Payload memory payload) external pure returns (bytes32);

    // Function to verify the signature of a payload
    function verifySignature(Payload memory payload, bytes memory signature) external view returns (bool);

    // Function to recover the signer address from a signed message hash and signature
    function recoverSigner(bytes32 _digest, bytes memory _signature) external pure returns (address);

    // Function to split a signature into its r, s, and v components
    function splitSignature(bytes memory sig) external pure returns (bytes32 r, bytes32 s, uint8 v);
}
