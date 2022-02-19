//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// ERC1155 standard implementation
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// https://docs.openzeppelin.com/contracts/access-control
import "@openzeppelin/contracts/access/Ownable.sol";
// https://docs.openzeppelin.com/contracts/api/utils#Counters
import "@openzeppelin/contracts/utils/Counters.sol";
// https://docs.openzeppelin.com/contracts/api/utils#SafeMath
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";
/**
 * @title Crypto Memes
 * @author Oleh Andrushko (https://olich.me)
 * @dev The contract for crypto memes platfrom (https://cryptomemes.olich.me): create, own, buy, get rewards and laugh
 */
contract CryptoMeme is ERC1155, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _memeIds;

    // ID for fungible token used as coins on the platform
    // CryptoMeme Coin (CMC) token amount will be rappresented with two decimals,
    // means need to divide the token amount by 100 to get its user representation
    uint256 public constant MEME_COIN = 0;

    // reward for creating a new meme in CryptoMeme Coin token (CMC)
    uint256 public MEME_CREATION_REWARD = 100; // 1.00 MTC = 0.01 Eth

    // max memes hosted by the platfrom, just in case to be sure
    uint64 public MAX_MEMES_SUPPLY = type(uint64).max;


    /**
     * @dev Mapping form memeIs to info
     */
    mapping(uint256 => MemeInfo) public memeInfos;

    /**
     * @dev List of memes in the platfrom
     */
    MemeInfo[] public memes;

    /**
     * @dev Users addresses enabled to operate in the platform
     */
    mapping(address => bool) private _userEnabled;

    /**
     * @dev Mapping enforcing unique hashes
     */
    mapping(bytes32 => bool) _hashExists;

    /**
     * @dev Main Meme Object
     */
    struct MemeInfo {
        address owner;
        uint256 createdAt;   // unix timestamp then meme was minted
        uint256 price;      // in CMC
        bool isForSale;
        uint256 id;
    }
 

    /**
     * @dev Require msg.sender to be an authorized/enabled user
     */
    modifier onlyEnabledUser() {
      require(_userEnabled[msg.sender] == true, "Caller is not an enabled user");
      _;
    }

    constructor(string memory  _baseUri) ERC1155(_baseUri) {}
    
    /**
     * @dev Sets base token uri
     */
    function setURI(string memory _newUri) 
        public 
        onlyOwner 
    {
        _setURI(_newUri);
    }

    /****************************************|
    |       Memes Management                 |
    |_______________________________________*/

     /**
     * @dev Mint a new meme nft
     * @param _hash meme hash (should be text + content sha256)
     * @param price meme starting price
     * @param isForSale set meme for sale
     */
    function createMeme(bytes32 _hash, uint256 price, bool isForSale)
        external
        onlyEnabledUser
    {
        require(price > 0, "Starting price should be greater than 0");
        require(!_hashExists[_hash], "Meme was already created");
        require(memes.length <= MAX_MEMES_SUPPLY, "Maximum meme supply reached");

        uint256 memeId = uint256(_hash);
        _mint(msg.sender, memeId, 1, '');
        // save meme info
        MemeInfo memory meme = MemeInfo({
            id: memeId,
            owner: msg.sender,
            createdAt: block.timestamp,
            price: price,
            isForSale: isForSale
        });     
        memeInfos[memeId] = meme;
        memes.push(meme);
        // reward creator with Meme Coins        
        _mint(msg.sender, MEME_COIN, MEME_CREATION_REWARD, 'MEME_CREATION_REWARD');

        _hashExists[_hash] = true;
    }

     /**
     * @dev Buy a meme from onother user
     * @param memeId token id
     */
    function buyMeme(uint256 memeId)
        external
        payable
        onlyEnabledUser
    {
        require(memeInfos[memeId].owner != address(0), "Meme does not exists");
        require(memeInfos[memeId].owner != msg.sender, "Sender already owns current meme");
        require(memeInfos[memeId].isForSale, "Meme is NOT for sale");
        require(balanceOf(msg.sender, MEME_COIN) >= memeInfos[memeId].price, "Insufficient balance to buy meme");
        require(msg.value == memeInfos[memeId].price, "Incorrect meme price");
        // transfer meme coins to the seller
        _safeTransferFrom(msg.sender, memeInfos[memeId].owner, MEME_COIN, msg.value, 'MTC_TRANSFER');
        // transfer meme nft to buyer
        _safeTransferFrom(memeInfos[memeId].owner, msg.sender, memeId, 1, 'MEME_TRANSFER');
    }

    /**
     * @dev Set meme price
     * @param memeId token id
     */
    function setMemePrice(uint256 memeId, uint256 price)
        external
    {
        require(memeInfos[memeId].owner != address(0), "Meme does not exists");
        require(price > 0, "Starting price should be greater than 0");
        require(memeInfos[memeId].owner == msg.sender, "Caller is not an owner of the meme");

        memeInfos[memeId].price = price;
    }

     /**
     * @dev Set/unset for sale
     * @param memeId token id
     */
    function setMemeSale(uint256 memeId, bool isForSale)
        external
    {
        require(memeInfos[memeId].owner != address(0), "Meme does not exists");       
        require(memeInfos[memeId].owner == msg.sender, "Caller is not an owner of the meme");

        memeInfos[memeId].isForSale = isForSale;
    }

    /**
     * @dev Get all memes in the platform
     */
    function getMemes()
        external
        view
        returns(MemeInfo[] memory)
    {       
        return memes;
    }

     /**
     * @dev Get info about meme
     * @param memeId token id
     */
    function getMeme(uint memeId)
        external
        view
        returns(MemeInfo memory)
    {
        return memeInfos[memeId];
    }


    /****************************************|
    |       Users Management                 |
    |_______________________________________*/

    /**
     * @dev Self registration to the platfrom
     */
    function signUp() 
        external 
    {
        _userEnabled[msg.sender] = true;
    }

    /**
     * @dev Disable an user
     * @param user user address to disable
     */
    function disableUser(address user) 
        external 
        onlyOwner 
    {
        _userEnabled[user] = false;
    }

    /**
     * @dev Returns user status
     * @param user user address
     */
    function isUserEnabled(address user) 
        external 
        view
        returns(bool) 
    {
        return _userEnabled[user];
    }
}
