const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day1/input'),
    crlfDelay: Infinity,
  });

  let cal = 0;
  let max = 0;
  let max2 = 0;
  let max3 = 0;
  rl.on('line', (line) => {
    if (line != '') cal += parseInt(line);
    else {
        if (cal > max3) {
            if (cal > max2) {
                max3 = max2;
                if (cal > max) {
                    max2 = max;
                    max = cal;
                }
                else max2 = cal;
            }
            else max3 = cal;
        }
        cal = 0;
    }
  });
  rl.on('close', () => console.log(max + max2 + max3));
