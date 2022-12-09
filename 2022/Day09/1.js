const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day09/input'),
  crlfDelay: Infinity,
});

let head = [0, 0];
let tail = [0, 0];
let positions = new Set();
positions.add('0,0');
rl.on('line', (line) => {
    let move = line.split(' ');
    move[1] = parseInt(move[1]);
    switch (move[0]) {
        
        case 'U':
            move[0] = 0;
            break;
            
        case 'D':
            move[0] = 0;
            move[1] = -move[1];
            break;

        case 'R':
            move[0] = 1;
            break;
            
        case 'L':
            move[0] = 1;
            move[1] = -move[1]
            break;
    }
    head[move[0]] += move[1];
    dragTail(move);
});

function dragTail(move) {
    if (Math.abs(tail[move[0]]-head[move[0]]) > 1) {
        if (tail[1-move[0]] != head[1-move[0]]) tail[1-move[0]] = head[1-move[0]];
        const oldTail = tail[move[0]];
        tail[move[0]] += head[move[0]]-tail[move[0]]+Math.sign(tail[move[0]]-head[move[0]]);
        positions.add(`${tail[0]},${tail[1]}`);
        if (move[0] === 0) {
            for (let index = oldTail+Math.sign(tail[0]-oldTail); index != tail[0]; index += Math.sign(tail[0]-oldTail)) {
                positions.add(`${index},${tail[1]}`);
            }
        }
        else {
            for (let index = oldTail+Math.sign(tail[1]-oldTail); index != tail[1]; index += Math.sign(tail[1]-oldTail)) {
                positions.add(`${tail[0]},${index}`);
            }
        }
    }
    
}

rl.on('close', () => console.log(positions.size));
