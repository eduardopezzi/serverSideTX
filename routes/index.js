var express = require("express");
var router = express.Router();
var Tx = require("ethereumjs-tx").Transaction;
var Web3 = require("web3");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const accounts = web3.eth.getAccounts();
var flipCoinContract = new web3.eth.Contract(
  [
    {
      constant: false,
      inputs: [],
      name: "bet",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      payable: true,
      stateMutability: "payable",
      type: "constructor"
    },
    {
      constant: true,
      inputs: [],
      name: "maxBet",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ],
  "0xC48f9fB120bB8BeF89E7BEf8B9eBc26F5021F292"
);

var account = "0x95af85Cb9efD3f2B3ba288402428f9220137EC7A";

var privateKey = new Buffer.from(
  "9EA8819710349B9DA83A939FB025BE28C235F06140E9CDBFCE1173B4A1DFFEDF",
  "hex"
);
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

var data = flipCoinContract.methods.maxBet().encodeABI();
var rawTx = {
  nonce: "0x0748",
  gasPrice: "0x09184e72a000", // increase gas if send error
  gasLimit: "0x6710",
  to: "0x0000000000000000000000000000000000000000",
  value: "0x00",
  data: data
};
var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();
web3.eth
  .sendSignedTransaction("0x" + serializedTx.toString("hex"))
  .on("receipt", console.log);

module.exports = router;
