/** Creation of Unsigned Software Private Limited */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * This NFT will have the following:
 * All tokens will be stored on IPFS - [x]
 * A supply of 10000 - [x]
 * A mint limit of 20 per address - [x]
 * The owner will have a share of 30 tokens - [x]
 * Price of 0.09 ETH - [x]
 * Creators fee of 10% for every transfer of the NFT
 * The contract will send money to people once a certain threshold is met - [x]
 * The threshold will be the amount of money available in the contract - [x]
 * If conditions are met a min of 1% of the value of the contract is sent to a random user - [x]
 * 1% of contract value is sent to a random person every month for 10 months
 * The contract value should not increase about a certain limit (limit to be decided) - [x]
 * If the contract threshold is broken, the full value of the contract is automatically transfered to the owner
 * If the token reached a pre-decided trading volume we wil make a domation to a charity of choice
 * The higher the trading volume the more the donations
 * The contract will implement a fail safe method to restrict / black list tokes or address that are fucking with us
 * The contract value will never increase beyond 1000 ETH - [x]
 * If the value is > 1000 ETH the web application will initiate an withdrawal
 * Maintain a list of people that have received payments so far, if they have go tmoney recently then dont pay them
 * The suppy will increase one time to a max of 20,000 items in total depening on the demand. - [x]
 * This new max supply will never change in the future. - [x]
 * The price will be different for the phase 2 mint. 0.9 ETH. - [x]
 * The max contract value will be 10,000 ETH and any one can win 10x more than phase 1 - [x]
 * Only phase 2 token owners and traders will stand a chance to win 10x
 * Basically pay 10x and stand a chance to win 10x by trading.
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract PsyDucks is ERC721("PsyDucks", "PSY") {
  using Counters for Counters.Counter;
  using Strings for uint256;

  /** Events */
  event Purchased(address purchasedBy, uint256 amount, uint256 number, uint256 timestamp);
  event CashBack(address sentTo, uint256 amount, uint256 timestamp);
  event LimitExceeded(address from, string message);

  /** Counter */
  Counters.Counter private _tokenIdCounter;
  /** Owners address */
  address payable __owner;
  /** Phase 1 */
  uint256 public PHASE = 1;
  /** Indicates if the NFT's are sold out */
  bool public SOLD_OUT = false;
  /** Owners Reserve */
  uint256 public constant OWNERS_SHARE = 30;
  /** Do not allow owner to mint after his share has ben minted */
  bool public OWNERS_SHARE_MINTED = false;
  /** Max Supply */
  uint256 public constant MAX_SUPPLY = 20000;
  /** Max Phase 1 supply */
  uint256 public constant MAX_INITIAL_SUPPLY = 10000;
  /** Max Available for phase 1 Supply */
  uint256 public MAX_MINTABLE = MAX_INITIAL_SUPPLY - OWNERS_SHARE;
  /** Price */ 
  uint256 public _PRICE = 0.09 ether; //0.09 ETH
  /** Purchase limit */
  uint256 public constant PURCHASE_LIMIT = 200;
  /** Max contract value */
  uint256 public MAX_CONTRACT_VALUE = 1000 ether; // 1000 ETH
  /** Min contract balance required for cash back to trigger */
  uint256 public constant MIN_CASH_BACK_VALUE = 10 ether; // 10 ETH
  /** Base URI */
  string public BASE_URI = "ipfs://QmcY91ZzAZFSX1mpAYNyjXehwfbwB6C6e9BZo3pomNVeHu/";


  constructor() {
    /** Setting the owner on contract deploy */
    __owner = payable(_msgSender());
  }

  /** Owner modifier */
  modifier onlyOwner() {
    require(__owner == _msgSender(), "Caller is not the owner!");
    _;
  }

  /** Withdraw funds from the contract */
  function withdraw() public onlyOwner {
    __owner.transfer(address(this).balance);
  }

  /** Owners Share */
  function reserve() public onlyOwner {
    require(!OWNERS_SHARE_MINTED, "Owners has already minted his share!");

    for (uint i = 0; i < OWNERS_SHARE; i++) {
      _tokenIdCounter.increment();
      _safeMint(__owner, _tokenIdCounter.current());
    }

    OWNERS_SHARE_MINTED = true;
  }

  /** The following functions are overrides required by Solidity. */
  function _burn(uint256 tokenId) internal override(ERC721) {
    super._burn(tokenId);
  }

  /** Default URI for the NFT's */
  function _baseURI() internal view override returns (string memory) {
    return BASE_URI;
  }

  /** Fail safe for if the storage situation changes for the NFTs */
  function setBaseURI(string memory uri) public onlyOwner {
    BASE_URI = uri;
  }
  
  /** Transfer ownership of the contract */
  function transferOwnership(address to) public onlyOwner {
    require(to != address(0), "Invalid Address!");
    require(to != __owner, "You are already the owner!");
    __owner = payable(to);
  }

  /** Call when the NFT minting has reached the cap */
  function endPhase() public onlyOwner {
    /** Stop minting if max supply is exceeded */
    if (_tokenIdCounter.current() == MAX_MINTABLE) {
      SOLD_OUT = true;
    }
  }

  /** Activate phase 2 */
  function activatePhaseTwo() public onlyOwner {
    PHASE = 2;
    SOLD_OUT = false;
    _PRICE = 0.9 ether;
    MAX_MINTABLE = MAX_SUPPLY - MAX_INITIAL_SUPPLY;
    MAX_CONTRACT_VALUE = 10000 ether;
  }

  /** Return the total supply */
  function totalSupply() public view returns(uint) {
    return _tokenIdCounter.current();
  }

  /** Lucky draw: send 1% of the contract value */
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override {
    /** Call parent hook */
    super._beforeTokenTransfer(from, to, tokenId);
    /** Contract balance */
    uint256 _balance = address(this).balance;
    /** Transfer Preset */
    bool condition = from != address(0) && _balance > MIN_CASH_BACK_VALUE;

    /**
     * @TODO: This function needs to fire an event everytime bash back is done, so that the website can catch it 
     * trace it and show it. 
     */

    if (condition) {
      address payable _from = payable(from);
      uint256 transferValue = _balance / 100;
      _from.transfer(transferValue);

      /** Emit the Cash Back event */
      emit CashBack(from, transferValue, block.timestamp);
    }
  }

  /** Mint PsyDucks */
  function mint(uint256 amount) public payable {
    uint256 totalOwnable = balanceOf(_msgSender()) + amount;
    uint256 totalPrice = _PRICE * amount;

    /** LimitExceeded event */
    if (totalOwnable <= PURCHASE_LIMIT) {
      emit LimitExceeded(_msgSender(), "LIMIT_EXCEEDED");
    }

    /** Limit the number of mints per account */
    require((balanceOf(_msgSender()) + amount) <= PURCHASE_LIMIT, 'You have exceeded the PURCHASE LIMIT.');

    /** Owner should not pay for minting */
    if(_msgSender() != __owner) {
      /** Check if the user is paying the correct price */
      require(msg.value >= totalPrice, "Incorrect Ether value sent.");
    }

    for (uint256 i = 0; i < amount; i++) {
      require(_tokenIdCounter.current() <= MAX_MINTABLE, "I'm sorry we reached the cap.");

      /** Increment */
      _tokenIdCounter.increment();

      /** Mint NFT to the msg sender */
      _safeMint(_msgSender(), _tokenIdCounter.current());
    }

    /** Emit the Purchased event */
    emit Purchased(_msgSender(), msg.value, amount, block.timestamp);
  }
}