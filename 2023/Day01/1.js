const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day01/input'),
  crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
     let a = line.match(/\d/g);
     sum += parseInt(`${a[0]}` + `${a[a.length - 1]}`);
});
rl.on('close', () => console.log(sum));
