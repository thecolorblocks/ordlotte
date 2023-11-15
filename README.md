# Introducing: The Ordlotte Protocol

Raffles and giveaways are commonplace. Especially in crypto. Is it fair? Who gets to win? How do you verify?

The spirit of blockchain is the *open ledger*. It is an immutable database accessible to everyone. The blockchain does not lie.

So, a lottery system that is truly fair and open aligns with the spirit of the blockchain.

Ordinals emerged as a breeding ground for new open protocols to emerge.

Sats Names. BRC20. Bitmaps.

This time, we introduce: **ordlotte**.

## Why Ordlotte?

Proofs of randomness and raffle/giveaway results are all verifiable on chain. Don't trust. Verify.

Using future block hash to guarantee provable randomness. 

*Bitcoin-native event* using *Bitcoin-native metrics* running on *Bitcoin-native time*.

## Operations

To host a open and fair lottery on Ordinals, you must first **inscribe a provably fair algorithm**, written in JavaScript, that generates winners from an array of wallets. Or you can use someone else's algorithm inscription. One implementation is inscribed at `20f489560d91926eb032d4d2a5b8045ac885ee80184c12d4fc682fd81af07851i0`.

```javascript
const ordlotte = {
  draw: async (blockheight, wallets) => {
    const response = await window.fetch(`/blockhash/${blockheight}`)
    if ( !response.ok ) return false
    const blockhash = await response.text()
    console.log('Blockhash: ' + blockhash)
    const seed = new TextEncoder().encode(blockhash)
    const buffer = await crypto.subtle.digest('SHA-256', seed)
    const hashed = Array.from(
      new Uint8Array(buffer)
    ).map(byte => byte.toString(16).padStart(2, '0')).join('')
    console.log('Hex: ' + hashed)
    const hashBigInt = BigInt('0x' + hashed)
    const winnerIndex = hashBigInt % BigInt(wallets.length)
    const winner = wallets[winnerIndex]
    console.log('Winner: ' + winner)
    return winner
  }
}

export default ordlotte
```

And then, inscribe a **draw operation**. One `draw` operation is inscribed at `5f76a1e9b28053dae722745d7dc4906b09030bd7e9d9a0d082ef2cb21cca171ei0`.

```JSON
{
  "p": "ordlotte",
  "op": "draw",
  "blockheight": 800000,
  "algorithm": "801b92bb7fa3013d01e1802e87752e9a050bda7ea80e01d1fd67d3eecc01b7dci0",
  "host": "bcrt1pm88jfm704nyyx5yky8qw02ru7eh7fjn59te34rwv723kzvnhy6wq76ljl5",
  "prize": [
    "3cf20548780bfe057f407fc0a90b1ca0785cf44eefcc3f056a3d55a3f2624a12i0",
    "9799f8f98074f74b985102b2d35e21faea2a6416027bfe12db16f89196ad7387i0"
  ],
  "wallets": [
    "bc1prsgn3mjpu24e4r494shxcvggun2pzq5d06rq97sqq4h7lqejdj4qqhujae",
    "bc1q5k6s83q64kp5yrayk6zwh3hnrg4kp80z9tf80k",
    "bc1qds28csqtvkcrcw0htxfa7ct8hzcgrvl9dkp9f9",
    "bc1pj6crdmcleu8m23nfpv9hc5q27mdu42czjlwt422a20c6c92npm2sw53z55",
    "bc1qv2w75st9xpdd2083h839s8ung7wxglv3a7nrd2"
  ]
}
```

## Implementation Details

#### Algorithm

The specific implementations of the algorithm can vary. It is suggested that the JavaScript inscription contains an object constant `ordlotte`, and exposes an asynchronous `draw` function, which takes two parameters: `blockheight: Integer` and `wallets: Array`.

```javascript
// The object constant ordlotte
const ordlotte = {
  // The asynchronous draw function
  // Take blockheight and wallets as two parameters
  draw: async (blockheight, wallets) => {
    // return the winner wallet(s) based on the block hash of "blockheight"
  }
}

// For ES6 modules syntax
export default ordlotte
```

For parameters, `wallets` is self-explanatory: it is an array of all participants represented by their participating wallet address. The `blockheight` parameter is needed because the algorithm, despite variations in implementations, will always fetch the `blockhash` of `blockheight`, and uses `blockhash` to generate the provably random winner with the block hash as input. The `blockhash` is fetched using the Ordinal recursive endpoint `/blockhash/:height`.

Using the `blockheight` is culturally significant. It signifies that, at this specific block height, the winner will be drawn based on the randomness of the block hash of that height. This is _Bitcoin-native event_ using *Bitcoin-native metrics* running on _Bitcoin-native time_.

#### Draw Operation

`p` is protocol, which is always `ordlotte`.

`op` is always `draw`, signifying a draw operation in the `ordlotte` protocol.

`blockheight` is the future block height that this `draw` operation will commence. For the `draw` operation to be valid, the operation must be inscribed before `blockheight`.

`algorithm` is the inscription ID of the JavaScript algorithm inscription.

`host` is the host address of this draw. `host` must already own the inscription(s) listed in `prize` for this `draw` operation to be valid.

`prize` is a list of prize(s), represented by inscription ID(s).

`wallets` is a list of wallets, represented by addresses.

#### Verify Results

Once the `blockheight` is reached, you can use the `ordlotte.draw` function to verify the winner.

