import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/4a622782c1a5463a8d00a470d0958895",
      accounts: [process.env.PRIVATE_KEY!],
      gasPrice: 10000000000,
    },
  },
};

export default config;
