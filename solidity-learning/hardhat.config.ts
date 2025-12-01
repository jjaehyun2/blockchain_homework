import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-vyper";

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    vyper: {
        version: "0.3.0",
    }, 
    networks: {
        kairos: {
            url: "https://public-en-kairos.node.kaia.io",
            accounts: [
                "0xcc3feea5b7b2047fd8de669ba2759b1f6fd9ac37642758752bfc2dab321b5d82",
            ],
        },
    },
    etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://kairos-api.kaiascan.io/hardhat-verify",
          browserURL: "https://kairos.kaiascan.io",
        },
      },
    ],
  }, 
  etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://kairos-api.kaiascan.io/hardhat-verify",
          browserURL: "https://kairos.kaiascan.io",
        },
      },
    ],
  },
};
export default config;