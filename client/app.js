App = {
    contracts: {},
    init: async () => {
        console.log("La aplicación ha sido ejecutada correctamente")
        await App.loadEthereum()
        await App.loadContracts()
        await App.imprimirDireccion()
        await App.llamarElementosBlockchain()
    },

    loadEthereum: async () => {
        if (window.ethereum) {
            console.log("Metamask está instalado correctamente")
            App.web3Provider = window.ethereum; //esta variable web·Provider la usaremos más adelante en el loadContracts()
            account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //console.log(account)
            //console.log(account[0]) //esto me saca por consola la cuenta que acabamos de conectar


            //Saldo de la cuenta

            const address = account[0]; //asignamos la direccion a una variable
            const saldoWeis = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] }); //pedimos el saldo
            //const saldoEthers = await window.ethereum.utils.fromWei(saldoWeis, 'ether'); //convertimos los wei en ether NO me funciona!!
            //console.log(parseInt(saldoWeis, 16) / (1e18)); //me da el saldo en hexadecimal y en weis, lo pasamos a decimal y a ether

            App.addresss = account[0];//esta ultima sentencia es para reconocer la cuenta en el 'incrementar()'


        } //else if (window.web3) {
        //  web3 = new Web3(window.web3.currentProvider)
        //  console.log("conectado a la Web3")
        //}
        else {
            console.log("Instala la extensión de Metamask")
        }
    },

    loadContracts: async () => {
        const res = await fetch("NuevoContrato.json"); //con fetch extraigo los datos importantes del json, pero me lo convierte a objeto
        const NuevoContratoJSON = await res.json(); //aqui lo convierto de nuevo a json

        //console.log(NuevoContratoJSON);

        //vamos a crear un contrato en base a TruffleContract, luego conectamos el contrato a la palicación, y por ultimo lo desplegamos de la forma que hemos hecho el contrato en solidity
        App.contracts.NuevoContrato = TruffleContract(NuevoContratoJSON)//creamos el contrato
        App.contracts.NuevoContrato.setProvider(App.web3Provider) //conectamos el contrato a la aplicación
        App.NuevoContrato = await App.contracts.NuevoContrato.deployed() //desplegamos el contrato con la base de la plantilla de contrato que hemos creado en solidity
        //console.log(App.NuevoContrato)
    },

    incrementar: async () => {
        const result = await App.NuevoContrato.incrementar({ from: App.addresss }); //me incrementa el numero en la blockchain
    },

    imprimirDireccion: async () => { //al crear esta funcion debemos poner todas las funciones de init en await, y por tanto la init en asincrona
        document.getElementById("direccion").innerText = App.addresss;
    },

    llamarElementosBlockchain: async () => {
        const numero = await App.NuevoContrato.numero() //asi se llama desde la consola de truffle tambien
        const numeroN = numero.toNumber()
        console.log(numeroN)

        App.numeroWeb = numero.toNumber();

        document.getElementById("numero_web").innerText = App.numeroWeb;

    }


}

App.init()