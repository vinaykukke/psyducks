/** Creation of Unsigned Software Private Limited */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";

contract PsyDucks is ERC721("PsyDucks", "PSY"), ERC2981, DefaultOperatorFilterer {
  using Counters for Counters.Counter;
  using Strings for uint256;

  /** Events */
  event Purchased(address purchasedBy, uint256 amount, uint256 number, uint256 timestamp);
  event Cashback(address sentTo, uint256 amount, uint256 timestamp);
  event LimitExceeded(address from, string message);

  /** Cashback winner */
  struct Winner {
    address _address;
    uint256 timestamp;
  }

  /** Counter */
  Counters.Counter private _tokenIdCounter;
  /** Owners address */
  address payable __owner;
  /** Phase 1 */
  uint256 public PHASE = 1;
  /** Indicates if the NFT's are sold out */
  bool public SOLD_OUT = false;
  /** Initiate cash-back */
  bool public INIT_CASH_BACK = false;
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
  uint256 public PURCHASE_LIMIT = 20;
  /** List of winners */
  Winner[] public WINNERS;
  /** Base URI */
  string public BASE_URI = "ipfs://QmdcLYmqEwunWDfFqwyGiywnMUVbc8WekEuAX3fpVW4fpa/";
  /** Contract URI */
  string public CONTRACT_URI = "https://ipfs.filebase.io/ipfs/Qmah5n9gejGgCpzKrgKqx31jsReYbCxuy6en3Yutv8iKKx";


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

  /** Owners Share */
  function reserve() public onlyOwner {
    require(!OWNERS_SHARE_MINTED, "Owners has already minted his share!");

    for (uint i = 0; i < OWNERS_SHARE; i++) {
      _tokenIdCounter.increment();
      _safeMint(__owner, _tokenIdCounter.current());
    }

    OWNERS_SHARE_MINTED = true;
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
    PURCHASE_LIMIT = 40;
    MAX_MINTABLE = MAX_SUPPLY;
  }

  /** Return the total supply */
  function totalSupply() public view returns(uint) {
    return _tokenIdCounter.current();
  }

  /** Initiate Cashback */
  function initiateCashback() public onlyOwner {
    INIT_CASH_BACK = true;
  }

  /** Get the total number of winners */
  function totalWinners() public view returns(uint256) {
    return WINNERS.length;
  }

  /** Lucky draw: send 1% of the contract value */
  function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal virtual override {
    /** Call parent hook */
    super._afterTokenTransfer(from, to, tokenId, batchSize);
    /** Transfer Presets */
    bool notMintOrBurn = from != address(0) && to != address(0);
    bool notOwner = from != __owner;
    bool conditionMet = notMintOrBurn && notOwner && INIT_CASH_BACK;

    if (conditionMet) {
      /** Re-setting the cash-back */
      INIT_CASH_BACK = false;
      /** Adding winners to the list */
      WINNERS.push(Winner(from, block.timestamp));
    }
  }

  /** Mint PsyDucks */
  function mint(uint256 amount) public payable {
    uint256 totalOwnable = balanceOf(_msgSender()) + amount;
    uint256 totalPrice = _PRICE * amount;

    if (totalOwnable <= PURCHASE_LIMIT) {
      /** LimitExceeded event */
      emit LimitExceeded(_msgSender(), "LIMIT_EXCEEDED");
      /** Limit the number of mints per account */
      require((totalOwnable) <= PURCHASE_LIMIT, 'You have exceeded the PURCHASE LIMIT.');
    }

    /** Check if the user is paying the correct price */
    require(msg.value >= totalPrice, "Incorrect Ether value sent.");

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