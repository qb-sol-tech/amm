import { ethers } from "ethers"
import { ChainId, Token } from "@uniswap/sdk-core"
import { Pair } from "@uniswap/v2-sdk"

import { ERC20_ABI, SEPOLIA_CHAIN_ID } from "../constants"
import { getProvider, getWallet } from "../providers"
import { CurrentConfig, Environment } from "../../config"

import * as dotenv from 'dotenv'
import { ROUTER_ABI } from "../abi"

dotenv.config()

const token0Address = process.env.TOKEN0_ADDRESS
const token1Address = process.env.TOKEN1_ADDRESS
const percentToBuy = process.env.PERCENT_TO_BUY

const v2RouterAddress = CurrentConfig.env == 'Mainnet'
  ? '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  : '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3'

export async function addLiquidity() {

  if (!token0Address || !token1Address || !percentToBuy) {
    throw new Error(`Missing required environment variables:
      TOKEN0_ADDRESS: ${token0Address ? 'Set' : 'Not Set'}
      TOKEN1_ADDRESS: ${token1Address ? 'Set' : 'Not Set'}
      PERCENT_TO_BUY: ${percentToBuy ? 'Set' : 'Not Set'}
    `)
  }
  const tokenAContract = new ethers.Contract(token0Address, ERC20_ABI, getProvider())
  const tokenBContract = new ethers.Contract(token1Address, ERC20_ABI, getProvider())

  const tokenADecimals = await tokenAContract.decimals()
  const tokenBDecimals = await tokenBContract.decimals()

  const tokenADecimalsNumber = Number(tokenADecimals)
  const tokenBDecimalsNumber = Number(tokenBDecimals)

  // TODO: change chain id on mainnet
  const tokenA = new Token(SEPOLIA_CHAIN_ID, token0Address, tokenADecimalsNumber)
  const tokenB = new Token(SEPOLIA_CHAIN_ID, token1Address, tokenBDecimalsNumber)

  console.log('tokenA: ', tokenA)
  console.log('tokenB: ', tokenB)

  try {
    const pairAddress = Pair.getAddress(tokenA, tokenB)
    console.log('pairAddress: ', pairAddress)
    console.log('sepolia v2 router address: ', v2RouterAddress)

    const pairContract = new ethers.Contract(pairAddress, ROUTER_ABI, getProvider())

    let reserves

    try {
      reserves = await pairContract.getReserves()
      console.log(`Reserves for pair: ${tokenA.symbol}-${tokenB.symbol}: ${reserves}`)
    } catch (error) {
      console.log('Pair does not exist, It will be created when liquidity is added')
    }

    const amountADesired = ethers.parseUnits(CurrentConfig.tokens.token0AmountForMint.toString(), tokenA.decimals)
    const amountBDesired = ethers.parseUnits(CurrentConfig.tokens.token1AmountForMint.toString(), tokenA.decimals)

    const tokenAContract = new ethers.Contract(tokenA.address, ERC20_ABI, getWallet())
    const tokenBContract = new ethers.Contract(tokenB.address, ERC20_ABI, getWallet())

    console.log("Approving tokens for router")
    await tokenAContract.approve(v2RouterAddress, amountADesired)
    await tokenBContract.approve(v2RouterAddress, amountBDesired)
    console.log("Tokens approved")

    const routerContract = new ethers.Contract(v2RouterAddress, ROUTER_ABI, getWallet())

    const slippageTolerance = 5n
    const amountAMin = amountADesired * (100n - slippageTolerance) / 100n
    const amountBMin = amountBDesired * (100n - slippageTolerance) / 100n
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10

    console.log("Adding liquidity")

    const gasLimit = 3000000n

    const tx = await routerContract.addLiquidity(
      tokenA.address,
      tokenB.address,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      getWallet().address,
      deadline,
      {
        gasLimit
      },
    )

    await tx.wait()
    console.log("Liquidity added successfully")

  } catch (error) {
    console.log('Error adding liquidity ', error)
  }
}
