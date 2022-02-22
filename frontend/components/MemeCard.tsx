import Link from 'next/link';
import React, { useState } from 'react';
import { MemeInfo } from '../lib/types/meme';
import Image, { ImageLoaderProps } from 'next/image';
import { imageStorageConfig } from '../lib/config';
import { ellipseAddress } from '../lib/wallet/utilities';
import { buyMeme, getCurrentAddress, setMemeSale } from '../lib/cryptoMemeContract';

//https://docs.imagekit.io/getting-started/quickstart-guides/nextjs
const imageKitLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  if (src[0] === '/') src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(',');
  let urlEndpoint = imageStorageConfig.ENDPOINT;
  // need to get only file name
  if (src.includes(urlEndpoint)) src = src.replace(urlEndpoint, '');

  if (urlEndpoint[urlEndpoint.length - 1] === '/') urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

const MemeCard = ({ meme }: { meme?: MemeInfo }): JSX.Element => {
  const [copySuccess, setCopySuccess] = useState('');
  const copyToClipBoard = async targetText => {
    try {
      await navigator.clipboard.writeText(targetText);
      setCopySuccess('Copied!');
      setTimeout(() => {
        setCopySuccess('');
      }, 1000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const isMemeOwner = (owner: string): boolean => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const address = getCurrentAddress();
        if (address === owner) {
          return true;
        }
      }
      return false;
    } catch (err) {
      //console.error("Something bad", err);
    }
  };

  const setMemeForSale = async (memeId: string, isForSale: boolean) => {
    await setMemeSale(memeId, isForSale);
  };

  const buy = async (memeId: string, price: number) => {
    await buyMeme(memeId, price);
  };

  return (
    <div className="flow-root">
      <div className="box-border md:box-content">
        <div>
          <Link href={{ pathname: '/memes/[id]', query: { id: meme.id } }}>
            <header className="cursor-pointer text-xl font-extrabold py-4">{meme.text}</header>
          </Link>
          <Link href={{ pathname: '/memes/[id]', query: { id: meme.id } }}>
            <div className="relative h-128 w-full md:h-7/12 lg:h-9/12 md:w-7/12 lg:w-9/12 cursor-pointer">
              <Image
                src={meme.content}
                alt={meme.text}
                layout="fill" // required
                objectFit="cover" // change to suit your needs
                loader={imageKitLoader}
                priority
              />
            </div>
          </Link>
        </div>

        <footer className="text-right px-1 text-black dark:text-white ">
          <div className="pb-3 text-left tracking-wide md:flex md:text-center justify-around py-6">
            <div className="owner">
              <p className="text-sm uppercase">Owner</p>
              <div className="flex" onClick={() => copyToClipBoard(meme.owner)}>
                <p className="text-lg font-semibold cursor-pointer px-2">{ellipseAddress(meme.owner)}</p>
                <svg className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </div>

              {copySuccess}
            </div>
            <div className="price">
              <p className=" text-sm uppercase">Price</p>
              <p className="text-lg font-semibold px-2">{meme.price} MTC</p>
            </div>
            <div className="created">
              <p className=" text-sm uppercase">Created At</p>
              <p className="text-lg font-semibold px-2">{meme.createdAt.toDateString()}</p>
            </div>
            {!isMemeOwner(meme.owner) && meme.isForSale && (
              <div className="buy hidden">
                <p className=" text-sm uppercase">Wanna Buy?</p>
                <button
                  onClick={() => buy(meme.id, meme.price)}
                  className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  BUY!
                </button>
              </div>
            )}
            {isMemeOwner(meme.owner) && !meme.isForSale && (
              <div className="buy hidden">
                <p className="text-sm uppercase">Wanna Sell?</p>
                <button
                  onClick={() => setMemeForSale(meme.id, true)}
                  className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Enable Sale
                </button>
              </div>
            )}
            {isMemeOwner(meme.owner) && meme.isForSale && (
              <div className="buy hidden">
                <p className=" text-sm uppercase">DO NOT Wanna Sell?</p>
                <button
                  onClick={() => setMemeForSale(meme.id, false)}
                  className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Disable Sale
                </button>
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MemeCard;
