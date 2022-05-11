use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_lang::solana_program::system_program;
use chainlink_solana as chainlink;

declare_id!("A6yXNn3FnMCJj2X2NhNbHSrFRG9bSP8VoLSqBBBHK5JH");

#[program]
pub mod chainlink_solana_dapp_v2 {
    use super::*;
    pub fn execute(ctx: Context<Execute>) -> ProgramResult { 
        let round = chainlink::latest_round_data(
            ctx.accounts.chainlink_program.to_account_info(),
            ctx.accounts.chainlink_feed.to_account_info())?;
        let result_account =&mut ctx.accounts.result_account;
        result_account.value = round.answer;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Execute<'info>{ 
    #[account(init, payer=user, space=100)]
    pub result_account: Account<'info, ResultAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(address = system_program::ID)]
    /// CHECK: This is not dangerous
    pub system_program: AccountInfo<'info>,
    /// CHECK: This is not dangerous
    pub chainlink_program: AccountInfo<'info>,
    /// CHECK: This is not dangerous
    pub chainlink_feed: AccountInfo<'info>
}

#[account]
pub struct ResultAccount {
    pub value: i128
}