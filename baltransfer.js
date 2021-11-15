
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8545')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

async function send() {
    senderPrivateKey='6402ef54e42cd7df71d55e8989c79369913244b6e57f2f3c16d4d9af0619dd22'
    senderAddress='0xd781a2B6686695B875a6e6BD3b453561A922Afa4'

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

