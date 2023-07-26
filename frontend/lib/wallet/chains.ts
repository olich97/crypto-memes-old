import { IChainData } from './types';

const supportedChains: IChainData[] = [
  /*
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://eth-mainnet.alchemyapi.io/v2/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://eth-ropsten.alchemyapi.io/v2/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  */
  {
    name: 'Ethereum Sepolia',
    short_name: 'sep',
    chain: 'ETH',
    network: 'sepolia',
    chain_id: 11155111,
    network_id: 11155111,
    rpc_url: process.env.SEPOLIA_URL,
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Hardhat Local',
    short_name: 'hrd',
    chain: 'ETH',
    network: 'local',
    chain_id: 31337,
    network_id: 1,
    rpc_url: 'http://127.0.0.1:8545/',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
];

export default supportedChains;
