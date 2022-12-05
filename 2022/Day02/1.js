const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day02/input'),
    crlfDelay: Infinity,
});

let points = 0;
rl.on('line', (line) => {
    let shape = line.split(' ');
    for (let index = 0; index < shape.length; index++) {
        switch (shape[index]) {
            case 'A':
            case 'X':
                shape[index] = 1;
                break;
        
            case 'B':
            case 'Y':
                shape[index] = 2;
                break;
    
            case 'C':
            case 'Z':
                shape[index] = 3;
        }
    }
    points += shape[1];
    if (shape[0] === shape[1]) points += 3;
    else if (shape[1] - shape[0] === 1 || shape[1] - shape[0] === -2) points += 6;
});
rl.on('close', () => console.log(points));
