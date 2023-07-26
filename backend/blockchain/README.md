# Crypto Memes Smart Contract

A simple example of [ERC-1155](https://eips.ethereum.org/EIPS/eip-721) contract standard that handle a memes non fungible tokens together with fungible Crypto Meme Coin (CMC) tokens.

Main purpose of smart contract are:
- You can create new unique NFTs of memes and get reward for the creation in CMC tokens
- You can set/unset your memes for sell
- You can buy memes with CMC tokens
# Getting Started

```shell
# installing dependencies
npm install
# or updating dependencies to the latest version
npm update

# start local chain
npm run chain

# deploy contracts on local chain
npm run deploy:local

```

Other commands:
```shell
# clean artifacts
npm run clean

# compile contracts
npm run compile

# run tests
npm run test

# test coverage
npm run coverage

# deploy contracts on live chain
npm run deploy:sepolia

# verify a contract
npx hardhat verify "<CONTRACT ADDRESS>" "BASE_METADATA_URL" --network sepolia

# linting
npm run lint
npm run lint:fix
```

## Patterns and libraries:
- [Access Restriction](https://fravoll.github.io/solidity-patterns/access_restriction.html) with [Ownable by OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol)
- [ERC-721](https://eips.ethereum.org/EIPS/eip-721) Token Standard with [Open Zeppelin ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Counters](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol) by Open Zeppelin
- [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) by Open Zeppelin

# Tools and Resources
- [MyCrypto](https://app.mycrypto.com/): tool for some common operations (contract interaction, [faucets](https://app.mycrypto.com/faucet))
- [Simple Unit Converter](https://eth-converter.com/)
- [Rinkeby Faucet](https://faucets.chain.link/rinkeby)
- [Alchemy](https://www.alchemy.com/)
- [Pinata](https://www.pinata.cloud/)
- Hardhat [documentation](https://hardhat.org/getting-started) and [tutorial](https://hardhat.org/tutorial/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Solidity Patterns](https://fravoll.github.io/solidity-patterns/)
- [How to deploy your first smart contract on Ethereum with Solidity and Hardhat](https://stermi.medium.com/how-to-deploy-your-first-smart-contract-on-ethereum-with-solidity-and-hardhat-22f21d31096e)
- [Writing an NFT Collectible Smart Contract](https://dev.to/rounakbanik/writing-an-nft-collectible-smart-contract-2nh8)
- [The Gas-Efficient Way of Building and Launching an ERC721 NFT Project For 2022](https://nftchance.medium.com/the-gas-efficient-way-of-building-and-launching-an-erc721-nft-project-for-2022-b3b1dac5f2e1)
- [Import & Test a Popular NFT Smart Contract with Hardhat & Ethers](https://dev.to/jacobedawson/import-test-a-popular-nft-smart-contract-with-hardhat-ethers-12i5)
- [Upgradeable proxy contract from scratch](https://medium.com/coinmonks/upgradeable-proxy-contract-from-scratch-3e5f7ad0b741)
- [Learning Solidity: A Starting Guide](https://blog.cryptostars.is/learning-solidity-a-starting-guide-fd9babac9806)
