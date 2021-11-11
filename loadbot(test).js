// sending all the transactions from a single node


const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8540')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");
require('events').EventEmitter.defaultMaxListeners = 0

var count=0;


async function allTrx()
{
    
   
    let goldtoken = await kit.contracts.getGoldToken()
    let notrx=0;
  
  let Dpath="m/44'/52752'/0'/"+1
    const wallet = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",Dpath)
    kit.connection.addAccount(wallet.privateKey)
    let senderAddress =wallet.address
    let celoBal = await goldtoken.balanceOf(wallet.address)
    let amount= 10

   for(let i=2; i<=100000000 ;i++)    // parent node loop

   {
        let DpathChild="m/44'/52752'/0'/"+i
        const walletChild = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",DpathChild)
        let rec=walletChild.address
        
        
           try {
            let celotrx = goldtoken.transfer(rec, amount).send({from: senderAddress, nonce:i-2 })
            console.log("transaction number ", count)
            count++;

           }
           catch(err) {
              consoole.log("count error", count)
              console.log("error ",err)
             count++
       }
   }


}

allTrx();
