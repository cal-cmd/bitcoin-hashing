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
        const newHash = blockHash(Blockchain.blocks.length - 1);
        const prevHash = Blockchain.blocks[Blockchain.blocks.length - 1].hash;
        Blockchain.blocks.push({
            index: Blockchain.blocks.length,
            hash: newHash,
            prevHash: prevHash,
            data: poem[i],
            timestamp: Date.now(),
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
    console.log(Blockchain.blocks[bl].data)
    if(Blockchain.blocks[bl].data != "" && Blockchain.blocks[bl].index >= 0) {
        if(Blockchain.blocks[bl].hash != "") {
            const hash = blockHash(bl - 1)
            if(hash === Blockchain.blocks[bl].hash) {
                if(Blockchain.blocks[bl].prevHash != ""){
                    if(Blockchain.blocks[bl-1].hash === Blockchain.blocks[bl].prevHash) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else if(Blockchain.blocks[bl].index == 0 && Blockchain.blocks[bl].hash == "000000") {
        return true;
    } else {
        return false;
    }
}

function blockHash(bl) {
	return crypto.createHash("sha256")
    .update(Blockchain.blocks[bl].index.toString())
    .update(Blockchain.blocks[bl].hash)
    .update(Blockchain.blocks[bl].data.toString())
    .update(Blockchain.blocks[bl].timestamp.toString())
	.digest("hex");
}

createBlock();
verifyChain();