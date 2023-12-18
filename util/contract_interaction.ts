const { ethers } = require("ethers");
const { provider } = require("./provider")
const { getAbi, mapContractFunctions } = require("./get_contract_abi");
require("dotenv").config();

export async function contractInteraction(
  contract_addr: string,
  account_addr: string,
  PRIVATE_KEY: any, 
  function_name: any,
  token_id: any
) {

  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const abi = await getAbi(contract_addr);
  const contract = new ethers.Contract(contract_addr, abi, signer);
  const contractFunctions = mapContractFunctions(abi);
  let availableFunctions = '';
  let i = 1

  for (const f of contractFunctions as ContractFunction[]) {
    if (f.name) {
      availableFunctions += `${f.name}, `;
    }
  }

  for (i; i < contractFunctions.length; i++) {
    if ((contractFunctions[i].name).toLowerCase().includes(function_name.toLowerCase())) {
      await contract[function_name](account_addr, token_id)
        .then((tx: any) => {
          console.log("Transaction sent: ", tx.hash);
          return tx.hash;
        })
        .catch((error: any) => {
          console.error("Error sending transaction: ", error.info);
          return error;
        });
        break
    }
  } 
  if (i === contractFunctions.length) {
    console.error(`Function "${function_name}" not found in abi\nAvailable functions:\n${availableFunctions.slice(0, -2)}`);
  }
}

type ContractFunction = {
  name?: string;
  parameters: any[];
  stateMutability: string;
};

export {};
