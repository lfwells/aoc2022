import * as fs from 'fs';
import * as utils from "./utils.js";

const isPart2 = true;

const input = fs.readFileSync("day20.input").toString();

function mod(n, m) {
    //console.log(typeof(n), n)
    //console.log(typeof(m), m)
    return ((n % m) + m) % m;
  }
let numbers = utils.parseInts(input.split("\n"));

//part 2
let key = isPart2 ? 811589153 : 1;
let repeats = isPart2 ? 10 : 1;

numbers = numbers.map(function(n, i) { return {n:BigInt(n * key)} });



//FAILED LINKED LIST IMPLEMENTATION
/*
numbers.forEach(function(n, i) { 
    n.prev = numbers[mod(i-1, numbers.length)];
    n.next = numbers[mod(i+1, numbers.length)];
});
numbers[numbers.length - 1].next = numbers[0];
numbers[0].prev = numbers[numbers.length - 1];

*/

let zeroIndex = numbers.findIndex(n => n.n==0);


//FAILED POINTERS IMPLEMENTATION
let pointers = [];
let reverseLookup = {};
/*numbers.forEach(function(n,i) { 
    pointers[i] = i; 
    reverseLookup[i] = i; 
});*/
numbers.forEach(function(n,i) { 
    pointers[i] = n; 
    //reverseLookup[i] = i; 
});

//NOT USED
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

    reverseLookup[a] = bIdx;
    reverseLookup[b] = aIdx;

    //console.log({pointers, reverseLookup});
}

function printNumbers() //actually semi hard/annoying to do now lol
{

    let zeroIndexNow = numbers.indexOf(pointers[zeroIndex]);
    console.log({numbers:numbers.map(p=> p.n).join(", "), zeroIndexNow});

    //console.log({numbers:pointers.map(p=> p.n).join(", "), zeroIndexNow});
}


let len = Object.values(pointers).length;
let blen = BigInt(len);
for (var i = 0; i < len * repeats; i++)
{
    console.log({i, of:len * repeats});
    //console.log(i, pointers[i],originalNumbers[i], "\t",numbers.map((n,idx) => idx == pointers[i] ? `${n}*` : n).join(", "));

    //the mod on this line causing issues
    //let read = mod(pointers[mod(i, len)].n, blen);
    let read = pointers[mod(i, len)].n % blen;
    //console.log({read});
    if (read != 0)
    {
        if (read > 0)
        {
            let p = numbers.indexOf(pointers[mod(i, len)]);
            let removed = numbers.splice(p, 1);
            console.log({removed});
            numbers.splice(mod(p+Number(read), len),0,...removed);
            /*
            for (var j = 0; j < mod(read, blen); j++)
            {
                swapIndicies(p, p+1);
                p = p+1;

                //console.log("\t", numbers.map((n,idx) => idx == pointers[i] ? `${n}*` : n).join(", "));
            }*/
        }

        if (read < 0)
        {
            let p = numbers.indexOf(pointers[mod(i, len)]);
            let removed = numbers.splice(p, 1);
            console.log({removed});
            numbers.splice(mod(p-Number(read), len),0,...removed);
            /*
            for (var j = 0; j < mod(read, blen); j++)
            {
                swapIndicies(p, p-1);
                p = p-1;

                //console.log("\t", numbers.map((n,idx) => idx == pointers[i] ? `${n}*` : n).join(", "));
            }*/
        }
    }
    
    if (i % len == 0)
    {
        printNumbers();
    }
    //if (i == 1)break;
}


//FAILED LINKED LIST
/*
function printLinkedList()
{
    let nums = [];
    let p = numbers[zeroIndex];
    do
    {
        nums.push(p.n);
        p = p.next;
    }
    while(p != numbers[zeroIndex]);
    return nums.join(", ");
}
let len = Object.values(numbers).length;
for (var i = 0; i < len * repeats; i++)
{
    console.log({i, of:len * repeats, n:numbers[mod(i, len)].n});
    if (i % len == 0 || !isPart2)
    {
        let zeroIndexNow = numbers[zeroIndex];
    }
    //console.log(i, pointers[i],originalNumbers[i], "\t",numbers.map((n,idx) => idx == pointers[i] ? `${n}*` : n).join(", "));

    
    let pOrig = Object.assign({}, numbers[mod(i, len)]);
    let pCopy = Object.assign({}, numbers[mod(i, len)]);
    
    let pPrev = pOrig.prev;
    let pNext = pOrig.next;
    //console.log({pPrev:pPrev.n, pNext:pNext.n});
    let p = numbers[mod(i, len)];
    let read = p.n;
    if (read != 0)
    {
        if (read > 0)
        {
            for (var j = 0; j < read; j++)
            {
                p = p.next;
            }

            pPrev.next = pNext;
            pNext.prev = pPrev;
            
            var tmp = p.next;
            p.next = pCopy;
            pCopy.prev = p;
            pCopy.next = tmp;
            tmp.prev = pCopy;

        }

        if (read < 0)
        {
            for (var j = 0; j <= -read; j++)
            {
                p = p.prev;
            }

            pPrev.next = pNext;
            pNext.prev = pPrev;

            var tmp = p.prev;
            p.prev = pOrig;
            pOrig.next = p;
            pOrig.prev = tmp;
            tmp.next = pOrig;

        }

    }
    
    console.log({numbers:printLinkedList()});
    //break;
}

let p = numbers[zeroIndex];
for (var i = 0; i < 1000; i++)
{
    p = p.next;
}
let oneThousand = p.n;
for (var i = 0; i < 1000; i++)
{
    p = p.next;
}
let twoThousand = p.n;
for (var i = 0; i < 1000; i++)
{
    p = p.next;
}
let threeThousand = p.n;

console.log({oneThousand, twoThousand, threeThousand, result:oneThousand+twoThousand+threeThousand}); //1196282411522 too low

*/

//ORIGINAL LINKED LIST 
printNumbers();
    
let zeroIndexNow = numbers.indexOf(pointers[zeroIndex]);
let oneThousand = BigInt(numbers[mod(zeroIndexNow+1000, numbers.length)].n);
let twoThousand = BigInt(numbers[mod(zeroIndexNow+2000, numbers.length)].n);
let threeThousand = BigInt(numbers[mod(zeroIndexNow+3000, numbers.length)].n);


console.log({zeroIndexNow,oneThousand, twoThousand, threeThousand, result:oneThousand+twoThousand+threeThousand}); //1196282411522 too low
