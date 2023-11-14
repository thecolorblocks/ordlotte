# Introducing: The Ordlotte Protocol

Raffles and giveaways are commonplace. Especially in crypto. Is it fair? Who gets to win? How do you verify?

The spirit of blockchain is the *open ledger*. It is an immutable database accessible to everyone. The blockchain does not lie.

So, a lottery system that is truly fair and open aligns with the spirit of the blockchain.

Ordinals emerged as a breeding ground for new protocols to emerge.

Sats Names. BRC20. Bitmaps.

This time, we introduce: **ordlotte**.

## Operations

To host a open and fair lottery on Ordinals, you must first **inscribe a provably fair algorithm**, written in JavaScript, that generates winners from an array of wallets.

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

The specific implementations can vary. It is suggested that the JavaScript inscription contains an object constant `ordlotte`, and exposes an asynchronous `draw` function, which takes two parameters: `blockheight: Integer` and `wallets: Array`.

`wallets` is self-explanatory: it is an array of all participants represented by their participating wallet address. The `blockheight` parameter is needed because the algorithm, despite variations in implementations, will always fetch the block hash of that specific block height, and uses said block hash to generate the provably random winner with the block hash as input.

In this example implementation, the block hash is hased, resulting in a sha-256 base16 hex string, then transcoded to base10, and obtaining the winner through modular arithmetic.

The `blockheight` variable is culturally significant. It signifies that, at this specific block height, the winner will be drawn based on the randomness of the block hash of that height. This is _Bitcoin-native event_ using *Bitcoin-native metrics* running on _Bitcoin-native time_.

And then, inscribe a **draw operation**.

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
    "bc1qv2w75st9xpdd2083h839s8ung7wxglv3a7nrd2",
    "bc1punsktksstjt64zku56xsp52k8zue32ejxpdnzvjjrt8rh2hyynws3gkmc2",
    "bc1pl9r4ahj6hc2qfuj66x8prlxzvzxtsmk5kjre4mfe20m94uws3g6q0rgx0l",
    "bc1pnww2d9sms643h4l4md9ufpx47n88sg9s8ul2nvw6yydp5446dl9qd6exws",
    "bc1q8lgqnj5z7vwqadj3fknefw6mxsfcnlgsxhvkk2",
    "bc1pek6kayzu0awcrp7nfvrdu8824udek5jp6j6ulsctfrh55k67xjtskafrw7",
    "bc1pxf40njk8mhxtm852sg7kxyu7m76and8t637snvkx9vay4rm4905qmw0frk",
    "bc1pqguuyxl5m229usnme6nhaurza6ampn3tuxnv4lexgtge5hskyhsqekfd3z",
    "bc1qv28tx26te8k9x2mnv6l0tmedqmld7a54e0wnzf"
  ]
}
```
