const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('GalaxyOracleVerifier Test', function () {
  let GalaxyOracleVerifierFactory, galaxyOracleVerifier, user
  const domainName = 'Galaxy Oracle'
  const domainVersion = '0.0.1'
  const oracleSignerAddress = '0x7bd4783FDCAD405A28052a0d1f11236A741da593'

  before(async function () {
    ;[user] = await ethers.getSigners()
    GalaxyOracleVerifierFactory = await ethers.getContractFactory('GalaxyOracleVerifier')
  })

  beforeEach(async function () {
    galaxyOracleVerifier = await GalaxyOracleVerifierFactory.deploy(oracleSignerAddress)
    await galaxyOracleVerifier.deployed()
  })

  it('Should deploy with the correct domain separator and oracle signer', async function () {
    const expectedDomainSeparator = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ['bytes32', 'bytes32', 'bytes32'],
        [
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes('EIP712Domain(string name,string version)'),
          ),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domainName)),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domainVersion)),
        ],
      ),
    )

    const domainSeparator = await galaxyOracleVerifier.DOMAIN_SEPARATOR()
    const signer = await galaxyOracleVerifier.oracleSigner()

    expect(domainSeparator).to.equal(expectedDomainSeparator)
    expect(signer).to.equal(oracleSignerAddress)
  })

  it('Should verify a valid signature', async function () {
    const payload = {
      timestamp: 1717071393,
      payloadType: 'number',
      value: '0x333733382e3336',
      salt: '0x06417a7ce3dba043a0db74fe48a76ee2027d7ca24255b2524caa6b675c6a5f6d',
    }

    const domain = {
      name: domainName,
      version: domainVersion,
    }

    const types = {
      Payload: [
        { name: 'timestamp', type: 'uint256' },
        { name: 'payloadType', type: 'string' },
        { name: 'value', type: 'bytes' },
        { name: 'salt', type: 'bytes32' },
      ],
    }

    // Use a hardcoded valid signature for testing since we can't sign with the real private key in the test
    const validSignature =
      '0x02b37fad56ccc1a2cf6ef041d128955796909e3de6298c0e083167db44b93341188351c3b1048332a7a51e98bfd920c28120d86e5897a02bad28ba9d0a1803db1b'

    const isValid = await galaxyOracleVerifier.verifySignature(payload, validSignature)
    expect(isValid).to.be.true
  })

  it('Should fail verification for an invalid signature', async function () {
    const payload = {
      timestamp: 1717071393,
      payloadType: 'number',
      value: '0x333733382e3336',
      salt: '0x06417a7ce3dba043a0db74fe48a76ee2027d7ca24255b2524caa6b675c6a5f6d',
    }

    const domain = {
      name: domainName,
      version: domainVersion,
    }

    const types = {
      Payload: [
        { name: 'timestamp', type: 'uint256' },
        { name: 'payloadType', type: 'string' },
        { name: 'value', type: 'bytes' },
        { name: 'salt', type: 'bytes32' },
      ],
    }

    // Create a fake signature using a different signer
    const fakeSignature = await user._signTypedData(domain, types, payload)

    const isValid = await galaxyOracleVerifier.verifySignature(payload, fakeSignature)
    expect(isValid).to.be.false
  })

  it('Should correctly split a signature', async function () {
    const payload = {
      timestamp: 1717071393,
      payloadType: 'number',
      value: '0x333733382e3336',
      salt: '0x06417a7ce3dba043a0db74fe48a76ee2027d7ca24255b2524caa6b675c6a5f6d',
    }

    const domain = {
      name: domainName,
      version: domainVersion,
    }

    const types = {
      Payload: [
        { name: 'timestamp', type: 'uint256' },
        { name: 'payloadType', type: 'string' },
        { name: 'value', type: 'bytes' },
        { name: 'salt', type: 'bytes32' },
      ],
    }

    // Use a hardcoded valid signature for testing since we can't sign with the real private key in the test
    const validSignature =
      '0x02b37fad56ccc1a2cf6ef041d128955796909e3de6298c0e083167db44b93341188351c3b1048332a7a51e98bfd920c28120d86e5897a02bad28ba9d0a1803db1b'

    const { r, s, v } = ethers.utils.splitSignature(validSignature)

    const splitResult = await galaxyOracleVerifier.splitSignature(validSignature)
    expect(splitResult[0]).to.equal(r)
    expect(splitResult[1]).to.equal(s)
    expect(splitResult[2]).to.equal(v)
  })
})
