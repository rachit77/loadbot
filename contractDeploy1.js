const Web3 = require("web3")
 const ContractKit = require('@celo/contractkit')
 const web3 = new Web3('http://localhost:8545')
 const kit = ContractKit.newKitFromWeb3(web3)
// const ethers = require("ethers");

const privateKeysign='6402ef54e42cd7df71d55e8989c79369913244b6e57f2f3c16d4d9af0619dd22'
    const pubkey='0xd781a2B6686695B875a6e6BD3b453561A922Afa4'

    const bytecode = '0x608060405234801561001057600080fd5b5060008090505b61fde8811015610064577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60008261fde88110151561005257fe5b01819055508080600101915050610017565b5060cf806100736000396000f3fe6080604052600436106039576000357c01000000000000000000000000000000000000000000000000000000009004806371e5ee5f14603e575b600080fd5b348015604957600080fd5b50607360048036036020811015605e57600080fd5b81019080803590602001909291905050506089565b6040518082815260200191505060405180910390f35b60008161fde881101515609857fe5b01600091509050548156fea165627a7a7230582054f1a91481b7250b5c9fba2b250a838e799422a1917e215a8dfd5b909b2540730029' // compiled Solidity deployment bytecode

    const tx={
      from:pubkey,
      gas:100000,
      data: bytecode
    };

async function f(){

// for(let i=0;i<100000;i++)

  await conc();

}

async function conc() {
//   const final= await kit.web3.eth.accounts.signTransaction(tx, privateKeysign).then (signed => {
//     kit.web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
// });
 
 
   let tx1= await kit.web3.eth.accounts.signTransaction(tx, privateKeysign);
console.log(i)
let tx2= await tx1.rawTransaction;

let tx3=await kit.web3.eth.sendSignedTransaction(tx2)
console.log(tx3)
 
}

f();
