/** Creation of Unsigned Software Private Limited */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";

contract PsyDucksLottoPool is ERC721("PsyDucks Lotto Pool", "PSY_LOTTO"), ERC2981, DefaultOperatorFilterer {
  using Counters for Counters.Counter;
  using Strings for uint256;

  /** Counter */
  Counters.Counter private _tokenIdCounter;
  /** Owners address */
  address payable __owner;
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

  /** Mint PsyDucks */
  function addToPool() public payable {
    require(msg.value > 0, "Incorrect Ether value sent!");
  }

  /** Withdraw funds from the contract */
  function withdraw() public onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, "Insufficient Funds!");
    __owner.transfer(balance);
  }

  /** Mint PsyDucks */
  function mint() public onlyOwner {
    /** Increment */
    _tokenIdCounter.increment();

    /** Mint NFT to the msg sender */
    _safeMint(_msgSender(), _tokenIdCounter.current());
  }
}