const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day01/input'),
    crlfDelay: Infinity,
  });

  let cal = 0;
  let max = 0;
  rl.on('line', (line) => {
    if (line != '') cal += parseInt(line);
    else {
        if (cal > max) max = cal;
        cal = 0;
    }
  });
  rl.on('close', () => console.log(max));
