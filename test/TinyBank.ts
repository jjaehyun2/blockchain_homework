import hre from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { MyToken, TinyBank } from "../typechain-types";
import { expect } from "chai";
import { DECIMALS, MINTING_AMOUNT } from "./constant";

describe("TinyBank", () => {
    let signers: HardhatEthersSigner[];
    let myTokenC: MyToken;
    let TinyBankC: TinyBank;
    beforeEach(async () => {
        signers = await hre.ethers.getSigners();
        myTokenC = await hre.ethers.deployContract("MyToken", [
            "My Token", "MTK", DECIMALS, MINTING_AMOUNT
        ]);
        TinyBankC = await hre.ethers.deployContract("TinyBank", [await myTokenC.getAddress()]);
        await myTokenC.setManager(await TinyBankC.getAddress());
    });

    describe("Initialized State check", () => {
        it("should return totalStaked 0", async () => {
            expect(await TinyBankC.totalStaked()).to.equal(0n);
        });
        it("should return staked 0 amount of signer0", async () => {
            const signer0 = signers[0];
            expect(await TinyBankC.staked(signer0.address)).to.equal(0n);
        });
    });
    describe("Staking", async () => {
        it("should return staked amount", async () => {
            const signer0 = signers[0];
            const stakingAmount = hre.ethers.parseUnits("50", DECIMALS);

            await myTokenC.approve(TinyBankC.getAddress(), stakingAmount);
            await TinyBankC.stake(stakingAmount);

            expect(await TinyBankC.staked(signer0.address)).to.equal(stakingAmount);
            expect(await TinyBankC.totalStaked()).to.equal(stakingAmount);
            expect(await myTokenC.balanceOf(signer0.address)).to.equal(await TinyBankC.totalStaked());
        });
    });
    describe("Withdraw", async () => {
        it("should return 0 staked after withdrawing total token", async () => {
            const signer0 = signers[0];
            const stakingAmount = hre.ethers.parseUnits("50", DECIMALS);
            await myTokenC.approve(TinyBankC.getAddress(), stakingAmount);
            await TinyBankC.stake(stakingAmount);
            await TinyBankC.withdraw(stakingAmount);
            expect(await TinyBankC.staked(signer0.address)).to.equal(0n);
        });
    });

    describe("reward", async () => {
        it("should reward 1MT every blocks", async () => {
            const signer0 = signers[0];
            const stakingAmount = hre.ethers.parseUnits("50", DECIMALS);
            await myTokenC.approve(await TinyBankC.getAddress(), stakingAmount);
            await TinyBankC.stake(stakingAmount);

            const BLOCKS = 5n;
            const transferAmount = hre.ethers.parseUnits("1", DECIMALS);
            for (let i = 0; i < BLOCKS; i++) {
                await myTokenC.transfer(transferAmount, signer0.address);
            }

            await TinyBankC.withdraw(stakingAmount);
            expect(await myTokenC.balanceOf(signer0.address)).to.equal(
                hre.ethers.parseUnits((BLOCKS + MINTING_AMOUNT + 1n).toString())
            );
        });

        it("should revert when changing rewardPerBlock by hacker", async () => {
            const hacker = signers[3];
            const rewardToChange = hre.ethers.parseUnits("10000", DECIMALS);
            await expect(
                TinyBankC.connect(hacker).setRewardPerBlock(rewardToChange)
            ).to.be.revertedWith(
                "You are not authorized to manage this contract"
            );

        });
    });
});