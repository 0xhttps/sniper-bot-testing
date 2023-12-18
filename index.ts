const { getAbi } = require("./util/get_contract_abi");
const { sendEth } = require("./util/send_eth");
const { contractInteraction } = require("./util/contract_interaction");
require("dotenv").config();

const private_key = process.env.PRIVATE_KEY;
const contract_addr = "0x36e16e278aAE09808EC7E0F9F512d54a2E976d3D";
const account_addr = "0xb00b62c7160B2d37D026B3B5bfe0667289E77C5C";

contractInteraction(contract_addr, account_addr, private_key);
