js script which logs the gas consumed by each block and pending transactions in txpool 
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8540')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

async function block() {
  let blockDetail= await kit.web3.eth.getBlock("latest")
 
  
  let pendingTrx =await kit.web3.eth.getPendingTransactions()
  let numOfPendingTrx= pendingTrx.length()
   console.log("block number ",blockDetail.number ," gas consumed ",blockDetail.gasUsed," number of pending trx ",numOfPendingTrx)
}

setInterval(block,5000);
