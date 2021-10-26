
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8540')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

var count=0;

async function height() {
   for(var i=1;i<=1000000;i++)
   {
       await allTrx(i)
   }
}

async function allTrx(h)
{
    
   
    let goldtoken = await kit.contracts.getGoldToken()
    let notrx=0;

   for(let i=Math.pow(2,h-1); i<=Math.pow(2,h) -1 ;i++)    // parent node loop
   {
      
    let Dpath="m/44'/52752'/0'/"+i
    const wallet = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",Dpath)
    kit.connection.addAccount(wallet.privateKey)
    let senderAddress =wallet.address
    let celoBal = await goldtoken.balanceOf(wallet.address)
    let amount= celoBal.idiv(3)

       for(let j=0;j<=1;j++)                              // child node loop
       {
          notrx++
        let child=2*i+j
        let DpathChild="m/44'/52752'/0'/"+child
        const walletChild = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",DpathChild)
        let rec=walletChild.address
        
        if(i >= Math.pow(2,h) -2)
        {
           try {
            let celotrx =  await goldtoken.transfer(rec, amount).send({from: senderAddress, nonce:j })
            let celoReceipt2 = await celotrx.waitReceipt()         
            console.log('CELO Transaction receipt: %o', celoReceipt2)
            console.log("transaction number confirmed ", count)
            count++;
            console.log("height ",h," node mumber ",i," total number of trx ",count," trx in this loop ",notrx)

           }
           catch(err) {
              console.log("error ",err.name, err.message)
           }

        }
        else{
           try {
            let celotrx =   goldtoken.transfer(rec, amount).send({from: senderAddress, nonce:j })
                    count++;
             console.log("height ",h," node mumber ",i," total number of trx ",count," trx in this loop ",notrx)        
            }
           catch(err) {
                    console.log("error ",err.name, err.message)
           }
           
        }
         
       }
   }


}

height();
