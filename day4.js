import * as fs from 'fs';

const input = fs.readFileSync("day4.input").toString();


function generateSet(elf)
{
    var range = elf.split("-");
    var a = [];
    for (var i = parseInt(range[0]); i <= parseInt(range[1]); i++)
        a.push(i);
        
    return new Set(a);
}

let pairs = input.split("\n").map(p => p.split(",").map(generateSet));
console.log(pairs);

//part 1
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function isSuperset(set, subset) {
    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }


var result = pairs.map(pair => isSuperset(pair[0], pair[1]) || isSuperset(pair[1], pair[0])).reduce((prev, current) => prev + (current ? 1 : 0));
console.log(result);

//part 2
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
var result2 = pairs.map(pair => intersection(pair[0], pair[1]).size > 0).reduce((prev, current) => prev + (current ? 1 : 0));
console.log(result2);