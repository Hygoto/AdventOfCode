const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2023/Day05/input'),
  crlfDelay: Infinity,
});

let ranges;
let tmpranges = [];
rl.on('line', (line) => {
  let num;
  if (ranges == undefined) {
    ranges = line.match(/\d+/g);
    for (let index = 0; index < ranges.length; index++) {
      ranges[index] = [parseInt(ranges[index]), parseInt(ranges[index+1])];
      ranges.splice(index + 1, 1);
    }
}
  else if ((num = line.match(/\d+/g)) != null) {
    num[0] = parseInt(num[0]);
    num[1] = parseInt(num[1]);
    num[2] = parseInt(num[2]);
    for (let index = 0; index < ranges.length; index++) {
      if (ranges[index][0] >= num[1] && (ranges[index][0] + ranges[index][1]-1) <= (num[1] + num[2]-1)) {
        tmpranges.push([num[0] + ranges[index][0] - num[1], ranges[index][1]]);
        ranges.splice(index, 1);
        index--;
      }
      else if (num[1] > ranges[index][0] && (num[1] + num[2]-1) < (ranges[index][0] + ranges[index][1]-1)) {
        tmpranges.push([num[0], num[2]]);
        ranges.splice(index + 1, 0, [ranges[index][0], num[1] - ranges[index][0]]);
        ranges[index] = [num[1] + num[2], (ranges[index][0] + ranges[index][1]) - (num[1] + num[2])];
        index++;
      }
      else if (!(ranges[index][0] >= num[1] && ranges[index][0] <= (num[1] + num[2]-1)) && ((ranges[index][0] + ranges[index][1]-1) >= num[1] && (ranges[index][0] + ranges[index][1]-1) <= (num[1] + num[2]-1))) {
        tmpranges.push([num[0], ranges[index][1] - (num[1] - ranges[index][0])]);
        ranges[index] = ([ranges[index][0], ranges[index][1] - tmpranges[tmpranges.length-1][1]]);
      }
      else if ((ranges[index][0] >= num[1] && ranges[index][0] <= (num[1] + num[2]-1)) && !((ranges[index][0] + ranges[index][1]-1) >= num[1] && (ranges[index][0] + ranges[index][1]-1) <= (num[1] + num[2]-1))) {
        tmpranges.push([num[0] + ranges[index][0] - num[1], num[2] - (ranges[index][0] - num[1])]);
        ranges[index] = ([num[1] + num[2], ranges[index][1] - tmpranges[tmpranges.length-1][1]]);
      }
    }
  }
  else {
    ranges = ranges.concat(tmpranges);
    tmpranges = [];
    if (line.length == 0) {
      for (let index = 0; index < ranges.length; index++) {
        for (let index1 = index + 1; index1 < ranges.length; index1++) {
          if (ranges[index][0] == ranges[index1][0] && ranges[index][1] == ranges[index1][1] && index != index1) {
            if (index > index1) {
              ranges.splice(index, 1);
              index --;
              break;
            }
            else {
              ranges.splice(index1, 1);
              index1--;
            }
          }
          else if (ranges[index][0] <= ranges[index1][0] && ranges[index][0] + ranges[index][1] >= ranges[index1][0] && index != index1) {
            ranges.push([ranges[index][0], ranges[index1][0] + ranges[index1][1] - ranges[index][0]]);
            ranges.splice(index, 1);
            if (index1 > index) index1--;
            index--;
            ranges.splice(index1, 1);
            if (index > index1) index--;
            index1--;
            break;
          }
          else if (ranges[index1][0] <= ranges[index][0] && ranges[index1][0] + ranges[index1][1] >= ranges[index][0] && index != index1) {
            ranges.push([ranges[index1][0], ranges[index][0] + ranges[index][1] - ranges[index1][0]]);
            ranges.splice(index, 1);
            if (index1 > index) index1--;
            index--;
            ranges.splice(index1, 1);
            if (index > index1) index--;
            index1--;
            break;
          }
        }
      }
    }
  }
});
rl.on('close', () => {
  ranges = ranges.concat(tmpranges);
  ranges.sort(compareNumbers);
  console.log(ranges[0][0]);
});

function compareNumbers(a, b) {
  return a[0] - b[0];
}
