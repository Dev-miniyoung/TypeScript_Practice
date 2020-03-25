import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    prevHash: string,
    timestamp: number,
    data: string
  ): string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.prevHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }
} // block 구조

const genesisBlock: Block = new Block(0, "20202020", "", "First block", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.prevHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlcok: Block, prevBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlcok)) {
    return false;
  } else if (prevBlock.index + 1 !== candidateBlcok.index) {
    return false;
  } else if (prevBlock.hash !== candidateBlcok.prevHash) {
    return false;
  } else if (getHashforBlock(candidateBlcok) !== candidateBlcok.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second blcok");
createNewBlock("third blcok");
createNewBlock("fourth blcok");

console.log(blockchain);

export {}; // 모듈로 생성
