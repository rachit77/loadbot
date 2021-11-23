// js script to interact with celo blockchain to change the block gas limit 
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8540')
const kit = ContractKit.newKitFromWeb3(web3)

async function send() {
    senderPrivateKey='35bfb8ce6916c1d1bf63ce18f36911031e494389b35ce75742b5742044cc97e2'
    senderAddress='0x30ea7A639CcfeC279A7a18e19263c5e9B10137C6'

        let blockgas = await kit.contracts.getBlockchainParameters()
    
        kit.connection.addAccount(senderPrivateKey) 

        const tx= await blockgas.setBlockGasLimit(10000000).send({
          from: senderAddress,
        })
        const hash = await tx.getHash();
        const receipt = await tx.waitReceipt()

        console.log(hash)
        console.log(receipt)
   
}
send();
