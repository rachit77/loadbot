
 const Web3 = require("web3")
 const ContractKit = require('@celo/contractkit')
 const web3 = new Web3('http://localhost:8545')
 const kit = ContractKit.newKitFromWeb3(web3)
// const ethers = require("ethers");


async function f(){
    const privateKeysign='6402ef54e42cd7df71d55e8989c79369913244b6e57f2f3c16d4d9af0619dd22'
    const pubkey='0xd781a2B6686695B875a6e6BD3b453561A922Afa4'

    let bytecode = '0x6080604052348015600f57600080fd5b50600860008190555060358060256000396000f3fe6080604052600080fdfea165627a7a72305820ee3ee126d03c04c1455641c803eba6d6e2d778c546631309346e490a648866560029' // compiled Solidity deployment bytecode

const tx={
  from:pubkey,
  gas:100000,
  data: bytecode
};

const final= await kit.web3.eth.accounts.signTransaction(tx, privateKeysign).then (signed => {
    kit.web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
});

}

f();
