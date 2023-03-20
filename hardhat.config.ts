import 'dotenv/config'
import 'hardhat-spdx-license-identifier'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'
import 'hardhat-contract-sizer'

import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

const privateKey = process.env.PRIVATE_KEY
const mnemonic = 'test test test test test test test test test test test junk'
let accounts
if (privateKey) {
  accounts = [privateKey]
} else {
  accounts = {
    mnemonic,
  }
}

const namedAccounts = {
  deployer: {
    default: 0,
    dev_optest: '0x8d1BFf1675441C03f6d06F6425d977A2E11a1297',
    private_optest: '0x7D37d9B69CE4B1Ac3b866688Ef303dFf24D53cC0',
    op_mainnet: '0x904A08Be742bD5BC6ad10f0924F06b0B23d1175C',
  },
  admin: {
    default: 0,
  },
  dev: {
    default: 0,
  },
  signer: {
    default: 0,
  },

  daoFund: {
    localhost: '0x35cDb98Bb3aEa588d0eab4218FFD6E63eFD0986d',
    dev_optest: '0x389BcAD2592C9c963F35A3dd81876965EC61fAA9',
    private_optest: '0xf4d02f03128449635D16EefdE9deEB0E030F7245',
    op_mainnet: '0x35cDb98Bb3aEa588d0eab4218FFD6E63eFD0986d',
  },
  ecosystem: {
    localhost: '0xb306D70a616998680AB1e9c3474F835af185D14E',
    dev_optest: '0xb306D70a616998680AB1e9c3474F835af185D14E',
    private_optest: '0x66e43C6A56ca87E1D70314d7F11041587010ACDE',
    op_mainnet: '0xc1480A41182A56BaDFC3B966eA671AFE7f58E6c5',
  },
  investor: {
    localhost: '0xA8CC57A8Cd3CAB0D35bfc6B79CD3d630CCDf2A5d',
    dev_optest: '0xA8CC57A8Cd3CAB0D35bfc6B79CD3d630CCDf2A5d',
    private_optest: '0x0C5295855e4E1b743f5f4B61f651dd8bAC27a296',
    op_mainnet: '0xcb44855C23a14E4BcC179522594429e15b4808FE',
  },
  earlyLP: {
    localhost: '0x1bB229e16a5EB0784F8ad8d1086B30550e3f3AAc',
    dev_optest: '0x1bB229e16a5EB0784F8ad8d1086B30550e3f3AAc',
    private_optest: '0x143a65d20198d1782E5Cd6E49D10772d4464Da87',
    op_mainnet: '0x863Ecc3618e4891b8B9f8e5C8474Cff1F9d08a5B',
  },
  community: {
    localhost: '0xd998D6AA562A0F0fEa68be6ed91F680dD1a94e45',
    dev_optest: '0xd998D6AA562A0F0fEa68be6ed91F680dD1a94e45',
    private_optest: '0x8041De748580Ad9cbB16d653E81527db2ab01173',
    op_mainnet: '0xEcCf8d30654b9E6dCe24BDecc1fD0F00AE1867d9',
  },
  coreTeam: {
    localhost: '0xf3F0976c23123a399C3478DC42E66fDD6b2eDc97',
    dev_optest: '0xf3F0976c23123a399C3478DC42E66fDD6b2eDc97',
    private_optest: '0xA8094BE8dc7F1a4C5D78EbBbD13898f4CF9A1c1a',
    op_mainnet: '0x91F59e4C64C6180829965336407832460292E750',
  },
}

export type Signers = { [name in keyof typeof namedAccounts]: SignerWithAddress }

import { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
          metadata: {
            // do not include the metadata hash, since this is machine dependent
            // and we want all generated code to be deterministic
            // https://docs.soliditylang.org/en/v0.7.6/metadata.html
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    // sources: "./flat",
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  namedAccounts,
  networks: {
    hardhat: {
      forking: {
        url: 'https://mainnet.optimism.io',
      },
      chainId: 10,
    },
    optest: {
      url: `https://goerli.optimism.io`,
      accounts,
      verify: {
        etherscan: {
          apiKey: process.env.OP_SCAN_API_KEY ? process.env.OP_SCAN_API_KEY : '',
        },
      },
    },
    dev_optest: {
      url: `https://goerli.optimism.io`,
      accounts,
      verify: {
        etherscan: {
          apiKey: process.env.OP_SCAN_API_KEY ? process.env.OP_SCAN_API_KEY : '',
        },
      },
    },
    private_optest: {
      url: `https://goerli.optimism.io`,
      accounts,
      verify: {
        etherscan: {
          apiKey: process.env.OP_SCAN_API_KEY ? process.env.OP_SCAN_API_KEY : '',
        },
      },
    },
    pub_optest: {
      url: `https://goerli.optimism.io`,
      accounts,
      verify: {
        etherscan: {
          apiKey: process.env.OP_SCAN_API_KEY ? process.env.OP_SCAN_API_KEY : '',
        },
      },
    },
    op_mainnet: {
      url: `https://mainnet.optimism.io`,
      accounts,
      verify: {
        etherscan: {
          apiKey: process.env.OP_SCAN_API_KEY ? process.env.OP_SCAN_API_KEY : '',
        },
      },
    },
    localhost: {
      url: `http://localhost:8545`,
      accounts,
    },
    truffle: {
      url: `http://localhost:24012/rpc`,
      timeout: 60 * 60 * 1000,
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
}
export default config
