const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day15/input'),
    crlfDelay: Infinity,
});

const y = 2000000;
let positions = [];
rl.on('line', (line) => {
    line = line.match(/\-?\d+/g);
    for (let index = 0; index < line.length; index++) {
        line[index] = parseInt(line[index]);
    }
    positions.push(line);

});
rl.on('close', () => {
    let row = new Set();
    let beacons = new Set();
    positions.forEach(element => {
        const distance = Math.abs(element[0] - element[2]) + Math.abs(element[1] - element[3]);
        if (element[3] === y) {
            row.add(element[2]);
            beacons.add(element[2]);
        };
        if (Math.sign(element[1] - y) != Math.sign(element[1] + distance - y) || Math.sign(element[1] - y) != Math.sign(element[1] - distance - y)) {
            for (let index = 0; index <= distance - Math.abs(element[1] - y); index++) {
                row.add(element[0] + index);
                row.add(element[0] - index);
            }
        }
    });
    console.log(row.size - beacons.size);
});
