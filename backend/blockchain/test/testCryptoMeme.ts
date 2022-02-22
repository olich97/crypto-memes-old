
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
  
      memeContract = (await deployContract(contractOwner, cryptoMemeArtifact, ['my.uri'])) as unknown as CryptoMeme;
    });
  
    describe('Deployment', function () {
      it("should set the right contract owner", async () => {
        expect(await memeContract.owner()).to.equal(contractOwner.address);
      });    
    }); 

    describe('Minting', function () {
        const memeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("When I try not to laugh at the meme my coworker sent over Slack in the all-hands meeting"))
        const memeId = ethers.BigNumber.from(memeHash);

        const memeHash2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my beautiful meme content with text 2"))
        const memeId2 = ethers.BigNumber.from(memeHash);

        beforeEach(async () => {    
            // need to sign up into the platform
            await memeContract.connect(nftOwner1).signUp();
            await memeContract.connect(nftOwner2).signUp();
            await memeContract.connect(contractOwner).signUp();
            expect(
              await memeContract.connect(nftOwner1).createMeme(memeHash, 10, true)
            )
            .to.emit(memeContract, "TransferSingle")
            .withArgs(nftOwner1.address, ethers.constants.AddressZero, nftOwner1.address, memeId, 1);
        });

        it("should set reward", async function () {
          console.log(memeId);
            const memeCoins = await memeContract.balanceOf(nftOwner1.address, 0);
            expect(memeCoins).to.equal(100);
        });

        it("should set uri", async function () {
          const uri = await memeContract.uri(memeId);
          expect(uri).to.equal('my.uri');
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

        it("should set list", async function () {
          const memes = await memeContract.getMemes();
          expect(memes[0].id).to.equal(memeId);
          expect(memes[0].owner).to.equal(nftOwner1.address);
          expect(memes[0].price).to.equal(10);
        });

        it("should fail if create with the same hash", async function () {      
            await expect(
              memeContract.createMeme(memeHash, 10, false)
            ).to.eventually.be.rejectedWith('Meme was already created');
        });

        it("should set memes array", async function () {
          await memeContract.connect(nftOwner2).createMeme(memeHash2, 100, true)
          const memes = await memeContract.getMemes();         
          expect(memes.length).to.equal(2);
        });

        it("should set price", async function () {
          await memeContract.connect(nftOwner1).setMemePrice(memeId, 10000);
          const meme = await memeContract.getMeme(memeId);
          expect(meme.price).to.equal(10000);
        });

        it("should set for sale", async function () {
          await memeContract.connect(nftOwner1).setMemeSale(memeId, false);
          const meme = await memeContract.getMeme(memeId);
          expect(meme.isForSale).to.equal(false);
        });

        it("should disable user", async function () {
          await memeContract.disableUser(nftOwner1.address);
          const isUserEnable = await memeContract.isUserEnabled(nftOwner1.address);
          expect(isUserEnable).to.equal(false);
        });
      });

      describe('Transfers', function() {
        const memeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my beautiful meme content with text"))
        const memeId = ethers.BigNumber.from(memeHash);

        const memeHash2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my beautiful meme content with text 2"))
        const memeId2 = ethers.BigNumber.from(memeHash);

        beforeEach(async () => {
            // need to sign up into the platform
            await memeContract.connect(nftOwner1).signUp();
            await memeContract.connect(nftOwner2).signUp();            
            await memeContract.connect(nftOwner2).createMeme(memeHash, 10, true)
        });

        it("should fail if not enough balance", async function () {      
          await expect(
            memeContract.connect(nftOwner1).buyMeme(memeId, {
              value: 10,
            })
          ).to.eventually.be.rejectedWith('Insufficient balance to buy meme');
        });

        it("should buy meme", async function () {  
          // just for reward
          await memeContract.connect(nftOwner1).createMeme(memeHash2, 10, true);

          await memeContract.connect(nftOwner1).buyMeme(memeId, { value: 10 });

          expect(await memeContract.balanceOf(nftOwner1.address, memeId)).to.equal(1);
          expect(await memeContract.balanceOf(nftOwner1.address, memeId2)).to.equal(1);
          expect(await memeContract.balanceOf(nftOwner1.address, 0)).to.equal(90);

          expect(await memeContract.balanceOf(nftOwner2.address, 0)).to.equal(110);
          expect(await memeContract.balanceOf(nftOwner2.address, memeId)).to.equal(0);
          // check new owner
          const meme = await memeContract.getMeme(memeId);
          expect(meme.owner).to.equal(nftOwner1.address);
        });
      });
  });