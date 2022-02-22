import { Result } from '../types/result';
import supportedChains from './chains';
import { IChainData } from './types';

export function getChainData(chainId?: number): Result {
  if (!chainId) {
    return null;
  }
  const chainData: IChainData = supportedChains.filter((chain: any) => chain.chain_id === chainId)[0];

  if (!chainData) {
    return Result.fail('Selected chain is not supported!');
  }
  /*
  const API_KEY = '460f40a260564ac4a4f4b3fffb032dad';

  if (chainData.rpc_url.includes('infura.io') && chainData.rpc_url.includes('%API_KEY%') && API_KEY) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }
  */
  return Result.ok('Ok', chainData);
}

export function ellipseAddress(address = '', width = 10): string {
  if (!address) {
    return '';
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}
