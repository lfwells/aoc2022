import * as fs from 'fs';

const input = fs.readFileSync("day1.input").toString();

let elves = input.split("\n\n").map(e => e.split("\n").map(n => parseInt(n)).reduce((prev,curr) => prev+curr)).sort((a,b) => b-a);
console.log(elves);

//part 1:
console.log(elves[0]);

//part 2:
console.log(elves[0]+elves[1]+elves[2]);