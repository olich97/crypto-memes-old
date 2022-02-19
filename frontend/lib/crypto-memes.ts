import { ethers } from 'ethers';
import config from './config';

import CryptoMeme from './contracts/CryptoMeme.json';
import { Result } from './types/result';

export type MemeInfo = {
  id: string;
  owner: string;
  createdAt: Date;
  price: number;
  isForSale: boolean;
  text: string;
  contentUrl: string;
};

export type MemeOutput = {
  memes?: MemeInfo[];
  isError: boolean;
};

// Creates transaction to mint a meme on the blockchain
export async function createMeme(hash: string, price: number, isForSale: boolean): Promise<void> {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(config.CRYPTO_MEME_CONTRACT, CryptoMeme.abi, signer);

      const nftTx = await nftContract.createMeme(hash, ethers.BigNumber.from(price), isForSale);
      //console.log('Mining....', nftTx.hash);
      // wait for confirmation
      const tx = await nftTx.wait();
      // is confirmed add a new nft to the database for owner (with transaction reference)
      //console.log('Mined!', tx);
      //let event = tx.events[0];
      //let value = event.args[2];
      //let tokenId = value.toNumber();
      return tx;
      //console.log(
      //    `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`
      //)
    } else {
      //console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    //console.log('Error creating meme ', error);
  }
}

export async function getMemes(): Promise<Result> {
  try {
    const { ethereum } = window;

    if (ethereum) {
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
            contentUrl: metadata.content,
          });
        }),
      );

      return {
        data: result,
        isError: false,
        message: 'Ok',
      };
    } else {
      //console.log("Ethereum object doesn't exist!");
      return {
        isError: true,
        message: "Ethereum object doesn't exist!",
      };
    }
  } catch (error) {
    //console.log(error);
    return {
      isError: true,
      message: 'Something went very wrong =)',
    };
  }
}
