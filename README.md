# ZkDAI
Private DAI transactions on ethereum.

[Demo video](https://youtu.be/55qt4tj2O3Y)

[Devpost](https://devpost.com/software/ethsingapore-zk-dai)

[Slides](https://docs.google.com/presentation/d/1wQgbbT8A4Jwr3X3EC7oubtVlL_kNNlTS4z9XSxpXIQo/edit?usp=sharing)


Dev setup instructions
[Video](https://www.youtube.com/watch?v=DCnaUYbk75k&feature=youtu.be)

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
//mote to repo directory
$ npm run start:zokrates

//open terminal #3
$ npm run zokrates

//for test
$ truffle test test/SecretNoteTest.js


```
