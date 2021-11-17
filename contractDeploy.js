
 const Web3 = require("web3")
 const ContractKit = require('@celo/contractkit')
 const web3 = new Web3('http://localhost:8540')
 const kit = ContractKit.newKitFromWeb3(web3)
// const ethers = require("ethers");


async function f(){
    const privateKeysign='d013f88e6c1d5bc850c5b44654bc1099586af90b02c19fe98120f914df529cb9'
    const pubkey='0xEfD090f04c3725C815515AB55B60cB2951892202'

    // bytecode of a variable initialised inside constructor
    //let bytecode = '0x6080604052348015600f57600080fd5b50600860008190555060358060256000396000f3fe6080604052600080fdfea165627a7a72305820ee3ee126d03c04c1455641c803eba6d6e2d778c546631309346e490a648866560029' // compiled Solidity deployment bytecode

    //array
    //let bytecode = '0x0x608060405234801561001057600080fd5b5060008090505b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156100a0577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6000827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110151561008e57fe5b01819055508080600101915050610017565b5060ed806100af6000396000f3fe6080604052600436106039576000357c01000000000000000000000000000000000000000000000000000000009004806371e5ee5f14603e575b600080fd5b348015604957600080fd5b50607360048036036020811015605e57600080fd5b81019080803590602001909291905050506089565b6040518082815260200191505060405180910390f35b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110151560b657fe5b01600091509050548156fea165627a7a72305820efa301afb6abb0fa6595dce0dc1cbcd188eb21ccc9013b9f485fc79b22f917c30029'
    
    //2**100 elements in array
    //let bytecode ='0x608060405234801561001057600080fd5b5060008090505b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81101561008d577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6000826c100000000000000000000000008110151561007b57fe5b01819055508080600101915050610017565b5060da8061009c6000396000f3fe6080604052600436106039576000357c01000000000000000000000000000000000000000000000000000000009004806371e5ee5f14603e575b600080fd5b348015604957600080fd5b50607360048036036020811015605e57600080fd5b81019080803590602001909291905050506089565b6040518082815260200191505060405180910390f35b6000816c100000000000000000000000008110151560a357fe5b01600091509050548156fea165627a7a723058200db2158090920f3400da25fe0649a67aed2e1425c4e9913646afb4e277cbf9140029'

    //length = 50k
    //let bytecode='0x608060405234801561001057600080fd5b5060008090505b61c350811015610064577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60008261c3508110151561005257fe5b01819055508080600101915050610017565b5060cf806100736000396000f3fe6080604052600436106039576000357c01000000000000000000000000000000000000000000000000000000009004806371e5ee5f14603e575b600080fd5b348015604957600080fd5b50607360048036036020811015605e57600080fd5b81019080803590602001909291905050506089565b6040518082815260200191505060405180910390f35b60008161c35081101515609857fe5b01600091509050548156fea165627a7a7230582003f8d5aac03c7cf3f9fbd0773a31640439dfe2bb52cf42e6bf12e9a85f9c3ded0029'
    
    //65k
    let bytecode ='0x608060405234801561001057600080fd5b5060008090505b61fde8811015610064577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60008261fde88110151561005257fe5b01819055508080600101915050610017565b5060cf806100736000396000f3fe6080604052600436106039576000357c01000000000000000000000000000000000000000000000000000000009004806371e5ee5f14603e575b600080fd5b348015604957600080fd5b50607360048036036020811015605e57600080fd5b81019080803590602001909291905050506089565b6040518082815260200191505060405180910390f35b60008161fde881101515609857fe5b01600091509050548156fea165627a7a7230582054f1a91481b7250b5c9fba2b250a838e799422a1917e215a8dfd5b909b2540730029'
    
    
    const tx={
  from:pubkey,
  gas:20000000,
  data: bytecode
};

const final= await kit.web3.eth.accounts.signTransaction(tx, privateKeysign).then (signed => {
    kit.web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
});

}

setInterval(f,5000);
//f();
