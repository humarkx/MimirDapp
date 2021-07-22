/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;
const { alchemyApiKey, mnemonic } = require("./secrets.json");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
module.exports = {
  solidity: "0.5.5",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x82ca62820aa047e475d208a01daca9671c4de58c7654c61dc3329c828d0fa694","balance":"1000000000000000000000"},{"privateKey":"0x887640bf046d1bbf7e23afe2b0fe1e9e59b59435fc8a5b5e8ae6e47ce5280620","balance":"1000000000000000000000"},{"privateKey":"0x905fb4cecbc108efcceb6bed31c086faf32185582d18ab08a834097bb032ffdd","balance":"1000000000000000000000"},{"privateKey":"0xfd83b4e8388a5b5e00093bb9be32806ed692071b688472f37add9cdfefbf9333","balance":"1000000000000000000000"},{"privateKey":"0x9356afe927dc180afd173847ac44f6ba9ee87fcc71ca3f2a251bbee379490c5d","balance":"1000000000000000000000"},{"privateKey":"0xbbdaaf94ac138117b0d158da67f1eb3b2865c4e079ad9a86a41fea36f4ed1d8d","balance":"1000000000000000000000"},{"privateKey":"0x04d5415cce420d8cd0ef90573ccc7b9ffd8fea9d1665cdefa9d16bc0ff22456f","balance":"1000000000000000000000"},{"privateKey":"0xbdef0a53165edd88a63d79a29c13f6a85227d71d825203166fa75e6bdaf3c312","balance":"1000000000000000000000"},{"privateKey":"0xa5cb18f15e2c2a32a3b202dead5d680cd8b0c01e39bbad616f2baf8344cbf432","balance":"1000000000000000000000"},{"privateKey":"0x602a3cd24497ab9b1cc2681c21b02abdf5fbf2f734806459d5447e402599bc87","balance":"1000000000000000000000"}]
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};