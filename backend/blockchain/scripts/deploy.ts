// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const cryptoMeme = await ethers.getContractFactory("CryptoMeme");
  const meme = await cryptoMeme.deploy("");

  await meme.deployed();

  console.log("CryptoMeme deployed to:", meme.address);

  // some fake data for tests
  const memeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my beautiful meme content with text"));
  const memeId = ethers.BigNumber.from(memeHash);
  const accounts = await ethers.getSigners();
  const contractOwner = await meme.owner();
  await meme.connect(accounts[0]).signUp();
  await meme.connect(accounts[0]).createMeme(memeHash, 10, true);
  const info = await meme.connect(accounts[0]).getMeme(memeId);
  const infos = await meme.connect(accounts[0]).getMemes();
  console.log('Meme created with info: ', info);
  console.log('Meme list: ', infos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
