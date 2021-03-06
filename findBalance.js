// js script to find celo balance of any address generated from given mnemonic and derivation path
const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8540')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

async function send(i) {
    let goldtoken = await kit.contracts.getGoldToken()

Dpath="m/44'/52752'/0'/"+i  //derivation path
mnemonic ="alien shell toy depth share work clarify tattoo grass tank master board"
const wallet = ethers.Wallet.fromMnemonic(mnemonic,Dpath)

console.log(wallet.address);
let celoBalanc = await goldtoken.balanceOf(wallet.address) 
console.log(`Your new account CELO balance: ${celoBalanc.toString()}`)
}

send(55818);  // postion of address in derivation path whose balance is to be queried 
