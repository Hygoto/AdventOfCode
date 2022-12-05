const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day05/input'),
    crlfDelay: Infinity,
});

let mapped = false;
let lines = [];
let map;
rl.on('line', (line) => {
    if (!mapped && line.charAt(1) != '1') lines.push(line);
    else if (line.charAt(1) === '1') {
        mapped = true;
        map = {};
        lines.push(parseInt(line.charAt(line.length-2)));
        for (let index = 0; index < lines[lines.length-1]; index++) {
            map[`${line.charAt((index)*4+1)}`] = [];
        }
        lines = lines.reverse();
        lines.forEach(element => {
            if (element != lines[0]) {
                for (let index = 1; index <= lines[0]; index++) {
                    if (element.charAt((index-1)*4+1) != ' ') map[`${index}`].push(element.charAt((index-1)*4+1));
                }
            }
        });
    }
    else if (line != '') {
        instruction = line.split(' ');
        for (let index = 0; index < instruction[1]; index++) {
            map[`${instruction[5]}`].push(map[`${instruction[3]}`][map[`${instruction[3]}`].length-1]);
            map[`${instruction[3]}`] = map[`${instruction[3]}`].slice(0, -1);
        }
    }
});
rl.on('close', () => {
    let answer = '';
    for (let index = 1; index <= lines[0]; index++) {
        answer += map[`${index}`][map[`${index}`].length-1];
    }
    console.log(answer);
});
