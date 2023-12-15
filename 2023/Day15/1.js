const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day15/input'),
    crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
    line = line.split(',');
    line.forEach(element => {
        let hash = 0;
        for (let index = 0; index < element.length; index++) {
            hash += element.charCodeAt(index);
            hash *= 17;
            hash %= 256;
        }
        sum += hash;
    });
});
rl.on('close', () => console.log(sum));
