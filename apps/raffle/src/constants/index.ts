export const PINED_RAFFLES_STORAGE_KEY = 'pinned_raffles';
export const TRANSACTIONS_STORAGE_KEY = 'transactions';

/**
 * The X.com (Twitter) account associated with ErgoRaffle's social posts.
 * Used to build the pre-filled "Post on X" intent link in the RaffleSocial
 * "how to post" manual, where it is embedded as the `@mention` directly in the
 * compose `text` (preferred over a `via` attribution — a text mention survives
 * better and is one of the poller's two discovery prongs). Bare handle, no
 * leading "@".
 *
 * Keep in sync with the backend poller's `social.handle` config. Note discovery
 * is "mention OR raffle-URL": the raffle link is the identifier and is what's
 * required; tagging this account is an additional discovery prong, not mandatory.
 */
export const ERGORAFFLE_X_HANDLE = 'ergoraffle';
