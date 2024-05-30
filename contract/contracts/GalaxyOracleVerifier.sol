// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract GalaxyOracleVerifier {
    // Type hash for the EIP-712 domain structure
    bytes32 public constant EIP712DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,string version)");

    // Type hash for the payload structure
    bytes32 public constant PAYLOAD_TYPEHASH =
        keccak256("Payload(uint256 timestamp,string payloadType,bytes value,bytes32 salt)");

    // Domain separator used to prevent signature replay across different domains
    bytes32 public DOMAIN_SEPARATOR =
        keccak256(abi.encode(EIP712DOMAIN_TYPEHASH, keccak256(bytes("Galaxy Oracle")), keccak256(bytes("0.0.1"))));

    // Address of the authorized Oracle signer
    address public oracleSigner;

    // Payload structure matching the expected data format
    struct Payload {
        uint256 timestamp;
        string payloadType;
        bytes value;
        bytes32 salt;
    }

    // Constructor to initialize the domain separator and Oracle signer
    constructor(address _oracleSigner) {
        oracleSigner = _oracleSigner;
    }

    // Internal function to hash the payload using its structure
    function hashPayload(Payload memory payload) internal pure returns (bytes32) {
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

    // Function to verify the signature of a payload
    function verifySignature(Payload memory payload, bytes memory signature) public view returns (bool) {
        // Combine domain separator and payload hash to create the digest
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hashPayload(payload)));

        // Recover the signer from the signature and compare it with the Oracle signer
        return recoverSigner(digest, signature) == oracleSigner;
    }

    // Function to recover the signer address from a signed message hash and signature
    function recoverSigner(bytes32 _digest, bytes memory _signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_digest, v, r, s);
    }

    // Function to split a signature into its r, s, and v components
    function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Invalid signature length");

        assembly {
            r := mload(add(sig, 0x20))
            s := mload(add(sig, 0x40))
            v := byte(0, mload(add(sig, 0x60)))
        }

        return (r, s, v);
    }
}
