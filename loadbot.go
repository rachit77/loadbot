// loadbot script to generate public address 
// this is done by sending transactions from a single address to different addresses

package loadbot

import (
	"context"
	"fmt"
        "log"
	"math/big"
	"sync"
	"time"

	"github.com/celo-org/celo-blockchain/common"
        "github.com/celo-org/celo-blockchain/core/types"

	"github.com/celo-org/celo-blockchain/ethclient"
	"github.com/celo-org/celo-blockchain/mycelo/env"
	"golang.org/x/sync/errgroup"
)

var mnemonic ="" // mnemonic to generate new public address 

// TxConfig contains the options for a transaction
type txConfig struct {
	Acc               env.Account
	Nonce             uint64
	Recipient         common.Address
	Value             *big.Int
}

// Config represent the load bot run configuration
type Config struct {
	ChainID               *big.Int
	Accounts              []env.Account
	Amount                *big.Int
	TransactionsPerSecond int
	Clients               []*ethclient.Client
	Verbose               bool
	MaxPending            uint64
	SkipGasEstimation     bool
	MixFeeCurrency        bool
}

// Start will start loads bots
func Start(ctx context.Context, cfg *Config) error {
	
	val := big.NewInt(100)
	nonces := make([]uint64, len(cfg.Accounts))
	for i, a := range cfg.Accounts {
		nonce, err := cfg.Clients[0].PendingNonceAt(ctx, a.Address)
		if err != nil {
			return fmt.Errorf("failed to retrieve pending nonce for account %s: %v", a.Address.String(), err)
		}
		nonces[i] = nonce
	}

	
	recpIdx := 0
	sendIdx := 0

	// Fire off transactions
	period := 1 * time.Second / time.Duration(cfg.TransactionsPerSecond)
	ticker := time.NewTicker(period)
	group, ctx := errgroup.WithContext(ctx)
	
	for {
		select {
		case <-ticker.C:
			
      recpointer,err1 := env.DeriveAccount(mnemonic,1,recpIdx)
      if err1 != nil {
        log.Fatal(err1)
      }
      
      recipient := (*recpointer).Address
      recpIdx++
      

			sendIdx++
			sender := cfg.Accounts[sendIdx%1000 ]                                  //cfg.Accounts[sendIdx%len(cfg.Accounts)]
			nonce := nonces[sendIdx%1000]
			nonces[sendIdx%1000]++

			client := cfg.Clients[0]
			group.Go(func() error {
				txCfg := txConfig{
					Acc:               sender,
					Nonce:             nonce,
					Recipient:         recipient,
					Value:             val,
				}
				return runTransaction(ctx, client, cfg.ChainID, txCfg, recpIdx)
			})
		case <-ctx.Done():
			return group.Wait()
		}
	}
}

func runTransaction(ctx context.Context, client *ethclient.Client, chainID *big.Int, txCfg txConfig, recpIdx int) error {
	
  var data []byte
  gasLimit := uint64(21000)
  gasPrice,err := Clients.SuggestGasPrice(context.Background())
  if err!= nil {
    log.Fatal(err)
  }
  
  tx:= types.NewTransaction(txCfg.Nonce, txCfg.Recipient, txCfg.Value, gasLimit, gasPrice,nil, nil, nil, data)
  
  signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainId), txCfg.Acc.PrivateKey)
  if err != nil {
    log.Fatal(err)
  }
	return err
	fmt.Printf("recipient index is %v \n",recpIdx)
}

