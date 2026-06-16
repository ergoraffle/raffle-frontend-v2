export const PINED_RAFFLES_STORAGE_KEY = 'pinned_raffles';
export const TRANSACTIONS_STORAGE_KEY = 'transactions';

/**
 * The X.com (Twitter) account whose mentions ErgoRaffle polls for social posts.
 * Used to build the pre-filled "Post on X" intent link in the RaffleSocial
 * "how to post" manual (as the `via` mention). Bare handle, no leading "@".
 *
 * Keep in sync with the backend poller's `social.handle` config: a post must
 * tag this account *and* include the raffle link to be discovered.
 */
export const ERGORAFFLE_X_HANDLE = 'ergoraffle';
