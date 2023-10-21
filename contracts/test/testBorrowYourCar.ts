import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BorrowYourCar = await ethers.getContractFactory("BorrowYourCar");
    const borrowYourCar = await BorrowYourCar.deploy("ZJUcar", "cars");

    return { borrowYourCar, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should return hello world", async function () {
      const { borrowYourCar } = await loadFixture(deployFixture);
      expect(await borrowYourCar.helloworld()).to.equal("hello world");
    });
    it("Mint new NFT", async function () {
      const { borrowYourCar, owner, otherAccount } = await loadFixture(deployFixture);
      expect(await borrowYourCar.balanceOf(owner.address)).to.equal(0);
      await borrowYourCar.airdrop();
      expect(await borrowYourCar.balanceOf(owner.address)).to.equal(3);
      expect(await borrowYourCar.ownerOf(0)).to.equal(owner.address);
      expect(await borrowYourCar.ownerOf(1)).to.equal(owner.address);
      expect(await borrowYourCar.ownerOf(2)).to.equal(owner.address);
      await borrowYourCar.connect(otherAccount).airdrop();
      expect(await borrowYourCar.balanceOf(otherAccount.address)).to.equal(3);
      expect(await borrowYourCar.ownerOf(3)).to.equal(otherAccount.address);
      expect(await borrowYourCar.ownerOf(4)).to.equal(otherAccount.address);
      expect(await borrowYourCar.ownerOf(5)).to.equal(otherAccount.address);
    });
    it("Mint new NFT", async function () {
      const { borrowYourCar, owner, otherAccount } = await loadFixture(deployFixture);
      expect(await borrowYourCar.borrowerOf(0)).to.equal('0x0000000000000000000000000000000000000000');
      await borrowYourCar.airdrop();
      await borrowYourCar.setBorrow(0, otherAccount.address, 9999999999999);
      expect(await borrowYourCar.borrowerOf(0)).to.equal(otherAccount.address);
    });
  });
});