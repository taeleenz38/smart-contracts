import { config } from "dotenv";
import { ethers } from "ethers";

config();

// --- Constants ---
const CONTRACT_ADDRESS = "0x8dcD798083579bACf345eE96D7EfFe52A33b56e2";
const RECIPIENT = "0xB433CDEbaf52E83F6aF8ec318b09b48519DD8519";
const AMOUNT = ethers.parseUnits("100000", 18); // 100000 tokens with 18 decimals

// --- Minimal ABI with the `mint` function ---
const abi = ["function mint(address to, uint256 amount) external"];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

  try {
    const tx = await contract.mint(RECIPIENT, AMOUNT);
    console.log(`Minting transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log("✅ Mint successful");
  } catch (err) {
    console.error("❌ Error during minting:", err);
  }
}

main();
