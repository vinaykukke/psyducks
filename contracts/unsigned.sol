/** Creation of Unsigned Software Private Limited */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Unpsyned is ERC721("UNPSYNED", "UN_PSY_NED") {
  using Counters for Counters.Counter;
  using Strings for uint256;

  /** Events */
  event Purchased(address purchasedBy, uint256 amount, uint256 number, uint256 timestamp);

  /** Cashback winner */
  struct Winner {
    address _address;
    uint256 timestamp;
  }

  /** Counter */
  Counters.Counter private _tokenIdCounter;
  /** Owners address */
  address payable __owner;
  /** Price */ 
  uint256 public _PRICE = 0 ether;
  /** Purchase limit */
  uint256 public PURCHASE_LIMIT = 100;
  /** Max Supply */
  uint256 public constant MAX_SUPPLY = 11111;
  /** List of winners */
  Winner[] public WINNERS;
  /** Base URI */
  string public BASE_URI = "ipfs://QmQYTLaykSSQ1eqHpLAmrXEmFSQFMRo4bHcTwJdRzaV3Pv/";
  /** Contract URI */
  string public CONTRACT_URI = "https://ipfs.filebase.io/ipfs/QmWjDrhW6QKxdny5jvpgz3q23XWQRvG8fTGmfPXntc8mPX";


  constructor() {
    /** Setting the owner on contract deploy */
    __owner = payable(_msgSender());
  }

  /** Owner modifier */
  modifier onlyOwner() {
    require(__owner == _msgSender(), "Caller is not the owner!");
    _;
  }

  /** Override for ERC-721 */
  function _burn(uint256 tokenId) internal override(ERC721) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
    _requireMinted(tokenId);

    string memory baseURI = _baseURI();
    return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
  }

  /** Default URI for the NFT's */
  function _baseURI() internal view override returns (string memory) {
    return BASE_URI;
  }

  /** Fail safe for if the storage situation changes for the NFTs */
  function setBaseURI(string memory uri) public onlyOwner {
    bytes memory temp = bytes(uri);
    require(temp.length != 0, "Invalid URI!");
    BASE_URI = uri;
  }

  /** Contract level metadata - opensea */
  function contractURI() public view returns (string memory) {
    return CONTRACT_URI;
  }

  /** Fail safe for if the storage situation changes for the NFTs */
  function setContractURI(string memory uri) public onlyOwner {
    bytes memory temp = bytes(uri);
    require(temp.length != 0, "Invalid URI!");
    CONTRACT_URI = uri;
  }

  /** Withdraw funds from the contract */
  function withdraw() public onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, "Insufficient Funds!");
    __owner.transfer(balance);
  }
  
  /** Transfer ownership of the contract */
  function transferOwnership(address to) public onlyOwner {
    require(to != address(0), "Invalid Address!");
    require(to != __owner, "You are already the owner!");
    __owner = payable(to);
  }

  /** Return the total supply */
  function totalSupply() public view returns(uint) {
    return _tokenIdCounter.current();
  }

  /** Get the total number of winners */
  function totalWinners() public view returns(uint256) {
    return WINNERS.length;
  }

  function setWinner(address from) public onlyOwner {
    /** Adding winners to the list */
    require(from != address(0), "Invalid Address!");
    WINNERS.push(Winner(from, block.timestamp));
  }

  /** Set a price if needed */
  function setPrice(uint256 price) public onlyOwner {
    _PRICE = price;
  }

  /** Owners Mint - exclusive for giveaways */
  function reserve(uint256 amount) public onlyOwner {
    for (uint i = 0; i < amount; i++) {
      _safeMint(__owner, _tokenIdCounter.current());
      _tokenIdCounter.increment();
    }
  }

  /** Mint PsyDucks */
  function mint(uint256 amount) public payable {
    uint256 totalOwnable = balanceOf(_msgSender()) + amount;
    uint256 totalPrice = _PRICE * amount;

    /** Limit the number of mints per account */
    require((totalOwnable) <= PURCHASE_LIMIT, 'You have exceeded the PURCHASE LIMIT.');

    /** Check if the user is paying the correct price */
    require(msg.value >= totalPrice, "Incorrect Ether value sent.");

    for (uint256 i = 0; i < amount; i++) {
      require(_tokenIdCounter.current() <= MAX_SUPPLY, "I'm sorry we reached the cap.");
      /** Mint NFT to the msg sender */
      _safeMint(_msgSender(), _tokenIdCounter.current());
      /** Increment */ 
      _tokenIdCounter.increment();
    }

    /** Emit the Purchased event */
    emit Purchased(_msgSender(), msg.value, amount, block.timestamp);
  }

  /** Contract destruction */
  function destroy() public onlyOwner {
    selfdestruct(payable(__owner));
  }
}