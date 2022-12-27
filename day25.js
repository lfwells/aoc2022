import * as fs from 'fs';
import * as utils from "./utils.js";

const input = fs.readFileSync("day25.input").toString();


function digit(d, i)
{
    let five = Math.pow(5,i);
    if (d == "=") return five * -2;
    if (d == "-") return five * -1;
    d = parseInt(d);
    return five * d;
}
let numbers = input.split("\n");
let sum = utils.sum(numbers.map(n => utils.sum(n.split("").reverse().map(digit))));
console.log({sum});
/* //zz
let remainder = 0;
for (var x = 0; x < 100; x++)
{
    let v = 2*Math.pow(5, x);
    if (v > sum) {
        console.log("larger at", x, v); 
        remainder = Math.abs(sum - v);
        break;
    }
}

console.log({remainder});
for (var x = 0; x < 100; x++)
{
    let v = Math.pow(5, x);
    if (v > remainder) {
        console.log("larger at", x, v); 
        remainder = remainder - v;
        break;
    }
}*/

//now reverse the process.. ugh lol
//4890 = 2=-1=0
//         2*whatever -625*2 -125 25 -10 0

//how about add up each column of the original ones?

let finalDigits = [];
let columns = [];
let carryOvers = [];
let finalCarryOver = 0;
let nums = numbers.map(n => n.split("").reverse());
nums.forEach(num => num.forEach((n,i) => {
    if (columns[i] == undefined) columns[i] = [];
    columns[i].push(n);
    if (carryOvers[i] == undefined) carryOvers[i] = 0;
}))
console.log({nums, columns});

columns.forEach((col, i) => {
    console.log("---",i);
    let s = utils.sum(col.map(n => digit(n, i)))
    let sum = s + carryOvers[i];
    console.log({sum,s, carried: carryOvers[i]});
    
    //work out if we tried to represent this by the next column, whats the remainder?
    let nextFive = Math.pow(5,i+1);
    let forNextColumn = Math.floor(sum / nextFive) * nextFive;
    let remainder = sum % nextFive;
    console.log({i, forNextColumn, remainder});

    //work out a digit?
    let thisFive = Math.pow(5,i);
    let division = remainder / thisFive;
    console.log({thisFive, division, remainder});

    //if too many, keep going
    let d = division;
    for (var x = 2; x < d; x++)
    {
        console.log("\tover");
        division -= 1;
        forNextColumn += thisFive;
    }

    finalDigits.push(division);
    console.log({division, forNextColumn});

    if (carryOvers[i+1] != undefined)
    {
        carryOvers[i+1] = forNextColumn;
    }
    else
    {
        finalCarryOver = forNextColumn;
        console.log({finalCarryOver});
    }
});

console.log({part1:finalDigits.reverse()});

//how about make a tree of digits
//this works for sample but not real puzzle because too many digits
/*
let digits = [2,1,0,"=","-"];
function generateChildren(i,n){
    if (i == 10) return [];
    
    let children = [];
    for (var x = 0; x < digits.length; x++)
    {
        let d = digits[x];
        let val = digit(d, i)+n;
        let childNode = {
            d,
            i,
            n: val,
            children: generateChildren(i+1,val)
        }
        children.push(childNode);
    }
    return children;
}
let root = {
    i: 0,
    n: 0,
    children:generateChildren(0, 0)
};
console.log("generated graph... now search");
//console.log({root});

//search the tree for the number?
function searchChildren(node, search)
{
    if (node.n == search) return [];

    for (var i = 0; i < node.children.length; i++)
    {
        let child = node.children[i];
        let result = searchChildren(child,search);
        if (result)
        {
            return [child, ...result];
        }
    }

    return null;
}

let found = searchChildren(root, sum);
console.log({found});
if (found == null)
{
    console.log({part1:"Not found :("});
}
else
{
    let part1 = found.map(node=>node.d).reverse().join("");
    console.log({part1});
}*/