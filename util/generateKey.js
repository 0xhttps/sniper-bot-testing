var ethers = require("ethers");
var crypto = require("crypto");
let i = false;
let num = 0;

while (!i) {
  var id = crypto.randomBytes(32).toString("hex");
  var privateKey = "0x" + id;
  var wallet = new ethers.Wallet(privateKey);
  if (
    !wallet.address.startsWith("0xb00b" || "0xB00B" || "0xb00B" || "0xB00b")
  ) {
    i = false;
  } else {
    i = true;
    console.log("Found a wallet starting with boob");
    console.log("Address: " + wallet.address);
    console.log("Private key: ", privateKey);
    console.log("You looked through ", num, " addresses to find this");
  }
  num++;
}
