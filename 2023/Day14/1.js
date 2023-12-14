const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day14/input'),
    crlfDelay: Infinity,
});

let rocks = [];
rl.on('line', (line) => {
    rocks.push(line.split(''));
});
rl.on('close', () => {
    let sum = 0;
    for (let y = 0; y < rocks.length; y++) {
        for (let x = 0; x < rocks[0].length; x++) {
            if (rocks[y][x] == 'O') {
                let distance = 1;
                while (y - distance >= 0 && rocks[y-distance][x] == '.') {
                    distance++;
                }
                rocks[y][x] = '.';
                rocks[y-(distance-1)][x] = 'O';
                sum += rocks.length - (y - (distance - 1));
            }
        }
    }
    console.log(sum)
});
