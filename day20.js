import { reverse } from 'dns';
import * as fs from 'fs';
import * as utils from "./utils.js";

const isPart2 = true;

const input = fs.readFileSync("day20.input").toString();

function mod(n, m) {
    return ((n % m) + m) % m;
  }
let numbers = utils.parseInts(input.split("\n"));

//part 2
let key = 811589153;
let repeats = isPart2 ? 10 : 1;
if (isPart2) numbers = numbers.map(n => BigInt(n * key));

let zeroIndex = numbers.findIndex(n => n==0);
//console.log({numbers:numbers.join(", "), zeroIndex});

//for (var i = -20; i < 20; i++)
//console.log({i, m:mod(i, numbers.length)});

let pointers = {};
let reverseLookup = {};
numbers.forEach(function(n,i) { 
    pointers[i] = i; 
    reverseLookup[i] = i; 
});

function swapIndicies(a,b)
{
    a = mod(a,numbers.length);
    b = mod(b,numbers.length);

    var tmp = numbers[a];
    numbers[a] = numbers[b];
    numbers[b] = tmp;

    //WRONG
    //pointers[a] = b;
    //pointers[b] = a;

    //SLOW
    //let aIdx = Object.entries(pointers).filter((v,i) => v[1] == a)[0][0];
    //let bIdx = Object.entries(pointers).filter((v,i) => v[1] == b)[0][0];
    let aIdx = reverseLookup[a];
    let bIdx = reverseLookup[b];
    //console.log({pointers, reverseLookup,aIdx,bIdx});
    pointers[aIdx] = b;
    pointers[bIdx] = a;
    /*aIdx = Object.entries(pointers).filter((v,i) => v[1] == a)[0][0];
    bIdx = Object.entries(pointers).filter((v,i) => v[1] == b)[0][0];
    console.log({pointers});
    console.log({aIdx});
    console.log({bIdx});*/

    reverseLookup[a] = bIdx;
    reverseLookup[b] = aIdx;

    //console.log({pointers, reverseLookup});
}

let len = Object.values(pointers).length;
for (var i = 0; i < len * repeats; i++)
{
    console.log({i, of:len * repeats});
    if (i % len == 0)
    {
        let zeroIndexNow = pointers[zeroIndex];
        console.log({numbers:numbers.join(", "), zeroIndexNow});
    }
    //console.log(i, pointers[i],originalNumbers[i], "\t",numbers.map((n,idx) => idx == pointers[i] ? `${n}*` : n).join(", "));

    let read = numbers[pointers[mod(i, len)]];
    if (read != 0)
    {
        if (read > 0)
        {
            let p = pointers[mod(i, len)];
            for (var j = 0; j < read; j++)
            {
                swapIndicies(p, p+1);
                p = p+1;

                //console.log("\t", numbers.map((n,idx) => idx == pointers[i] ? `${n}*` : n).join(", "));
            }
        }

        if (read < 0)
        {
            let p = pointers[mod(i, len)];
            for (var j = 0; j < -read; j++)
            {
                swapIndicies(p, p-1);
                p = p-1;

                //console.log("\t", numbers.map((n,idx) => idx == pointers[i] ? `${n}*` : n).join(", "));
            }
        }
    }
    //break;
}


let zeroIndexNow = pointers[zeroIndex];
let oneThousand = BigInt(numbers[mod(zeroIndexNow+1000, numbers.length)]);
let twoThousand = BigInt(numbers[mod(zeroIndexNow+2000, numbers.length)]);
let threeThousand = BigInt(numbers[mod(zeroIndexNow+3000, numbers.length)]);

console.log({oneThousand, twoThousand, threeThousand, result:oneThousand+twoThousand+threeThousand}); //1196282411522 too low

