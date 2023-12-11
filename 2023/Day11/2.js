const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day11/input'),
    crlfDelay: Infinity,
});

let xExpand = [];
let yExpand = [];
let map = [];
let row = 0;
rl.on('line', (line) => {
    if (!line.includes('#')) xExpand.push(row);
    map.push(line.split(''));
    row++;
});
rl.on('close', () => {
    for (let index = 0; index < map[0].length; index++) {
        let galaxy = false;
        map.forEach(element => {
            if (element[index] == '#') galaxy = true;
        });
        if (!galaxy) {
            yExpand.push(index);
        }
    }
    let galaxies = [];
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] == '#') {
                let expanded = [null, null];
                for (let index = 0; index < xExpand.length; index++) {
                    if (expanded[0] == null && xExpand[index] > x) expanded[0] = index;
                }
                if (expanded[0] == null) expanded[0] = xExpand.length;
                for (let index = 0; index < yExpand.length; index++) {
                    if (expanded[1] == null && yExpand[index] > y) expanded[1] = index;
                }
                if (expanded[1] == null) expanded[1] = yExpand.length;
                galaxies.push([x+(expanded[0]*(1000000-1)), y+(expanded[1]*(1000000-1))]);
            }
        }
    }
    let sum = 0;
    for (let index = 0; index < galaxies.length; index++) {
        for (let index1 = index; index1 < galaxies.length; index1++) {
            sum += Math.abs(galaxies[index][0] - galaxies[index1][0]) + Math.abs(galaxies[index][1] - galaxies[index1][1]);
        }
    }
    console.log(sum);
});

