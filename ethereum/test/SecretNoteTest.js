const SecretNote = artifacts.require("SecretNote");

const BN = require('bn.js');
const crypto = require('crypto');
const { getTransferZkParams } = require('../scripts/zokcmd');
const { zokratesExec } = require('../scripts/docker-helper');

// const exec = require('child_process').execFile;
// Promise = require('bluebird');

contract('SecretNote', function(accounts) {
  // const dockerImageName = "zokrates/zokrates";
  // let dockerContainerName;

  let instance;
  let nodeId, enc;

  const initialAmount = '5';
  const transferAmount = '3';


  it('createNoteDummy', async function() {
    // const e = await encrypt('2B522cABE9950D1153c26C1b399B293CaA99FcF9', '5');
    // const d = await decrypt(e);
    instance = await SecretNote.deployed();
    enc = await encrypt(accounts[0].slice(2), initialAmount);
    console.log('enc', enc);
    const tx = await instance.createNote(accounts[0], '0x' + initialAmount, enc);
    // console.dir(tx, {depth: null});

    noteId = tx.logs[0].args.noteId;
    const index = tx.logs[0].args.index;
    console.log('noteId', noteId);
    console.log('index', index);

    // get note by noteId
    const state = await instance.notes(noteId);
    console.log('state', state.toNumber()); // state 1
    console.log('allnote.length', await instance.getNotesLength());

    const res = getTransferZkParams(
      accounts[0],
      '0x' + initialAmount,
      accounts[1],
      '0x' + transferAmount,
    );

    console.log("getTransferZkParams()", res);

    await zokratesExec(res);
  })
})

async function encrypt(address, _amount) {
  // 20 12
  let amount = new BN(_amount, 16).toString(16, 24); // 12 bytes = 24 chars in hex
  const payload = address + amount;
  console.log('enc payload', payload)
  const encryptedNote = await web3.eth.accounts.encrypt('0x' + payload, 'vitalik')
  return JSON.stringify(encryptedNote);
}

async function decrypt(cipher) {
  let payload = await web3.eth.accounts.decrypt(JSON.parse(cipher), 'vitalik').privateKey
  payload = payload.slice(2)
  const address = payload.slice(0, 40) // remove 0x and
  const amount = payload.slice(40)
  console.log(address, amount);

  // pad address and amount to 32bytes
  let _address = new BN(address, 16).toString(16, 64);
  let _amount = new BN(amount, 16).toString(16, 64); // 32 bytes = 64 chars in hex
  const buf = Buffer.from(_address + _amount, 'hex');
  const digest = crypto.createHash('sha256').update(buf).digest('hex');
  return digest;
}

function promiseFromChildProcess(child) {
    return new Promise(function (resolve, reject) {
        child.addListener("error", reject);
        child.addListener("exit", resolve);
    });
}
