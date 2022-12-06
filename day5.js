let isPart2 = true;

import * as fs from 'fs';

const input = fs.readFileSync("day5.input").toString();

let split = input.split("\n\n");
let stacksInput = split[0].split("\n");
let movesInput = split[1].split("\n");

let stacks = {};
stacksInput.forEach(line => {
    let chunks = chunkSubstr(line, 4);
    chunks.forEach((chunk, stackIndex) => {
        if (chunk.includes("["))
        {
            let stack = stackIndex+1;
            let letter = chunk.substr(1,1);

            if (stacks[stack] == undefined) stacks[stack] = [];
            stacks[stack].push(letter);
        }
    });
});

//Object.values(stacks).forEach(s => s.reverse);
console.log(stacks);

movesInput.forEach(move => {
    let words = move.split(" ");
    let count = words[1];
    let source = words[3];
    let destination = words[5];
    console.log({count, source, destination});

    let pickedUp = [];
    for (var i = 0; i < count; i++)
    {
        let item = stacks[source].shift();
        console.log({item, source: stacks[source]});

        if (isPart2 == false)
        {
            stacks[destination].unshift(item);
            console.log({item, destination: stacks[destination]});
        }
        else
        {
            pickedUp.push(item);
        }
    }

    if (isPart2)
    {
        stacks[destination] = pickedUp.concat(stacks[destination]);
        console.log({pickedUp, destination: stacks[destination]});
    }
});


console.log(Object.values(stacks).map(s => s[0]).join(""));

//https://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
function chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)
  
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
    }
  
    return chunks
  }
