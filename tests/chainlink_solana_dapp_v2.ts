import * as anchor from "@project-serum/anchor";

const CHAINLINK_FEED = "HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6";
const CHAINLINK_PROGRAM_ID = "A6yXNn3FnMCJj2X2NhNbHSrFRG9bSP8VoLSqBBBHK5JH";
describe("chainlink_solana_dapp_v2", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChainlinkSolanaDapp
  it('Queries SOL/USD Price Feed', async() => { 
    const resultAccount = anchor.web3.Keypair.generate();
    await program.methodes.execute({
      accounts: {
          resultAccount: resultAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          chainlinkFeed: CHAINLINK_FEED,
          chainlinkProgram: CHAINLINK_PROGRAM_ID
      },
      signers: [resultAccount],
    })
    .signers([resultAccount])
    .rpc()

    const latestPrice = await program.account.resultAccount.fetch(resultAccount.publicKey)
    //dividing into the units that will give us usd
    console.log("Price is: " + latestPrice.value / 100000000)
  });
});
