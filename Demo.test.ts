import { loadFixture, ethers, expect, time } from "./setup";
import type { Demo } from "../typechain-types";

describe("Demo", function() {
    async function deploy() {
        const [ superadmin, withdrawer, minter ] = await ethers.getSigners();

        const Factory = await ethers.getContractFactory("Demo");
        const demo: Demo = await Factory.deploy(withdrawer.address, minter.address);
        await demo.deployed();

        return { demo, withdrawer, minter }
    }

    it('wirhdraw works', async function() {
        const { demo, withdrawer } = await loadFixture(deploy);

        const withdrawerRole = await demo.WITHDRAWER_ROLE();
        const defaultAdmin = await demo.DEFAULT_ADMIN_ROLE();

        expect(await demo.getRoleAdmin(withdrawerRole)).to.eq(defaultAdmin);

        await demo.connect(withdrawer).withdraw();

        await expect(demo.withdraw()).to.be.revertedWith('no such role!');
    });

    it('that works', async function() {
        const { demo, minter } = await loadFixture(deploy);

        const minterRole = await demo.WITHDRAWER_ROLE();
        const defaultAdmin = await demo.DEFAULT_ADMIN_ROLE();

        expect(await demo.getRoleAdmin(minterRole)).to.eq(defaultAdmin);

        await demo.connect(minter).getBalance();

        await expect(demo.getBalance()).to.be.revertedWith('no such role!');
    });
});
