import * as dotenv from 'dotenv';

dotenv.config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID
const WALLET_PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY

if (!INFURA_PROJECT_ID || !WALLET_PRIVATE_KEY || !WALLET_PUBLIC_KEY) {
  throw new Error(`Missing required environment variables:
    INFURA_PROJECT_ID: ${INFURA_PROJECT_ID ? 'Set' : 'Not Set'}
    WALLET_PUBLIC_KEY: ${WALLET_PUBLIC_KEY ? 'Set' : 'Not Set'}
    WALLET_PRIVATE_KEY: ${WALLET_PRIVATE_KEY ? 'Set' : 'Not Set'}
  `);
}

export const CurrentConfig = {
  // Sepolia or Mainnet
  env: 'Sepolia',
  rpc: {
    sepolia: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
    mainnet: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  },
  wallet: {
    address: WALLET_PUBLIC_KEY,
    privateKey: WALLET_PRIVATE_KEY,
  },
  token: {
    token0Address: '0x3937ef73FE3a1d0bFD64da4c4241d0CCb079e9f5',
    token1Address: '0x253fB316AFcc99AdB03D5a477bd5Aba364eAc305',
    token0AmountForMint: 1000000,
    token1AmountForMint: 2000000,
    token0AmountToApprove: 10000000,
    token1AmountToApprove: 10000000,
    token0AmountForSwapMax: 5000,     // Max value
    token1AmountForSwap: 1000,
  }
}

export const TO_ADDRESS = '0x79C6eBaab1B0e7D785f4F2140E4737255343b4D9'
