pragma solidity ^0.4.18;

import '../node_modules/zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract mrAllarCoin is MintableToken {
  string public name = "mr. Allar Coin";
  string public symbol = "MAC";
  uint8 public decimals = 18;
}
