
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8540')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

var count=0;

async function height() {
   for(var i=1;i<=1000000;i++)
   {
      try {
       await allTrx(i)
      } catch(err) {
         console.log("in the height function ",err)
         continue;
      }
   }
}

async function allTrx(h)
{
    
   
    let goldtoken = await kit.contracts.getGoldToken()
    let notrx=0;
   
try {
   for(var i=Math.pow(2,h-1); i<=Math.pow(2,h) -1 ;i++)    // parent node loop
   {
      
    var Dpath="m/44'/52752'/0'/"+i
    const wallet = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",Dpath)
    kit.connection.addAccount(wallet.privateKey)
    var senderAddress =wallet.address
    var celoBal = await goldtoken.balanceOf(wallet.address)
    var amount= celoBal.idiv(3)

       for(var j=0;j<=1;j++)                              // child node loop
       {
          notrx++
        var child=2*i+j
        var DpathChild="m/44'/52752'/0'/"+child
        var walletChild = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",DpathChild)
        var rec=walletChild.address
        
        if(i >= Math.pow(2,h) -2 || notrx%10000==0 || notrx%10000==1)
        {
           try {
              try{
            var celotrx =  await goldtoken.transfer(rec, amount).send({from: senderAddress, nonce:j })
            }
              catch(err) {
                 console.log("transfer fail catch", err)
              }
              try {
            var celoReceipt2 = await celotrx.waitReceipt()         
            console.log('CELO Transaction receipt: %o', celoReceipt2)
              }
              catch(err1) {
                 console.log("receipt fail catch", err1)
              }
            console.log("transaction number confirmed ", count)
                 count++;
            console.log("height ",h," node mumber ",i," total number of trx ",count," trx in this loop ",notrx)

           }
           catch(err) {
              console.log("error inside if condition",err)
              continue;
           }

        }
        else{
           try {
            var celotrx =   goldtoken.transfer(rec, amount).send({from: senderAddress, nonce:j })
                    count++;
             console.log("height ",h," node mumber ",i," total number of trx ",count," trx in this loop ",notrx)        
            }
           catch(err) {
                    console.log("inside else condition ",err)
              continue;
           }   
        }  
       } //j
   }
} catch(err) {
   console.log("at end of all trx ",err)
}


}

height();
