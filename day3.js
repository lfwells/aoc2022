import * as fs from 'fs';

const input = fs.readFileSync("day3.input").toString();

let bags = input.split("\n").map(str => str.split('')).map(b => [new Set(b.slice(0, b.length/2)), new Set(b.slice(-b.length/2)) ]);

//for part 2
let fullBags = input.split("\n").map(str => str.split('')).map(b => new Set(b));

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function intersection(setA, setB) {
    const _intersection = new Set();
    for (const elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }

  function itemValue(c)
  {
    var code = c-"a".charCodeAt()+1;
    if (code < 0)
        code = c-"A".charCodeAt()+1+26;
    return code;
  }

let items = bags.map(b => intersection(b[0], b[1]));
console.log(items);

//part 1
let values = items.map(function(set) {
    var c = Array.from(set.values())[0].charCodeAt();
    return itemValue(c);
});

console.log(values.reduce((prev,curr) => prev+curr));

//part 2
let groups = [];
fullBags.forEach(function (v, index) {
  let groupIndex = Math.floor(index/3);
  if (groups[groupIndex] == undefined) groups[groupIndex] = [];
  groups[groupIndex].push(v); 
});

let items2 = groups.map(g => intersection(g[0], intersection(g[1], g[2])));
let values2 = items2.map(function(set) {
  var c = Array.from(set.values())[0].charCodeAt();
  return itemValue(c);
});
console.log(values2.reduce((prev,curr) => prev+curr));