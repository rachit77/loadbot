// js script to deploy a smart contract on a evm compatible blockchain  using the compiled byte code 

const Web3 = require("web3")
 const ContractKit = require('@celo/contractkit')
 const web3 = new Web3('http://localhost:8540')
 const kit = ContractKit.newKitFromWeb3(web3)

const privateKeysign='6402ef54e42cd7df71d55e8989c79369913244b6e57f2f3c16d4d9af0619dd22'
    const pubkey='0xd781a2B6686695B875a6e6BD3b453561A922Afa4'

    // array of 300k length
    const bytecode = '0x608060405234801561001057600080fd5b5060008090505b620493e0811015610066577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600082620493e08110151561005457fe5b01819055508080600101915050610017565b5060d0806100756000396000f3fe6080604052600436106039576000357c01000000000000000000000000000000000000000000000000000000009004806371e5ee5f14603e575b600080fd5b348015604957600080fd5b50607360048036036020811015605e57600080fd5b81019080803590602001909291905050506089565b6040518082815260200191505060405180910390f35b600081620493e081101515609957fe5b01600091509050548156fea165627a7a72305820107bf9e802a8180520bd6c2ba7007daf9b309555f74f13d8ea89efe620f984c90029' // compiled Solidity deployment bytecode

    const tx={
      from:pubkey,
      gas:100000000,
      data: bytecode
    };

async function f(){

 for(let i=0;i<100000;i++)

  await conc();

}

async function conc() {

 
 
   let tx1= await kit.web3.eth.accounts.signTransaction(tx, privateKeysign);
let tx2= await tx1.rawTransaction;

let tx3=await kit.web3.eth.sendSignedTransaction(tx2)
console.log(tx3)
 
}

f();

