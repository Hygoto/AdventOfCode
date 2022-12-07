const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day07/input'),
  crlfDelay: Infinity,
});

let current = [];
let dirsize = {'/': 0};
rl.on('line', (line) => {
    const input = line.split(' ');
    if (input[0] === '$') {
        if ( input[1] === 'cd') {
            if (input[2] === '..') current.splice(current.length-1, 1);
            else current.push(input[2]);
        }
    }
    else if (input[0] === 'dir') {
        dirsize[findPath(current, input[1])] = 0;
    }
    else {
        for (let index = 0; index < current.length; index++) {
            let path = findPath(current.slice(0, current.length-index));
            if (path === '') path = '/';
            dirsize[path] += parseInt(input[0]);
            
        }
    }
});

function findPath(dirs, dir) {
    let path = '';
    dirs.forEach(element => {
        if (element != '/') path += '/' + element;
    });
    if (dir != undefined) path += '/' + dir;
    return path;
}

rl.on('close', () => {
    let total = 0;
    Object.values(dirsize).forEach(element => {
        if (element <= 100000) total += element;
    });
    console.log(total);
});
