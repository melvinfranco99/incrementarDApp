const NuevoContrato = artifacts.require("NuevoContrato")

//Creacion del testing

contract("NuevoContrato", () => {

    before(async () => {
        contrato = await NuevoContrato.deployed()
    })


    it('despliegue satisfactorio', async () => {
        const address = contrato.address;

        assert.notEqual(address, "")
        assert.notEqual(address, "0x0")
        assert.notEqual(address, "-")
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
    })

    it('variable bien creada', async () => {
        n = await contrato.numero()
        nNumero = n.toNumber()

        assert.notEqual(nNumero, undefined)
        assert.notEqual(nNumero, "empty")
        assert.notEqual(nNumero, "-")
        assert.notEqual(nNumero, null)
    })

    it('funcion incrementar', async () => {
        const result = await contrato.incrementar()
        const n = await contrato.numero()
        const nNumero = n.toNumber()

        assert.notEqual(nNumero, 0)
        assert.equal(nNumero, 1)

    })

})