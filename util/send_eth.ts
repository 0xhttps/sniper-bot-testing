const { ethers } = require("ethers");
const { provider } = require("./provider")
require("dotenv").config();
/*
example params: 
("0.01", 
"0xb00b62c7160B2d37D026B3B5bfe0667289E77C5C", 
process.env.PRIVATE_KEY)
*/
export async function sendEth(
  value: string,
  to_address: any,
  PRIVATE_KEY: any
) {
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const tx_value = ethers.parseUnits(value, "ether");
  const tx_data = {
    to: to_address,
    value: tx_value,
  };
  signer
    .sendTransaction(tx_data)
    .then((tx: any) => {
      console.log("Transaction sent: ", tx.hash);
      return tx.hash;
    })
    .catch((error: any) => {
      console.error("Error sending transaction: ", error);
      return error;
    });
}

export {};
