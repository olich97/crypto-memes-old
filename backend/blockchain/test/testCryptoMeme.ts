
import {ethers, waffle} from 'hardhat';
import chai from 'chai';
import chaiAsPromised  from "chai-as-promised";

import cryptoMemeArtifact from '../artifacts/contracts/CryptoMeme.sol/CryptoMeme.json';
import {CryptoMeme} from '../typechain-types/CryptoMeme';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

const {deployContract} = waffle;
chai.use(chaiAsPromised);
const {expect} = chai;


describe('Crypt Meme Contract', function () {
    let contractOwner: SignerWithAddress;
    let nftOwner1: SignerWithAddress;
    let nftOwner2: SignerWithAddress;
    let contractOperator: SignerWithAddress;
  
    let memeContract: CryptoMeme;
  
    beforeEach(async () => {
      // eslint-disable-next-line no-unused-vars
      [contractOwner, nftOwner1, nftOwner2, contractOperator] = await ethers.getSigners();
  
      memeContract = (await deployContract(contractOwner, cryptoMemeArtifact)) as unknown as CryptoMeme;
    });
  
    describe('Deployment', function () {
      it("should set the right contract owner", async () => {
        expect(await memeContract.owner()).to.equal(contractOwner.address);
      });
    }); 

    describe('Minting', function () {
        const memeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my beautiful meme content with text"))
        const memeId = ethers.BigNumber.from(memeHash);

        beforeEach(async () => {    
            // need to sign up into the platform
            await memeContract.connect(nftOwner1).signUp();
            await memeContract.connect(contractOwner).signUp();
            expect(
              await memeContract.connect(nftOwner1).createMeme(memeHash, 10, true)
            )
            .to.emit(memeContract, "TransferSingle")
            .withArgs(nftOwner1.address, ethers.constants.AddressZero, nftOwner1.address, memeId, 1);
        });

        it("should set reward", async function () {
            const memeCoins = await memeContract.balanceOf(nftOwner1.address, 0);
            expect(memeCoins).to.equal(100);
        });

        it("should set price", async function () {
            const meme = await memeContract.getMeme(memeId);
            expect(meme.price).to.equal(10);
        });

        it("should set for sale", async function () {
            const meme = await memeContract.getMeme(memeId);
            expect(meme.isForSale).to.equal(true);
        });
        
        it("should set owner", async function () {
            const meme = await memeContract.getMeme(memeId);
            expect(meme.owner).to.equal(nftOwner1.address);
        });

        it("should fail if create with the same hash", async function () {      
            await expect(
              memeContract.createMeme(memeHash, 10, false)
            ).to.eventually.be.rejectedWith('Meme was already created');
        });
      }); 
  });