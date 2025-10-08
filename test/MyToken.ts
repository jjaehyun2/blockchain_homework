import hre from "hardhat";
import {expect} from "chai";
import { MyToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const mintingAmount = 100n;
const decimals = 18n;

describe("My Token", () => {
    let myTokenC: MyToken;
    let signers: HardhatEthersSigner[];
    beforeEach("Should deploy", async () => {
        myTokenC = await hre.ethers.deployContract("MyToken", ["My Token", "MTK", decimals, mintingAmount]);
        signers = await hre.ethers.getSigners();
    });
    describe("Basic state value check", () => {
        it("should return", async () => {
            expect(await myTokenC.name()).to.equal("My Token");
        });
        it("should return", async () => {
            expect(await myTokenC.symbol()).to.equal("MTK");
        });
        it("should return", async () => {
            expect(await myTokenC.decimals()).to.equal(decimals);
        });
        it("should return 100 totalSupply", async () => {
            expect(await myTokenC.totalSupply()).to.equal(mintingAmount * 10n **decimals);
        });
    })
    
    describe("Mint", () => {
        it("should return 1MTK balance for signer 0", async () => {
            const signer0 = signers[0];
            expect(await myTokenC.balanceOf(signer0.address)).to.equal(mintingAmount * 10n**decimals);
        });
    })    
    //1MTK = 10^18

    describe("Transfer", () => {
        it("should have 0.5MTK", async () => {
            const signer0 = signers[0];
            const signer1 = signers[1];
            await expect(myTokenC.transfer(hre.ethers.parseUnits("0.5", decimals), signer1.address)) //event check 앞에는 await
                    .to.emit(myTokenC, "Transfer").withArgs(signer0.address, signer1.address, hre.ethers.parseUnits("0.5", decimals));
            expect(await myTokenC.balanceOf(signer1.address)).to.equal(hre.ethers.parseUnits("0.5", decimals));


        });
        it("should be reverted with insufficient balance error", async () => {
            const signer1 = signers[1];
            await expect(myTokenC.transfer(hre.ethers.parseUnits((mintingAmount + 1n).toString(), decimals), signer1.address)).to.be.revertedWith("insufficient balance");
        });
    });
});

//nvm use v20.19.4