import { setDeploymentProperty, DeploymentProperty } from '../../.deployment/deploymentManager'
import { task } from 'hardhat/config'
import { verifyAddress } from '../../utils/verifyAddress'
import dotenv from 'dotenv'
dotenv.config()

task('deploy', 'Deploy all contracts')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, network }) => {
    const { verify } = args
    console.log('Network:', network.name)

    const [deployer] = await ethers.getSigners()
    console.log('Using address: ', deployer.address)

    const balance = await ethers.provider.getBalance(deployer.address)
    console.log('Balance: ', ethers.utils.formatEther(balance))

    // Deploy Oracle

    const Oracle = await ethers.getContractFactory('Oracle')
    const oracleArg: [] = []
    const oracle = await Oracle.deploy(...oracleArg)

    await oracle.deployed()

    if (verify) {
      await verifyAddress(oracle.address, oracleArg)
    }

    console.log('Deployed Oracle at', oracle.address)
    setDeploymentProperty(network.name, DeploymentProperty.Oracle, oracle.address)
  })
