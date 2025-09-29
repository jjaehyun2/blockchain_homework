import hre from "hardhat";
import {expect} from "chai";
import { MyToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("MyToken deploy", () => {
    let myToken: MyToken;
    let signers: HardhatEthersSigner[];
    before("Should deploy", async () => {
        myToken = await hre.ethers.deployContract("MyToken", ["My Token", "MTK", 18]);
        signers = await hre.ethers.getSigners();
    });
    it("should return", async () => {
            expect(await myToken.name()).to.equal("My Token");
    });
    it("should return", async () => {
        expect(await myToken.symbol()).to.equal("MTK");
    });
    it("should return", async () => {
        expect(await myToken.decimals()).to.equal(18);
    });
    it("should return 0 totalSupply", async () => {
        expect(await myToken.totalSupply()).to.equal(0);
    });
    it("should return 0 balance for signer 0", async () => {
        const signer0 = signers[0];
        expect(await myToken.balanceOf(signer0.address)).to.equal(0);
    });
});