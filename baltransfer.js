
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8545')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

async function send() {
    senderPrivateKey='35bfb8ce6916c1d1bf63ce18f36911031e494389b35ce75742b5742044cc97e2'
    senderAddress='0x30ea7A639CcfeC279A7a18e19263c5e9B10137C6'

    const mnemonic ="owner brisk action valid mammal hold use lake calm huge plug leaf"
    Dpath="m/44'/52752'/0'/"+1  //derivation path
    const wallet = ethers.Wallet.fromMnemonic(mnemonic,Dpath)

    receipientAddress= wallet.address
    
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()
    
    let celoBalanc = await goldtoken.balanceOf(receipientAddress)


    console.log(`Receipient intial CELO balance: ${celoBalanc.toString()}`)

        //  Add your account to ContractKit to sign transactions
        kit.connection.addAccount(senderPrivateKey) 

      let celoBal = await goldtoken.balanceOf(senderAddress)
     
      let value= celoBal.minus(30000000000000)
      console.log(celoBal.toString())
      console.log(value.toString())
      let amount=value
        
        let celotx = await goldtoken.transfer(receipientAddress, amount).send({from: senderAddress})
        
        let celoReceipt = await celotx.waitReceipt()        
        console.log('CELO Transaction receipt: %o', celoReceipt)        

      
        let celoBalance = await goldtoken.balanceOf(receipientAddress)
       
        console.log(`Receipient new CELO balance: ${celoBalance.toString()}`)
   
}
send();

