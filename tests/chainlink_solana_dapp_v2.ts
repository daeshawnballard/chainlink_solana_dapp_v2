import * as anchor from "@project-serum/anchor";
import { ChainlinkSolanaDappV2 } from "../target/types/chainlink_solana_dapp_v2";
import { Program } from "@project-serum/anchor";

let provider = anchor.AnchorProvider.env();
anchor.setProvider(anchor.AnchorProvider.env());

const CHAINLINK_FEED = "HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6";
const CHAINLINK_PROGRAM_ID = "31xNV613uNqutXFi35nCCbGuDUbr7p26SMJZoJFLKrAk";

 describe("chainlink_solana_dapp_v2", () => {
  const program = anchor.workspace.ChainlinkSolanaDappV2 as Program<ChainlinkSolanaDappV2>;
   it('Queries SOL/USD Price Feed', async() => { 
    console.log(program)
    const resultAccount = anchor.web3.Keypair.generate();
      const tx = await program.methods.execute()
        .accounts({
          resultAccount: resultAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          chainlinkFeed: CHAINLINK_FEED,
          chainlinkProgram: CHAINLINK_PROGRAM_ID
        })
        .signers([resultAccount])
        .rpc()

      console.log(tx)
    const latestPrice = await program.account.resultAccount.fetch(resultAccount.publicKey)
    //dividing into the units that will give us usd
    console.log("Price is: " + latestPrice.value / 1e9)
  });
});

