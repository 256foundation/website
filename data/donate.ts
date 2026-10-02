/** Bitcoin on-chain donation address */
export const BITCOIN_ADDRESS = 'bc1qce93hy5rhg02s6aeu7mfdvxg76x66pqqtrvzs3'

/** Lightning address for instant, near-zero fee donations */
export const LIGHTNING_ADDRESS = '256foundation@strike.me'

/** Zaprite checkout link. Override with NEXT_PUBLIC_ZAPRITE_URL. */
export const ZAPRITE_URL =
  process.env.NEXT_PUBLIC_ZAPRITE_URL ?? 'https://pay.zaprite.com/pl_ZRWeSGjRWG'
