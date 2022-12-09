const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day09/input'),
  crlfDelay: Infinity,
});

let rope = Array(10);
for (let index = 0; index < rope.length; index++) {
    rope[index] = [0, 0];
}
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
    for (let index = Math.sign(move[1]); index != move[1]+Math.sign(move[1]); index += Math.sign(move[1])) {
        rope[0][move[0]] += Math.sign(move[1]);
        dragTail(1);
    }
});

function dragTail(knot) {
    let head = rope[knot-1];
    let tail = rope[knot];
    let move = 0;
    if (Math.abs(head[1]-tail[1]) > 1) move = 1;
    if (Math.abs(tail[move]-head[move]) > 1) {
        if (tail[1-move] != head[1-move]) {
            tail[1-move] += Math.sign(head[1-move]-tail[1-move]);
        }
        tail[move] += Math.sign(head[move]-tail[move]);
        if (knot === 9) positions.add(`${tail[0]},${tail[1]}`);
        rope[knot-1] = head;
        rope[knot] = tail;
        if (knot != 9) dragTail(knot+1);
    }  
}

rl.on('close', () => console.log(positions.size));
