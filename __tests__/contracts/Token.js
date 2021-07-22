const { expect } = require("chai");

describe("Token contract", function() {
  it("Deployment should assign the total supply of tokens to the owner", async function() {
    const [owner] = await ethers.getSigners();

    const MimirToken = await ethers.getContractFactory("MimirToken");

    const Mimir = await MimirToken.deploy();

    const ownerBalance = await Mimir.balanceOf(owner.address);
    expect(await Mimir.totalSupply()).to.equal(ownerBalance);
  });
  it("Initializes MimirToken", async function() {
    const MimirToken = await ethers.getContractFactory("MimirToken");

    const Mimir = await MimirToken.deploy();

    const name = await Mimir.name();
    expect(name).to.equal("MimirToken");
  });
  it("MimirToken Supply", async function() {

    const MimirToken = await ethers.getContractFactory("MimirToken");

    const Mimir = await MimirToken.deploy();

    const totalSupply = await Mimir.totalSupply();
    expect(ethers.utils.formatEther(totalSupply)).to.equal('100000000.0');
  });
  it("MimirToken releaseMimirTeamTokens", async function() {
    const MimirToken = await ethers.getContractFactory("MimirToken");

    const Mimir = await MimirToken.deploy();
    const teamAddresses = ['0xe302A92838234Ca03eaCb23868455394a497B306']

    const releaseMimirTeamTokens = await Mimir.releaseMimirTeamTokens();

    for (const element of teamAddresses) {
        const balance = await Mimir.balanceOf(ethers.utils.getAddress(element));
        expect(balance).to.equal('9250000000000000000000000')
      }
  });
  it("MimirToken releaseAdvisorTokens", async function() {
    const MimirToken = await ethers.getContractFactory("MimirToken");

    const Mimir = await MimirToken.deploy();
    const advisoryAddresses = ['0x7437682530Cfce784dE00Cf747eE1f1bB10F7Ece']
    const releaseAdvisorTokens = await Mimir.releaseAdvisorTokens();

    for (const element of advisoryAddresses) {
        const balance = await Mimir.balanceOf(ethers.utils.getAddress(element));
        expect(balance).to.equal('26000000000000000000000000')
      }
  });
});