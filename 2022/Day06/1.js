const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day06/input'),
  crlfDelay: Infinity,
});

let pos;
rl.on('line', (line) => {
    let advance = 0;
    for (let index = 1; index < line.length; index++) {
        let chars = line.substring(index-4, index);
        if (chars.length < 4) chars = chars.charAt(chars.length-1).repeat(4-chars.length) + chars;
        if (chars.lastIndexOf(chars.charAt(chars.length-1), chars.length-2) != -1 && advance < chars.lastIndexOf(chars.charAt(chars.length-1), chars.length-2)+1) advance = chars.lastIndexOf(chars.charAt(chars.length-1), chars.length-2)+1;
        if (advance === 0) {
            pos = index;
            index = line.length;
        }
        advance--;
    }
});
rl.on('close', () => console.log(pos));
