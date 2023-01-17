import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("PsyDucks contract", function () {
  async function deployTokenFixture() {
    const contract = await ethers.getContractFactory("PsyDucks");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const hardhatToken = await contract.deploy();

    /** Wait for the contract to be deployed */
    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { contract, hardhatToken, owner, addr1, addr2 };
  }

  it("should deploy the contract and check total supply to be equal to zero ", async function () {
    const { hardhatToken } = await loadFixture(deployTokenFixture);
    expect(await hardhatToken.totalSupply()).to.equal(0);
  });

  it("should verify that all variables are in their inital state", async function () {
    const { hardhatToken } = await loadFixture(deployTokenFixture);
    const phase = await hardhatToken.PHASE();
    const soldOut = await hardhatToken.SOLD_OUT();
    const cashBack = await hardhatToken.INIT_CASH_BACK();
    const ownersShare = await hardhatToken.OWNERS_SHARE();
    const maxSupply = await hardhatToken.MAX_SUPPLY();
    const maxInitSupply = await hardhatToken.MAX_INITIAL_SUPPLY();
    const maxMintable = await hardhatToken.MAX_MINTABLE();
    const price = await hardhatToken._PRICE();
    const purchaseLimit = await hardhatToken.PURCHASE_LIMIT();

    expect(phase.toString()).to.equal("1");
    expect(ethers.utils.formatEther(price.toString())).to.equal("0.09");
    expect(soldOut).to.equal(false);
    expect(cashBack).to.equal(false);
    expect(ownersShare.toString()).to.equal("30");
    expect(maxSupply.toString()).to.equal("20000");
    expect(maxInitSupply.toString()).to.equal("10000");
    expect(maxMintable.toNumber()).to.equal(
      maxInitSupply.toNumber() - ownersShare.toNumber()
    );
    expect(purchaseLimit.toString()).to.equal("20");
  });

  it("should mint tokens for a given address", async () => {
    const { hardhatToken, addr1 } = await loadFixture(deployTokenFixture);
    const tx = await hardhatToken.connect(addr1).mint(20, {
      value: ethers.utils.parseEther("1.8"),
    });

    const completedTx = await tx.wait();
    expect(completedTx.transactionHash).to.exist;

    const totalSupply = await hardhatToken.totalSupply();
    expect(totalSupply.toString()).to.equal("20");
  });

  it("should mint for the owner", async () => {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    const tx = await hardhatToken.connect(owner).reserve();

    const completedTx = await tx.wait();
    expect(completedTx.transactionHash).to.exist;

    const totalSupply = await hardhatToken.totalSupply();
    const ownersShareMinted = await hardhatToken.OWNERS_SHARE_MINTED();
    expect(totalSupply.toString()).to.equal("30");
    expect(ownersShareMinted).to.equal(true);
  });

  it("should withdraw funds from the contract", async () => {
    const { hardhatToken, addr1, owner } = await loadFixture(
      deployTokenFixture
    );
    const tx = await hardhatToken.connect(addr1).mint(1, {
      value: ethers.utils.parseEther("0.09"),
    });

    const completedTx = await tx.wait();
    expect(completedTx.transactionHash).to.exist;

    const balance = await ethers.provider.getBalance(hardhatToken.address);
    expect(ethers.utils.formatEther(balance)).to.equal("0.09");

    const txx = await hardhatToken.connect(owner).withdraw();
    const completedTxx = await txx.wait();
    expect(completedTxx.transactionHash).to.exist;

    const balancex = await ethers.provider.getBalance(hardhatToken.address);
    expect(ethers.utils.formatEther(balancex)).to.equal("0.0");
  });

  it("should fail the withdraw if not called by owner ", async () => {
    let err: Error;
    const { hardhatToken, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );
    const tx = await hardhatToken.connect(addr1).mint(1, {
      value: ethers.utils.parseEther("0.09"),
    });

    const completedTx = await tx.wait();
    expect(completedTx.transactionHash).to.exist;

    try {
      await hardhatToken.connect(addr2).withdraw();
    } catch (error) {
      err = error;
    }

    expect(err.message.includes("Caller is not the owner!")).to.be.true;
  });
});
