const Stellar = require("stellar-sdk");
const { TimeoutInfinite } = require("stellar-base");
const accounts = require("../accounts")

const server = new Stellar.Server("https://horizon-testnet.stellar.org");

const runTransaction = async (JoyPubKey, Joysecret, NoelPubKey) => {

    const standardFee = await server.fetchBaseFee()

    const txOptions = {
        fee: standardFee,
        networkPassphrase: Stellar.Networks.TESTNET
    };

    const paymentTonoel = {
        destination: NoelPubKey,
        asset: Stellar.Asset.native(),
        amount: "100"
    };

    const JoyAccount = await server.loadAccount(JoyPubKey);

    const transaction = new Stellar.TransactionBuilder(JoyAccount, txOptions)
        .addOperation(Stellar.Operation.payment(paymentTonoel))
        .setTimeout(TimeoutInfinite)
        .build();

    transaction.sign(Joysecret);

    await server.submitTransaction(transaction);
};

const [Joy, Noel] = accounts;

runTransaction(
    Joy.publicKey,
    Stellar.Keypair.fromSecret(Joy.secret),
    Noel.publicKey
)
    .then(() => console.log("Transaction Successful"))
    .catch(e => {
        console.log(e);
        throw e;
    })