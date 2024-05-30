const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('GalaxyOracleVerifier Test', function () {
  let GalaxyOracleVerifierFactory, galaxyOracleVerifier, oracleSigner, user
  const domainName = 'Galaxy Oracle'
  const domainVersion = '0.0.1'

  before(async function () {
    ;[oracleSigner, user] = await ethers.getSigners()
    GalaxyOracleVerifierFactory = await ethers.getContractFactory('GalaxyOracleVerifier')
  })

  beforeEach(async function () {
    galaxyOracleVerifier = await GalaxyOracleVerifierFactory.deploy(oracleSigner.address)
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
    expect(signer).to.equal(oracleSigner.address)
  })

  it('Should verify a valid signature', async function () {
    const payload = {
      timestamp: 1717071393,
      payloadType: 'number',
      value: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('3738.36')),
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

    const signature = await oracleSigner._signTypedData(domain, types, payload)

    const isValid = await galaxyOracleVerifier.verifySignature(payload, signature)
    expect(isValid).to.be.true
  })

  it('Should fail verification for an invalid signature', async function () {
    const payload = {
      timestamp: 1717071393,
      payloadType: 'number',
      value: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('3738.36')),
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

    const fakeSignature = await user._signTypedData(domain, types, payload)

    const isValid = await galaxyOracleVerifier.verifySignature(payload, fakeSignature)
    expect(isValid).to.be.false
  })

  it('Should correctly split a signature', async function () {
    const payload = {
      timestamp: 1717071393,
      payloadType: 'number',
      value: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('3738.36')),
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

    const signature = await oracleSigner._signTypedData(domain, types, payload)

    const { r, s, v } = ethers.utils.splitSignature(signature)

    expect(await galaxyOracleVerifier.splitSignature(signature)).to.deep.equal([r, s, v])
  })
})
