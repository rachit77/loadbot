import  { newKit }   from '@celo/contractkit'
const kit = newKit('http://localhost:8545')
import { CeloContract } from '@celo/contractkit'


async function f(){
    const privateKeysign='6402ef54e42cd7df71d55e8989c79369913244b6e57f2f3c16d4d9af0619dd22'
    const pubkey='0xd781a2B6686695B875a6e6BD3b453561A922Afa4'

    let bytecode = '0x608060405234801561001057600080fd5b5060008090505b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156100a0577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6000827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110151561008e57fe5b01819055508080600101915050610017565b5060ed806100af6000396000f3fe6080604052600436106039576000357c01000000000000000000000000000000000000000000000000000000009004806371e5ee5f14603e575b600080fd5b348015604957600080fd5b50607360048036036020811015605e57600080fd5b81019080803590602001909291905050506089565b6040518082815260200191505060405180910390f35b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110151560b657fe5b01600091509050548156fea165627a7a723058209aa5c13e29c77ce51652411ef247e57ef0061d39df4fbafd680b65a830773f590029' // compiled Solidity deployment bytecode

const tx={
  from:pubkey,
  gas:10000000,
  data: bytecode
};

const final= await kit.web3.eth.accounts.signTransaction(tx, privateKeysign).then (signed => {
    kit.web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
});

}

f();
