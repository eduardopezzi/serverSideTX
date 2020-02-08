//overrides metamask v0.2 for our v 1.0

module.export = contractAdress = "0x880623B2A3b159D661c18fe4185343E0f984339a";

module.export = flipcoinABI = [
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
];
