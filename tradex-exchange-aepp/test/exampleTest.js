const Ae = require('@aeternity/aepp-sdk').Universal;

const config = {
    host: "http://localhost:3001/",
    internalHost: "http://localhost:3001/internal/",
    contractSourceFile: './contracts/Restricted.aes',
    gas: 200000,
    ttl: 55,
    nativeMode: true,
    networkId: 'ae_devnet',
    compilerUrl: 'http://localhost:3001/'
}

describe('Tradex Exchange Contract', () => {

    let owner;
    let nonOwner;
    let options = {
        ttl: config.ttl
    }

    before(async () => {
        const ownerKeyPair = wallets[0];
        const nonOwnerKeyPair = wallets[1];
        owner = await Ae({
            url: config.host,
            internalUrl: config.internalHost,
            keypair: ownerKeyPair,
            nativeMode: true,
            networkId: 'ae_devnet',
            compilerUrl: config.compilerUrl
        });

        nonOwner = await Ae({
            url: config.host,
            internalUrl: config.internalHost,
            keypair: nonOwnerKeyPair,
            nativeMode: true,
            networkId: 'ae_devnet',
            compilerUrl: config.compilerUrl
        });

    })

    it('Deploying successfully', async () => {
        let contractSource = utils.readFileRelative('./contracts/TradexExchange.aes', "utf-8"); // Read the aes file

        const compiledContract = await owner.contractCompile(contractSource, { 
            gas: config.gas
        })
        // Deploy it
        // [] - empty init state object
        const deployPromise = compiledContract.deploy([], options);

        await assert.isFulfilled(deployPromise, 'Could not deploy the Tradex Exchange Contract Smart Contract'); // Check it is deployed
    })

})

