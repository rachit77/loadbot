const Web3 = require("web3")
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('http://localhost:8545')
const kit = ContractKit.newKitFromWeb3(web3)
const ethers = require("ethers");

var count=0 // count of total transaction executed

async function send(i) {
    
    let goldtoken = await kit.contracts.getGoldToken()


            let Dpath="m/44'/52752'/0'/"+i  //derivation path
            walletMnemonic= alien shell toy depth share work clarify tattoo grass tank master board
            const wallet = ethers.Wallet.fromMnemonic(walletMnemonic,Dpath)
            kit.connection.addAccount(wallet.privateKey)   // added private key in contract kit to sign the transaction

            //sender 
            let senderAddress =wallet.address
            let celoBal = await goldtoken.balanceOf(wallet.address)  //balance of sender
            let value= celoBal.idiv(3)  //balance divided into 3 parts
            let amount=value

            //sending trx to child
            let p1=2*i                             // first child node
            let p2=2*i +1                          //second child node
            let Dpath1="m/44'/52752'/0'/"+p1       //derivation path for first child node
            let Dpath2="m/44'/52752'/0'/"+p2       //derivation path for second child node

            //console.log(Dpath1)
            //console.log(Dpath2)
            
            //address of first receiver
            const wallet1 = ethers.Wallet.fromMnemonic(walletMnemonic,Dpath1)
            let receiver1=wallet1.address
            //console.log(receiver1)

            // address of second receiver
            const wallet2 = ethers.Wallet.fromMnemonic(walletMnemonic,Dpath2)
            let receiver2=wallet2.address
            //console.log(receiver2)

            //firing transaction for first receiver
            let celotx1 =  await goldtoken.transfer(receiver1, amount).send({from: senderAddress})
            let celoReceipt1 =  await celotx1.waitReceipt()         
            console.log('CELO Transaction receipt: %o', celoReceipt1)
            count++
            console.log("total number of transaction validated till now", count)
            
            send(p1)

            // firing transaction for second receiver
            let celotx2 = await goldtoken.transfer(receiver2, amount).send({from: senderAddress})
            let celoReceipt2 = await celotx2.waitReceipt()         
            console.log('CELO Transaction receipt: %o', celoReceipt2)
            count++
            console.log("total number of transaction validated till now", count)
           
            send(p2)
    }

    send(1);



//./mycelo genesis --buildpath ~/celom-3/celo-monorepo/packages/protocol/build/contracts --newenv ~/celom-3/envfolder --template=local --mnemonic "alien shell toy depth share work clarify tattoo grass tank master board" --validators 1


