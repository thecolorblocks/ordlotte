/**
 * ORDINAL LOTTERY PROTOCOL (ordlotte)
 * Classic Draw. One winner from all wallets.
 * 
 * thecolorblocks[at]proton[dot]me
*/

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