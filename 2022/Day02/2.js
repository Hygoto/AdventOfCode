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
                shape[index] = 0;
                break;
        
            case 'B':
            case 'Y':
                shape[index] = 3;
                break;
    
            case 'C':
            case 'Z':
                shape[index] = 6;
        }
    }
    points += shape[1];
    shape[1] = shape[1] / 3 - 1;
    shape[0] = shape[0] / 3 + 1;
    shape[1] += shape[0];
    if (shape[1] == 0) shape[1] = 3;
    else if (shape[1] == 4) shape[1] = 1;
    points += shape[1];
  });
  rl.on('close', () => console.log(points));
