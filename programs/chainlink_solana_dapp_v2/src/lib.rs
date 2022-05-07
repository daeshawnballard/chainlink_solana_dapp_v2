use anchor_lang::prelude::*;

declare_id!("6NoQYfcC8361zT7zYcHt5wyCoRenPReiy2QcXW9PmuV");

#[program]
pub mod chainlink_solana_dapp_v2 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
