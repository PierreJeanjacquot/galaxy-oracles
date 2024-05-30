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

    // deploy the factory

    // const GalaxyOracleVerifierFactory = await ethers.getContractFactory(
    //   'GalaxyOracleVerifierFactory',
    // )
    // const galaxyOracleVerifierFactoryArg: [] = []
    // const galaxyOracleVerifierFactory = await GalaxyOracleVerifierFactory.deploy(
    //   ...galaxyOracleVerifierFactoryArg,
    // )

    // await galaxyOracleVerifierFactory.deployed()

    // if (verify) {
    //   await verifyAddress(galaxyOracleVerifierFactory.address, galaxyOracleVerifierFactoryArg)
    // }

    // console.log('Deployed GalaxyOracleVerifierFactory at', galaxyOracleVerifierFactory.address)
    // setDeploymentProperty(
    //   network.name,
    //   DeploymentProperty.GalaxyOracleVerifierFactory,
    //   galaxyOracleVerifierFactory.address,
    // )

    // Deploy GalaxyOracleVerifier

    // const GalaxyOracleVerifier = await ethers.getContractFactory('GalaxyOracleVerifier')
    // // add addrees and a byte32 as argument into the galaxyOracleVerifierArg array

    // const galaxyOracleVerifierArg: [string] = ['0xEea268c48a54d6434EAAC9C15B9301B13B58Ca09']
    // const galaxyOracleVerifier = await GalaxyOracleVerifier.deploy(...galaxyOracleVerifierArg)

    // await galaxyOracleVerifier.deployed()

    // if (verify) {
    //   await verifyAddress(galaxyOracleVerifier.address, galaxyOracleVerifierArg)
    // }

    // console.log('Deployed galaxyOracleVerifier at', galaxyOracleVerifier.address)
    // setDeploymentProperty(
    //   network.name,
    //   DeploymentProperty.GalaxyOracleVerifier,
    //   galaxyOracleVerifier.address,
    // )

    // Deploy Datafeed

    const Datafeed = await ethers.getContractFactory('Datafeed')
    const datafeedArg: [string] = [galaxyOracleVerifier.address]
    const datafeed = await Datafeed.deploy(...datafeedArg)

    await datafeed.deployed()

    if (verify) {
      await verifyAddress(datafeed.address, datafeedArg)
    }

    console.log('Deployed datafeed at', datafeed.address)
    setDeploymentProperty(network.name, DeploymentProperty.Datafeed, datafeed.address)
  })
