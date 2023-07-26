# Crypto Memes

A simple example of almost decentralized app. 

In order to be fully decentralized app meme contents and metadata should be stored in decentralized way, for now just using centralized services like supabase and ImageKit for hosting images and storing metadata.

In the [current version](https://cryptomemes.olich.me/) you can create, sell or buy a non-fungible tokens that uniquely represents memes (a text and a content). For buying memes platform uses a special fungible token called Crypto Meme Coin (CMC). For more information about usage visit: https://cryptomemes.olich.me/about.

Built with ❤️ using:
- [Supabase](https://supabase.com/): for storing nft metadata
- [ImageKit](https://imagekit.io/): for storing and optimize meme content (.gif, .png, .jpg)
- [Web3Modal](https://github.com/Web3Modal/web3modal): for facilitate wallet interaction
- [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) for smart contracts developing
- [Nextjs](https://nextjs.org/), [Tailwindcss](https://tailwindcss.com/) for the ui
- Deploys on [Vercel](https://vercel.com/)
- [Smart Contract](https://sepolia.etherscan.io/address/0x4B870026437075659366f3Ab028c29485e9fFcB4#code) deployed on Sepolia testnet

## Getting Started

1. Start local chain and deploy the contract following instructions in [/backend/blockchain/README](/backend/blockchain/README.md#getting-started).

2. Start crypto meme local website following instructions in [/frontend/README](/frontend/README.md#getting-started).
