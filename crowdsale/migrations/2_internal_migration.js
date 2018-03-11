const AllarCoinsCrowdsale = artifacts.require("./contracts/AllarCoinsCrowdsale.sol")
const mrAllarCoin = artifacts.require('./contracts/mrAllarCoin.sol');

module.exports = function(deployer, network, accounts) {
  console.log(" accounts: "+accounts)
  const rate = 1000
  console.log("tokens count/1 ether: "+rate)
  const wallet = accounts[0]
  console.log("Wallet: "+wallet)

  var testValue = 0.001;
  console.log("value sended via test transaction: "+ testValue);

  var passwords = ["pass1", "pass2", "pass3", "pass4", "pass5", "passn"];

  for (i = 0; i < accounts.length; i++) {
    web3.personal.unlockAccount(accounts[i], passwords[i], 3000000);
  }

  var sender;
  for (i = 1; i < accounts.length-1; i++) {
    if (web3.fromWei(web3.eth.getBalance(accounts[i])) > testValue) {
        sender = accounts[i];
        break;
    }
  }

  console.log("Second account thats have enought ether(more than " + testValue + ") : " + sender);

  deployer.deploy(AllarCoinsCrowdsale, rate, wallet).then(function() {
      return AllarCoinsCrowdsale.deployed()
  }).then(function(crowdsale) {
      console.log("crowdsale: " + crowdsale)
      sale = crowdsale
      return crowdsale.token.call()
  }).then(function(tokenAddress) {
      console.log("tokenAddress: " + tokenAddress);

      var coinInstance =  mrAllarCoin.at(tokenAddress);

      coinInstance.totalSupply().then(function(result) {
        console.log("total supply: " + result);
      });

      console.log("sale: " + sale);
      console.log("sender: " + sender);

      instance =  AllarCoinsCrowdsale.at(sale.address);
      console.log("AllarCoinsCrowdsale instance: " + instance);
      instance.sendTransaction({from: sender, value: 10}).then(function(transaction){
        console.log("coinInstance: " + coinInstance);
        console.log("adress: " + sender);
        coinInstance.balanceOf.call(sender).then(function(n){
          console.log(sender + " has " + n + " tokens on balance");
        });
      });
  })
};
