require("dotenv").config();

export async function getAbi(addr: string): Promise<any | Error> {
  const contractAddress = addr;
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status == 1) {
      return data.result;
    } else {
      return { message: `Error: ${data.result}` };
    }
  } catch (error) {
    return { message: `Error fetching ABI: ${error}` };
  }
}

export function mapContractFunctions(raw_abi: any) {
  const abi = JSON.parse(raw_abi);
  return abi
    .filter(
      (entry: any) =>
        entry.stateMutability === "payable" ||
        entry.stateMutability === "nonpayable"
    )
    .map((entry: any) => ({
      name: entry.name,
      parameters: entry.inputs.map((param: any) => ({
        name: param.name,
        type: param.type,
      })),
      stateMutability: entry.stateMutability,
    }));
}
export {};
