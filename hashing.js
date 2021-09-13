// test

console.log("Print");

var crypto = require("crypto");

var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
    blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

function createBlock() {
    for(let i = 0; i <= poem.length - 1; i++) {
        const blockTime = Date.now();
        const blockLength = Blockchain.blocks.length;
        const prevHash = Blockchain.blocks[blockLength - 1].hash;
        console.log((i + 1) + " " + prevHash + " " + poem[i] + " " + blockTime)
        const newHash = blockHash((i + 1), prevHash, poem[i], blockTime);
        Blockchain.blocks.push({
            index: blockLength,
            hash: newHash,
            prevHash: prevHash,
            data: poem[i],
            timestamp: blockTime,
        });
    }

    console.log(Blockchain.blocks)
    
    return Blockchain.blocks;
}

function verifyChain() {
    for(let c = 0; c <= Blockchain.blocks.length - 1; c++) {
        console.log(verifyBlock(c));
    }
}

function verifyBlock(bl) {
    let data = Blockchain.blocks[bl].data;
    let index = Blockchain.blocks[bl].index;
    let prevHash = Blockchain.blocks[bl].prevHash;
    let timestamp = Blockchain.blocks[bl].timestamp;
    const currentHash = Blockchain.blocks[bl].hash;

    if(data != "" && index >= 0 && prevHash != "") {
        const hash = blockHash(index, prevHash, data, timestamp);
        if(currentHash === hash && prevHash != "") {
            return true;
        } else {
            return false;
        }
    } else if(index <= 1 && currentHash == "000000") {
        return true;
    } else {
        return false;
    }
}

function blockHash(index, prevHash, blockData, blockTime) {
    return crypto.createHash("sha256")
    .update(index.toString())
    .update(prevHash.toString())
    .update(blockData.toString())
    .update(blockTime.toString())
    .digest("hex");
}

createBlock();
verifyChain();