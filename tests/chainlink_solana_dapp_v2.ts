import * as anchor from "@project-serum/anchor";

const CHAINLINK_FEED = "HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6";
const CHAINLINK_PROGRAM_ID = "CaH12fwNTKJAG8PxEvo9R96Zc2j8qNHZaFj8ZW49yZNT";
describe("chainlink_solana_dapp_v2", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChainlinkSolanaDapp
  it('Queries SOL/USD Price Feed', async() => { 
    const resultAccount = anchor.web3.Keypair.generate();
    await program.rpc.execute({
      accounts: {
          resultAccount: resultAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          chainlinkFeed: CHAINLINK_FEED,
          chainlinkProgram: CHAINLINK_PROGRAM_ID
      },
      signers: [resultAccount],
    });
    const latestPrice = await program.account.resultAccount.fetch(resultAccount.publicKey)
    //dividing into the units that will give us usd
    console.log("Price is: " + latestPrice.value / 100000000)
  });
});
