# Zk-ERC20

## Requirement
- docker
- ganachi-cli

## Setup & Test Instructions
```
//Need at least three terminals

//terminal #1
$ git clone https://github.com/Onther-Tech/zk-ERC20
$ cd zk-ERC20 & npm install
$ ganachi-cli

//termianal #2
//in repository directory
$ npm run start:zokrates

//terminal #3
//in repository directory
//zokrates compile, setup and export verifier.sol
$ npm run zokrates

//test
$ truffle test test/SecretNoteTest.js
```
