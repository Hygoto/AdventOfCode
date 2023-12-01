const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day01/input'),
  crlfDelay: Infinity,
});

const numbers = {'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9};
let sum = 0;
rl.on('line', (line) => {
  let a = line.match(/\d|(zero)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g);
  let b = line.split("").reverse().join("").match(/\d|(orez)|(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)/g);
  if (!(a[0] >= 0)) a[0] = numbers[a[0]];
  if (!(b[0] >= 0)) b[0] = numbers[b[0].split("").reverse().join("")];
  console.log(b[0]);
  sum += parseInt(`${a[0]}` + `${b[0]}`);
});
rl.on('close', () => console.log(sum));
