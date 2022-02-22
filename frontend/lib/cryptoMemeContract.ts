import { ethers } from 'ethers';
import config from './config';

import CryptoMeme from './contracts/CryptoMeme.json';
import { MemeInfo } from './types/meme';
import { Result } from './types/result';

function isConnectionValid(): boolean {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem('WEB3_ADDRESS');
    if (value && value !== '') return true;
  }

  return false;
}

export function getCurrentAddress(): string {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('WEB3_ADDRESS');
  }

  return null;
}

export function setCurrentAddress(address: string): void {
  if (typeof window !== 'undefined') {
    if (address == null) {
      window.localStorage.removeItem('WEB3_ADDRESS');
      return;
    }
    window.localStorage.setItem('WEB3_ADDRESS', address);
  }
}

export async function isWalletConnected(): Promise<Result> {
  try {
    const { ethereum } = window;
    if (!ethereum && !isConnectionValid()) {
      return Result.fail('No wallet connection');
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts: string[] = await ethereum.request({ method: 'eth_accounts' });
    const signer = provider.getSigner();
    if (signer) {
      return Result.ok('Account connected', accounts[0]);
    } else {
      return Result.fail('No authorized account found');
    }
  } catch (error) {
    return Result.fail(`Problem with contract: ${error.message}`);
  }
}

export async function isUserEnabled(): Promise<Result> {
  try {
    const { ethereum } = window;
    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const isEnabled = await contract.isUserEnabled(await signer.getAddress());
      return Result.ok('Ok', isEnabled);
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    return Result.fail(`Problem with contract: ${error.message}`);
  }
}

export async function signUp(): Promise<Result> {
  try {
    const { ethereum } = window;
    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const signupTx = await contract.signUp();
      return Result.ok('User added', signupTx);
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    return Result.fail('Problem with contract sign up');
  }
}

export async function getUserBalance(): Promise<Result> {
  try {
    const { ethereum } = window;
    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const balanceMtc = await contract.balanceOf(await signer.getAddress(), 0);
      return Result.ok('Ok', balanceMtc.toNumber());
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    return Result.fail('Problem with contract get balance');
  }
}

// Creates transaction to mint a meme on the blockchain
export async function createMeme(hash: string, price: number, isForSale: boolean): Promise<Result> {
  try {
    const { ethereum } = window;

    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const nftTx = await nftContract.createMeme(hash, ethers.BigNumber.from(price), isForSale);
      //console.log('Mining....', nftTx.hash);
      // wait for confirmation
      await nftTx.wait();
      // TODO: is confirmed add a new nft to the database for owner (with transaction reference)
      //console.log('Mined!', tx);
      //let event = tx.events[0];
      //let value = event.args[2];
      //let tokenId = value.toNumber();
      //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`);
      return Result.ok('Meme created', nftTx.hash);
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    let message = `Problem with blockchain: ${error.message}`;
    if (error.message === 'Internal JSON-RPC error.') {
      message = error.data?.message;
    }
    return Result.fail(message);
  }
}

// Creates transaction to buy a meme nft
export async function buyMeme(memeId: string, price: number): Promise<Result> {
  try {
    const { ethereum } = window;

    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const buyTx = await nftContract.buyMeme(memeId, { value: price });
      //console.log('Mining....', nftTx.hash);
      // wait for confirmation
      await buyTx.wait();
      // TODO: is confirmed add a new nft to the database for owner (with transaction reference)
      //console.log(`Buyed, see transaction: https://rinkeby.etherscan.io/tx/${buyTx.hash}`);
      return Result.ok('Meme buyed', buyTx.hash);
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    let message = `Problem with blockchain: ${error.message}`;
    if (error.message === 'Internal JSON-RPC error.') {
      message = error.data?.message;
    }
    return Result.fail(message);
  }
}

// Creates transaction to buy a meme nft
export async function setMemeSale(memeId: string, isForSale: boolean): Promise<Result> {
  try {
    const { ethereum } = window;

    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const setSaleTx = await nftContract.setMemeSale(memeId, isForSale);
      //console.log('Mining....', nftTx.hash);
      // wait for confirmation
      await setSaleTx.wait();
      // TODO: is confirmed add a new nft to the database for owner (with transaction reference)
      //console.log('Mined!', tx);
      //let event = tx.events[0];
      //let value = event.args[2];
      //let tokenId = value.toNumber();
      //console.log(`Buyed, see transaction: https://rinkeby.etherscan.io/tx/${setSaleTx.hash}`);
      return Result.ok('Meme set sale', setSaleTx.hash);
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    let message = `Problem with blockchain: ${error.message}`;
    if (error.message === 'Internal JSON-RPC error.') {
      message = error.data?.message;
    }
    return Result.fail(message);
  }
}

export async function getMemes(): Promise<Result> {
  try {
    const { ethereum } = window;

    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const memes = await nftContract.getMemes();
      const result: MemeInfo[] = [];

      await Promise.all(
        memes.map(async item => {
          const metadata = await (await fetch(config.METADATA_URL.replace('%Id%', item.id.toString()))).json();

          result.push({
            id: item.id.toString(),
            owner: item.owner,
            isForSale: item.isForSale,
            price: item.price.toNumber(),
            createdAt: new Date(item.createdAt * 1000),
            text: metadata.text,
            content: metadata.content,
          });
        }),
      );

      result.sort((x, y) => {
        return y.createdAt.valueOf() - x.createdAt.valueOf();
      });

      return Result.ok('Ok', result);
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    return Result.fail('Problem with contract get meme');
  }
}

export async function getMeme(memeId: string): Promise<Result> {
  try {
    const { ethereum } = window;

    if (ethereum && isConnectionValid()) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);
      const meme = await nftContract.getMeme(memeId);
      const metadata = await (await fetch(config.METADATA_URL.replace('%Id%', meme.id.toString()))).json();

      return Result.ok('Ok', {
        id: meme.id.toString(),
        owner: meme.owner,
        isForSale: meme.isForSale,
        price: meme.price.toNumber(),
        createdAt: new Date(meme.createdAt * 1000),
        text: metadata.text,
        content: metadata.content,
      });
    } else {
      return Result.fail('Ethereum object do not exist!');
    }
  } catch (error) {
    return Result.fail('Problem with contract get meme');
  }
}
