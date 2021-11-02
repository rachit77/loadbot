//serialising transactions by transfering token from one address to all its sibling 

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
  let first=Math.pow(2,h-1)
  let first_Dpath= "m/44'/52752'/0'/"+first
  let first_address = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",first_Dpath)
  kit.connection.addAccount(first_address.privateKey)
  let first_celoBal = await goldtoken.balanceOf(first_address.address)
  total_nodes = Math.pow(2,h) - Math.pow(2,h-1)
  transfer_amount = first_celoBal/(10*total_nodes)
  
  let nonc=0
  let notrx = 0

   for(let i=Math.pow(2,h-1)+1; i<=Math.pow(2,h) -1 ;i++)    // parent node loop
   {
      
    let Dpath="m/44'/52752'/0'/"+i
    const wallet = ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",Dpath)
    
    let receiverAddress =wallet.address
    
            try {
            let celotrx =  await goldtoken.transfer(receiverAddress, transfer_amount).send({from: first_address, nonce:nonc })
            }
            catch(err) {
              console.log("inside catch block of sibling transaction")
            }
            nonc++
            notrx++
            count++;
            console.log("height ",h," node mumber ",i," total number of trx ",count," trx in this loop ",notrx)

   }          // for loop end
  
  remaining_bal= await goldtoken.balanceOf(first_address.address)
  remaining_transferable_bal = remaining_bal - 100 // remainig balance after deduction for gas
  next= 2*first
  next_Dpath = "m/44'/52752'/0'/"+next
  next_receiver=ethers.Wallet.fromMnemonic("alien shell toy depth share work clarify tattoo grass tank master board",next_Dpath)
  
  try {
let last_trx =  await goldtoken.transfer(next_receiver.address , remaining_transferable_bal).send({from: first_address, nonce:j })
           let lastReceipt = await last_trx.waitReceipt()         
           console.log('CELO Transaction receipt: %o', lastReceipt)
  }
  catch(err) {
    console.log("inside catch block of last trx")
  }
   }

height();
