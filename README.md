# Zk-ERC20

Requirement
- docker
- ganachi-cli

Setup instructions
```
//open terminal #1
$ git clone https://github.com/Onther-Tech/zk-ERC20
$ cd zk-ERC20
$ ganachi-cli

//open termianal #2
//in repository directory
$ npm run start:zokrates


//open terminal #3
//in repository directory
$ npm run zokrates //compile, setup and export verifier.sol

//for test
$ truffle test test/SecretNoteTest.js


```
