import * as fs from 'fs';

const input = fs.readFileSync("day13.input").toString();

let pairs = input.split("\n\n").map(pair => pair.split("\n").map(line => eval(line)));
console.log(pairs);

function isArray(node)
{
    return Array.isArray(node);
}

let levelsIn = 0;
function indent()
{
    var result = "";
    for (var i = 0; i < levelsIn; i++)
    {
        result += "  ";
    }
    return result;
}
function compare(left,right)
{
    console.log(`${indent()} - Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}` );
    if (!isArray(left) && !isArray(right))
    {
        return Math.sign(right-left);
    }

    if (!isArray(left))
    {
        left = [left];
        return compare(left,right);
    }
    if (!isArray(right))
    {
        right = [right];
        return compare(left,right);
    }

    let i = 0;
    while (i < left.length && i < right.length)
    {
        levelsIn++;
        let result = compare(left[i], right[i]);
        levelsIn--;
        if (result == 0) {i++;continue;}
        else return result;
    }
    if (left.length < right.length) return 1;
    if (right.length < left.length) return -1;
    else return 0;
}

let rightOrderPairs = pairs.map(function(pair, index) { 
        console.log(`\n\n== Pair ${index+1} ==`);
        levelsIn = 0;  
        return { index:index+1, result:compare(...pair) == 1}; 
    })
    .filter(pair => pair.result);
console.log({part1:rightOrderPairs.map(pair => pair.index).reduce((prev,curr) => prev+curr)});

//part 2
let allPackets = input.split("\n").filter(line => line.length > 0).map(line => eval(line));
allPackets.push([[2]]);
allPackets.push([[6]]);

allPackets.sort(compare).reverse();
let dividerOne = allPackets.findIndex(p => p.length == 1 && p[0].length == 1 && p[0][0] == 2) +1;
let dividerTwo = allPackets.findIndex(p => p.length == 1 && p[0].length == 1 && p[0][0] == 6) +1;
console.log({allPackets, dividerOne, dividerTwo, part2:dividerOne * dividerTwo});