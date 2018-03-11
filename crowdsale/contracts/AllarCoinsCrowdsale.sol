pragma solidity ^0.4.18;

import '../node_modules/zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import './mrAllarCoin.sol';

contract AllarCoinsCrowdsale is Crowdsale {
  function AllarCoinsCrowdsale(uint256 _rate, address _wallet) Crowdsale(_rate, _wallet, createTokenContract()) public
  {
  }

  // creates the token to be sold.
  // override this method to have crowdsale of a specific MintableToken token.
  function createTokenContract() internal returns (MintableToken) {
    MintableToken coin = new mrAllarCoin();
    require(coin.mint(address(this), uint256(1000000000)));
    return coin;
  }

}
