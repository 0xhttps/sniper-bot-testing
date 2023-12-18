const { ethers } = require("ethers");
const { provider } = require("./provider")
const { getAbi, mapContractFunctions } = require("./get_contract_abi");
require("dotenv").config();

export async function contractInteraction(
  contract_addr: string,
  account_addr: string,
  PRIVATE_KEY: any
) {
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const abi = await getAbi(contract_addr);
  const contract = new ethers.Contract(contract_addr, abi, signer);
  const contractFunctions = mapContractFunctions(abi);

  const param_to = account_addr;
  const param_tokenId = "6";

  await contract[contractFunctions[2]["name"]](param_to, param_tokenId)
    .then((tx: any) => {
      console.log("Transaction sent: ", tx.hash);
      return tx.hash;
    })
    .catch((error: any) => {
      console.error("Error sending transaction: ", error.info);
      return error;
    });
}
export {};
