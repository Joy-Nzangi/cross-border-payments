var StellarSdk = require("stellar-sdk");
var accounts = require("../accounts");
var util = require("util");

var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

var checkAccounts = async accounts => {
    console.log("fetching balance...");

    const sAccounts = await Promise.all(
        accounts.map(async account => await server.loadAccount(account.publicKey))
    );

    return sAccounts.map(({ id, balances }) => ({
        id,
        balances
    }));

};

checkAccounts(accounts)
    .then(accounts => console.log(util.inspect(accounts, false, null)))
    .catch(e => {
        console.log(e);
        throw e;
    })
