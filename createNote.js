//const contractArtifact = artifacts.require('./SecretNote.sol');
const Web3 = require('web3');
const Web3HDWalletProvider = require("web3-hdwallet-provider");
const mnemonic = "visa size problem actor purchase achieve sport divorce kick catalog nephew vibrant"

var httpProvider = new Web3.providers.HttpProvider('"http://localhost:7545'); // Rootchain RPC endpoint
var provider = new Web3HDWalletProvider(mnemonic, httpProvider);

const web3 = new Web3(provider);
web3.setProvider(provider);

const oper = web3.eth.accounts[0] // "0x71562b71999873DB5b286dF957af199Ec94617F7"
const user = web3.eth.accounts[1];
const BN = require('bn.js')

const fs = require('fs');
const path = require('path');

const SecretNoteABIFile = path.join(__dirname, '.', 'build', 'contracts','SecretNote.json');
const SecretNoteABI = JSON.parse(fs.readFileSync(SecretNoteABIFile).toString()).abi;
const SecretNote = web3.eth.Contract(SecretNoteABI, "0x815FE1963F24C8Ce48d5306F2dEdE264D07c7f50");

async function encrypt(address, _amount) {
  // 20 12
  let amount = new BN(_amount, 16).toString(16, 24); // 12 bytes = 24 chars in hex
  const payload = address + amount;
  return payload;
  // console.log('enc payload', payload)
  // const encryptedNote = await web3.eth.accounts.encrypt('0x' + payload, 'vitalik')
  // return JSON.stringify(encryptedNote);
}

console.log(web3.version)

deploy = async ()=>{
     const accounts = await web3.eth.getAccounts();
     console.log(accounts[0]);
}
deploy();

// execute = async () => {
//     // use bluebird
//     const Promise = require('bluebird');
//     Promise.promisifyAll(web3.eth, { suffix: 'Async' });
//     Promise.promisifyAll(SecreetNote, { suffix: 'Async' });
//
//     let txHash;
//
//     try {
//        console.log("test")
//        const accounts = await web3.eth.getAccounts();
//        console.log(accounts[0])
//        //
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// execute();

// async function execute() {
//   const accounts = await web3.eth.getAccounts();
//   // console.log(accounts)
//   const instance = await contractArtifact.deployed();
//   let enc = await encrypt(accounts[0].slice(2), 'AF')
//   console.log('enc', enc)
//   const tx = await instance.createNoteDummy(accounts[0], '0xaf', enc);
//   console.dir(tx, {depth: null});
// }
//
// module.exports = async function(callback) {
//   // perform actions
//   await execute();
//   callback();
// }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// async function createNote() {
//   const SecretNote =  new web3.eth.Contract(
//     compiledSecretNote.abi,
//     contractAddress
//   );


// }
// let instance = await SecretNote.deployed();
// let enc = await encrypt(accounts[0].slice(2), '5')
// const tx = await instance.createNoteDummy('0x5', enc);
// console.dir(tx, {depth: null});

// const noteId = tx.logs[0].args.noteId;
// const index = tx.logs[0].args.index;
// // console.log('noteId', noteId)

// // decrypt
// const cipher = await instance.allNotes.call(index)
// const noteHash = await decrypt(cipher);
// console.log('noteHash', noteHash)
// // check noteHash in mapping now
// const state = await instance.notes.call('0x' + noteHash)
// console.log('state', state.toNumber())



// async function decrypt(cipher) {
//   let payload = await web3.eth.accounts.decrypt(JSON.parse(cipher), 'vitalik').privateKey
//   payload = payload.slice(2)
//   const address = payload.slice(0, 40) // remove 0x and
//   const amount = payload.slice(40)
//   console.log(address, amount);

//   // pad address and amount to 32bytes
//   let _address = new BN(address, 16).toString(16, 64);
//   let _amount = new BN(amount, 16).toString(16, 64); // 32 bytes = 64 chars in hex
//   const buf = Buffer.from(_address + _amount, 'hex');
//   const digest = crypto.createHash('sha256').update(buf).digest('hex');
//   return digest;
// }
