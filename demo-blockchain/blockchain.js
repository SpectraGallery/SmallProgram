// demo blockchain

const crypto = require('crypto')

const initBlock = {
    index: 0,
    data: 'Hello',
    prevHash: '4',
    timestamp: 1705474546152,
    nonce: 444,
    hash: crypto.createHash('sha256').update(0 + '4' + 1705474546152 + 'Hello' + 444).digest('hex')
}


class Blockchain{

    constructor(){
        this.blockchain = [
            initBlock
        ]
        this.data =[]
        this.difficulty = 3

    }
    // get previous block index
    getLastBlock(){
        return this.blockchain[this.blockchain.length-1]
    }

    // mine
    mine(){
        const newBlock = this.generateNewBlock()
        // if block is validated and blockchain is validated, then generate new block
        if(this.isValidBlcok(newBlock) && this.isValidChain()){
            this.blockchain.push(newBlock)
        }else{
            console.log('error, invalid block', newBlock)
        }
    }

    //generate new block
    generateNewBlock(){

        let nonce = 0 
        const index = this.blockchain.length //of block
        const data = this.data
        const prevHash = this.getLastBlock().hash
        let timestamp = new Date().getTime()
        let hash = this.computeHash(index, prevHash, timestamp, data, nonce)
        while(hash.slice(0,this.difficulty)!=='4'.repeat(this.difficulty)){
            nonce += 1
            hash = this.computeHash(index, prevHash, timestamp, data, nonce)

        }
        return {
            index,
            data,
            prevHash,
            timestamp,
            nonce,
            hash
        }
    }


    computeHashForBlock({index, prevHash, timestamp, data, nonce}){
        return this.computeHash(index, prevHash, timestamp, data, nonce)
    }

    //compute hash
    computeHash(index, prevHash, timestamp, data, nonce){
        return crypto
                .createHash('sha256')
                .update(index + prevHash + timestamp + data + nonce)
                .digest('hex')

    }

    //validate block
    isValidBlcok(newBlock,lastBlock=this.getLastBlock()){
        // block index equals to the prevBlock index + 1
        // time is moving forward, 
        // check whether prevHash equals the current hash,
        // check whether hash satisfies our requirement
        // check the computation of hash
        if(newBlock.index !== lastBlock.index+1){
            return false
        }else if(newBlock.timestamp<=lastBlock.timestamp){
            return false
        }else if(newBlock.prevHash!==lastBlock.hash){
            return false
        }else if(newBlock.hash.slice(0, this.difficulty)!=='4'.repeat(this.difficulty)){
            return false
        }else if(newBlock.hash!==this.computeHashForBlock(newBlock)){
            return false
        }
        return true
    }

    //validate chain
    isValidChain(chain=this.blockchain){
        // except the gensis block
        for(let i=chain.length-1; i>=1;i=i-1 ){
            if(!this.isValidBlcok(chain[i],chain[i-1])){
                return false
            }
        }
        if(JSON.stringify(chain[0])!==JSON.stringify(initBlock)){
            return false
        }
        return true
    }
}

let bc = new Blockchain()
bc.mine()
bc.mine()
bc.mine()
console.log(bc.blockchain)