const FarmerProduct = artifacts.require("FarmerProduct");

module.exports = function(deployer) {
  deployer.deploy(FarmerProduct);

};
