/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Layout from '../components/Layout';
import config from '../lib/config';

export const About = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: 'About - Crypto Memes',
      }}
    >
      <p>Welcome to Crypto Memes</p>
      <p>Crypto Memes is a simple decentralized app.</p>
      <p>
        In order to use the app, please, make sure that:
        <ul>
          <li>
            - You're connected with your wallet: press "Connect Wallet" button and chose one of your account on Rinkeby
            test network
          </li>
          <li>
            - Signed Up: at the first connection you need to sign up to the platform in order to mint new memes. If you
            are not already signed up, the platform will ask you to sign an initial transaction (WAIT until transaction
            confirmation notification, before using the platform)
          </li>
        </ul>
      </p>
      <h2>Creating New Meme</h2>
      <p>
        Got to the "New Meme" page, insert meme text and choose your content (.gif or .png) then press "Save" and wait
        until the magic happens. Users, who mint new memes are rewarded with 100 CMC token: a special coin used inside
        the platform (for buying memes).
      </p>
      <p>
        Only a owner of a meme can also set the meme for sale: just press on your meme in the home page. And if an meme
        is for sale and you are not the owner, you can buy the meme.
      </p>
      <p>
        If you need to refill your wallet for rinkeby, you can use:{' '}
        <a href="https://faucets.chain.link/rinkeby">Chainlink Faucet</a>
      </p>
      <h2>Used technologies</h2>
      <ul>
        <li>
          -{' '}
          <a href="https://supabase.com" target="_blank" rel="noreferrer">
            Supabase:
          </a>{' '}
          for storing nft metadata
        </li>
        <li>
          -{' '}
          <a href="https://imagekit.io/" target="_blank" rel="noreferrer">
            ImageKit:
          </a>{' '}
          for storing and optimize meme content (.gif, .png, .jpg)
        </li>
        <li>
          -{' '}
          <a href="https://github.com/Web3Modal/web3modal" target="_blank" rel="noreferrer">
            Web3Modal:
          </a>{' '}
          for facilitate wallet interaction
        </li>
        <li>
          -{' '}
          <a href="https://docs.soliditylang.org/en/v0.8.12/" target="_blank" rel="noreferrer">
            Solidity
          </a>
          ,<a href="https://hardhat.org/">Hardhat</a> for smart contracts developing
        </li>
        <li>
          -{' '}
          <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
            Nextjs
          </a>
          ,
          <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
            Tailwindcss
          </a>{' '}
          for the ui
        </li>
        <li>
          - Deploys on{' '}
          <a href="https://vercel.com/" target="_blank" rel="noreferrer">
            Vercel
          </a>
        </li>
        <li>
          -{' '}
          <a
            href={`https://rinkeby.etherscan.io/address/${config.CRYPTO_MEME_CONTRACT}`}
            target="_blank"
            rel="noreferrer"
          >
            Smart Contract
          </a>{' '}
          deployed on Rinkeby testnet
        </li>
      </ul>
      <br />
      <h2>That's it =)</h2>
    </Layout>
  );
};

export default About;
