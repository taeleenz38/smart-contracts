import { ethers } from "hardhat";

async function main() {
  // Define constructor arguments
  const name = "AUDC";
  const symbol = "AUDC";

  // Get the signer (deployer)
  const [deployer] = await ethers.getSigners();

  console.log(`🚀 Deploying contract with account: ${deployer.address}`);

  // Get contract factory
  const Token = await ethers.getContractFactory("Token");

  // Deploy contract with constructor arguments
  const token = await Token.deploy(name, symbol);
  await token.waitForDeployment();

  console.log(`✅ Token deployed at address: ${await token.getAddress()}`);
  console.log(`🧾 Name: ${await token.name()}`);
  console.log(`🔤 Symbol: ${await token.symbol()}`);

  // Mint initial tokens to deployer (e.g., 1,000,000 tokens)
  const mintAmount = ethers.parseUnits("1000000", 18); // 1,000,000 * 10^18
  const mintTx = await token.mint(deployer.address, mintAmount);
  await mintTx.wait();

  console.log(
    `🪙 Minted ${ethers.formatUnits(mintAmount, 18)} ${symbol} to ${
      deployer.address
    }`
  );
  console.log(
    `📦 Total Supply: ${ethers.formatUnits(await token.totalSupply(), 18)}`
  );
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
