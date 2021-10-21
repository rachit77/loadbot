const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8545')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

async function send(i) {
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()


Dpath="m/44'/52752'/0'/"+i  //derivation path
mnemonic =alien shell toy depth share work clarify tattoo grass tank master board
const wallet = ethers.Wallet.fromMnemonic(mnemonic,Dpath)

console.log(wallet.address);
let celoBalanc = await goldtoken.balanceOf(wallet.address) 
console.log(`Your new account CELO balance: ${celoBalanc.toString()}`)
}

send(55818);
