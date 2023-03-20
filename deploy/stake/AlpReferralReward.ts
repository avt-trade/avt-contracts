import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const deployFunction: DeployFunction = async function ({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  console.log('Running AlpReferralReward deploy script')
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  // console.log('Deployer:', deployer)

  const avt = await ethers.getContract('AVT')
  const referralStorage = await ethers.getContract('ReferralStorage')
  
  const { address } = await deploy('AlpReferralReward', {
    from: deployer,
    log: true,
    deterministicDeployment: false,
    skipIfAlreadyDeployed: false,
    // waitConfirmations: 3,
    args: [avt.address, referralStorage.address],
  })
  
  console.log('AlpReferralReward deployed at ', address)
}

export default deployFunction

deployFunction.dependencies = ['AVT']

deployFunction.tags = ['Stake', 'AlpReferralReward']
