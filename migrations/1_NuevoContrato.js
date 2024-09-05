const NuevoContrato = artifacts.require("NuevoContrato");

module.exports = function (deployer) {
    deployer.deploy(NuevoContrato);
}