var express = require("express");
var router = express.Router();
var Tx = require("ethereumjs-tx").Transaction;
var Web3 = require("web3");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

router.get("/", async function (req, res, next) {
  const accounts = await web3.eth.getAccounts();
  var flipCoinContract = new web3.eth.Contract(
    [
      {
        constant: false,
        inputs: [],
        name: "bet",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        payable: true,
        stateMutability: "payable",
        type: "constructor",
      },
      {
        constant: true,
        inputs: [],
        name: "maxBet",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    "0xC48f9fB120bB8BeF89E7BEf8B9eBc26F5021F292"
  );

  var account = "0x81bfF584c0b449c7Bf9BAc47aC17d2ECe397b3eA";

  var privateKey = new Buffer.from("", "hex");

  let _nonce = await web3.eth.getTransactionCount(account);
  _nonce = web3.utils.toHex(_nonce);

  var data = flipCoinContract.methods.maxBet().encodeABI();
  var rawTx = {
    nonce: _nonce,
    gasPrice: "0x09184e72a000", // increase gas if send error
    gasLimit: "0x6710",
    to: "0x0000000000000000000000000000000000000000",
    value: "0x00",
    data: data,
  };
  var tx = new Tx(rawTx);
  tx.sign(privateKey);

  var serializedTx = tx.serialize();
  const _receipt = await web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .on("receipt", console.log);

  /* GET home page. */

  res.render("index", {
    title: "Express",
    receipt: JSON.stringify(_receipt),
  });
});
module.exports = router;
