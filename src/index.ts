class Block {
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

let blockchain: [Block] = [genesisBlock];

console.log(blockchain);

export {}; // 모듈로 생성
