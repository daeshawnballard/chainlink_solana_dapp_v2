import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ChainlinkSolanaDappV2 } from "../target/types/chainlink_solana_dapp_v2";

describe("chainlink_solana_dapp_v2", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ChainlinkSolanaDappV2 as Program<ChainlinkSolanaDappV2>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
