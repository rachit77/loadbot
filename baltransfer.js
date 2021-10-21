
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8545')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

async function send() {
    senderPrivateKey='6402ef54e42cd7df71d55e8989c79369913244b6e57f2f3c16d4d9af0619dd22'
    senderAddress='0xd781a2B6686695B875a6e6BD3b453561A922Afa4'
    receipientAddress='0x161346de641D281883A9B20Da9B077decE83C694'
    
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()
    
    let celoBalanc = await goldtoken.balanceOf(receipientAddress)


    console.log(`Receipient intial CELO balance: ${celoBalanc.toString()}`)

        //  Add your account to ContractKit to sign transactions
        kit.connection.addAccount(senderPrivateKey) 

      let celoBal = await goldtoken.balanceOf('0xd781a2B6686695B875a6e6BD3b453561A922Afa4')
      let value= celoBal.idiv(2)
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

