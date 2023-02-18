/** Creation of Unsigned Software Private Limited */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";

contract Unpsyned is ERC721("UNPSYNED", "UN_PSY_NED"), ERC2981, DefaultOperatorFilterer {
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
  uint256 public PURCHASE_LIMIT = 200;
  /** Max Supply */
  uint256 public constant MAX_SUPPLY = 50000;
  /** Maps NFTs to tokenID */
  mapping(uint256 => string) nftIndex;
  /** List of winners */
  Winner[] public WINNERS;


  constructor() {
    /** Setting the owner on contract deploy */
    __owner = payable(_msgSender());
    /** Setting the creators fee to 10% = 1000 basis points */
    setCreatorsFee(_msgSender(), 1000);
  }

  /** Owner modifier */
  modifier onlyOwner() {
    require(__owner == _msgSender(), "Caller is not the owner!");
    _;
  }

  /** Override for ERC-2981 */
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  /** Override for ERC-721 */
  function _burn(uint256 tokenId) internal override(ERC721) {
    super._burn(tokenId);
  }

  /** Override for the opensea operator filter registry and creators royalties */
  function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
    super.setApprovalForAll(operator, approved);
  }

  /** Override for the opensea operator filter registry and creators royalties */
  function approve(address operator, uint256 tokenId) public override onlyAllowedOperatorApproval(operator) {
    super.approve(operator, tokenId);
  }

  /** Override for the opensea operator filter registry and creators royalties */
  function transferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
    super.transferFrom(from, to, tokenId);
  }

  /** Override for the opensea operator filter registry and creators royalties */
  function safeTransferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
    super.safeTransferFrom(from, to, tokenId);
  }

  /** Override for the opensea operator filter registry and creators royalties */
  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
    public
    override
    onlyAllowedOperator(from) {
    super.safeTransferFrom(from, to, tokenId, data);
  }

  /** Setting the creators fee */
  function setCreatorsFee(address _receiver, uint96 fee) public onlyOwner {
    require(_receiver != address(0), "Receiver cannot be a x0 address!");
    _setDefaultRoyalty(_receiver, fee);
  }

  /** Withdraw funds from the contract */
  function withdraw() public onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, "Insufficient Funds!");
    __owner.transfer(balance);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
    /** Token should exist */
    _requireMinted(tokenId);
  
    /** On-chain token URI */
    string memory json = Base64.encode(bytes(string(abi.encodePacked(
      '{"name": "Unpsyned #', tokenId.toString(), '", "description": "This collection is part of the PSY lottery system. Mathematics reveals its secrets only to those who approach it with pure love - for its own beauty.",',
      '"tokenId": ', tokenId.toString(), ',',
      '"attributes": [',
        '{',
          '"trait_type": "PI",',
          '"value": "3.14159265359"',
        '},',
        '{',
          '"trait_type": "PHI",',
          '"value": "1.61803398875"',
        '},',
        '{',
          '"trait_type": "E",',
          '"value": "2.71828182845"',
        '},',
        '{',
          '"trait_type": "I",',
          '"value": "-1^2"',
        '},',
        '{',
          '"trait_type": "MU",',
          '"value": "1.45607494858"',
        '},',
        '{',
          '"trait_type": "Mood",',
          '"value": "Spiritual"',
        '}',
      '],',
      '"image": "data:image/svg+xml;base64,', nftIndex[tokenId], '"}'
    ))));

    return string(abi.encodePacked('data:application/json;base64,', json));
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
      _tokenIdCounter.increment();
      _safeMint(__owner, _tokenIdCounter.current());
    }
  }

  /** Mint PsyDucks */
  function mint(uint256 amount, string memory nft) public payable {
    uint256 totalOwnable = balanceOf(_msgSender()) + amount;
    uint256 totalPrice = _PRICE * amount;

    /** Limit the number of mints per account */
    require((totalOwnable) <= PURCHASE_LIMIT, 'You have exceeded the PURCHASE LIMIT.');

    /** Check if the user is paying the correct price */
    require(msg.value >= totalPrice, "Incorrect Ether value sent.");

    for (uint256 i = 0; i < amount; i++) {
      /** Increment */
      _tokenIdCounter.increment();
      /** Mint NFT to the msg sender */
      _safeMint(_msgSender(), _tokenIdCounter.current());
      /** Index the NFT */
      nftIndex[_tokenIdCounter.current()] = nft;
    }

    /** Emit the Purchased event */
    emit Purchased(_msgSender(), msg.value, amount, block.timestamp);
  }

  /** Contract destruction */
  function destroy() public onlyOwner {
    selfdestruct(payable(__owner));
  }
}