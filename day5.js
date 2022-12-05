let isPart2 = true;

const input = `                [V]     [C]     [M]
[V]     [J]     [N]     [H]     [V]
[R] [F] [N]     [W]     [Z]     [N]
[H] [R] [D]     [Q] [M] [L]     [B]
[B] [C] [H] [V] [R] [C] [G]     [R]
[G] [G] [F] [S] [D] [H] [B] [R] [S]
[D] [N] [S] [D] [H] [G] [J] [J] [G]
[W] [J] [L] [J] [S] [P] [F] [S] [L]
 1   2   3   4   5   6   7   8   9 

move 2 from 2 to 7
move 8 from 5 to 6
move 2 from 4 to 5
move 1 from 4 to 5
move 1 from 5 to 8
move 5 from 9 to 2
move 7 from 1 to 6
move 7 from 3 to 8
move 1 from 4 to 6
move 2 from 5 to 6
move 6 from 7 to 5
move 2 from 2 to 4
move 4 from 5 to 2
move 10 from 8 to 1
move 2 from 7 to 4
move 4 from 2 to 8
move 2 from 9 to 8
move 1 from 8 to 4
move 2 from 4 to 9
move 5 from 8 to 2
move 1 from 4 to 6
move 1 from 8 to 9
move 1 from 7 to 2
move 2 from 4 to 2
move 1 from 7 to 3
move 13 from 2 to 1
move 1 from 2 to 4
move 1 from 2 to 3
move 2 from 5 to 4
move 17 from 6 to 4
move 3 from 4 to 9
move 14 from 1 to 4
move 4 from 6 to 8
move 1 from 9 to 8
move 23 from 4 to 8
move 6 from 1 to 7
move 3 from 1 to 5
move 1 from 3 to 8
move 5 from 7 to 8
move 1 from 3 to 4
move 1 from 5 to 3
move 1 from 5 to 1
move 1 from 3 to 2
move 1 from 9 to 4
move 9 from 4 to 9
move 1 from 1 to 2
move 11 from 8 to 2
move 1 from 4 to 5
move 13 from 2 to 3
move 7 from 9 to 6
move 1 from 5 to 6
move 1 from 5 to 2
move 1 from 9 to 4
move 1 from 4 to 9
move 2 from 8 to 9
move 1 from 7 to 8
move 8 from 9 to 1
move 8 from 1 to 4
move 4 from 6 to 7
move 1 from 9 to 4
move 2 from 3 to 9
move 1 from 9 to 1
move 6 from 4 to 1
move 2 from 1 to 3
move 22 from 8 to 6
move 1 from 2 to 5
move 3 from 7 to 8
move 15 from 6 to 4
move 7 from 3 to 7
move 4 from 6 to 9
move 2 from 9 to 2
move 6 from 3 to 5
move 3 from 9 to 5
move 5 from 5 to 8
move 1 from 2 to 1
move 6 from 8 to 2
move 1 from 1 to 2
move 3 from 5 to 3
move 1 from 7 to 2
move 4 from 7 to 8
move 4 from 6 to 1
move 1 from 5 to 1
move 4 from 8 to 7
move 2 from 3 to 2
move 1 from 1 to 3
move 15 from 4 to 2
move 3 from 7 to 3
move 4 from 7 to 2
move 1 from 4 to 9
move 5 from 3 to 8
move 29 from 2 to 1
move 1 from 9 to 5
move 1 from 2 to 1
move 11 from 1 to 5
move 1 from 4 to 5
move 2 from 6 to 3
move 1 from 3 to 4
move 16 from 1 to 9
move 4 from 8 to 4
move 3 from 6 to 9
move 1 from 3 to 7
move 1 from 7 to 3
move 6 from 1 to 6
move 3 from 4 to 3
move 3 from 8 to 5
move 3 from 1 to 8
move 3 from 1 to 4
move 2 from 4 to 9
move 3 from 6 to 3
move 15 from 5 to 2
move 3 from 2 to 3
move 4 from 2 to 7
move 2 from 5 to 9
move 10 from 3 to 6
move 11 from 9 to 5
move 2 from 4 to 9
move 8 from 9 to 4
move 1 from 9 to 6
move 7 from 4 to 6
move 3 from 5 to 8
move 22 from 6 to 9
move 4 from 7 to 8
move 8 from 5 to 8
move 2 from 4 to 3
move 1 from 8 to 1
move 17 from 8 to 3
move 3 from 3 to 4
move 13 from 3 to 9
move 20 from 9 to 7
move 2 from 2 to 9
move 19 from 9 to 5
move 1 from 1 to 4
move 3 from 2 to 7
move 4 from 4 to 3
move 1 from 9 to 8
move 18 from 5 to 1
move 1 from 9 to 4
move 1 from 9 to 7
move 2 from 4 to 8
move 1 from 5 to 4
move 3 from 2 to 7
move 3 from 3 to 1
move 2 from 1 to 3
move 3 from 3 to 8
move 1 from 4 to 8
move 6 from 8 to 2
move 1 from 3 to 9
move 1 from 3 to 9
move 10 from 1 to 9
move 7 from 1 to 7
move 4 from 7 to 4
move 29 from 7 to 3
move 6 from 2 to 9
move 25 from 3 to 6
move 5 from 3 to 9
move 13 from 6 to 9
move 12 from 6 to 2
move 1 from 8 to 9
move 10 from 2 to 6
move 7 from 6 to 5
move 20 from 9 to 3
move 11 from 3 to 6
move 1 from 7 to 9
move 2 from 2 to 9
move 19 from 9 to 2
move 14 from 6 to 8
move 4 from 5 to 2
move 2 from 4 to 6
move 3 from 5 to 1
move 13 from 8 to 5
move 1 from 6 to 1
move 2 from 4 to 2
move 8 from 2 to 4
move 6 from 4 to 7
move 1 from 9 to 8
move 2 from 4 to 7
move 5 from 2 to 4
move 4 from 4 to 2
move 10 from 5 to 6
move 1 from 1 to 7
move 1 from 5 to 4
move 1 from 4 to 9
move 4 from 7 to 8
move 5 from 1 to 7
move 1 from 9 to 7
move 7 from 3 to 2
move 2 from 5 to 2
move 8 from 6 to 9
move 1 from 4 to 6
move 3 from 7 to 4
move 5 from 9 to 7
move 2 from 4 to 3
move 20 from 2 to 4
move 2 from 4 to 8
move 14 from 4 to 2
move 12 from 7 to 4
move 8 from 2 to 1
move 10 from 2 to 4
move 6 from 8 to 5
move 1 from 7 to 8
move 4 from 4 to 3
move 1 from 3 to 9
move 1 from 2 to 7
move 1 from 6 to 8
move 5 from 3 to 5
move 1 from 3 to 2
move 7 from 4 to 5
move 6 from 1 to 7
move 5 from 7 to 6
move 1 from 6 to 5
move 2 from 7 to 8
move 1 from 2 to 6
move 2 from 8 to 2
move 5 from 5 to 7
move 6 from 6 to 8
move 16 from 4 to 9
move 16 from 9 to 4
move 11 from 5 to 4
move 5 from 8 to 3
move 2 from 5 to 2
move 14 from 4 to 2
move 1 from 6 to 3
move 1 from 6 to 9
move 1 from 5 to 3
move 3 from 8 to 2
move 10 from 4 to 7
move 5 from 9 to 2
move 3 from 4 to 7
move 1 from 1 to 4
move 3 from 2 to 5
move 2 from 3 to 7
move 1 from 4 to 2
move 18 from 2 to 8
move 3 from 8 to 4
move 5 from 3 to 1
move 1 from 3 to 9
move 1 from 9 to 3
move 8 from 8 to 7
move 2 from 5 to 4
move 1 from 5 to 6
move 1 from 2 to 5
move 1 from 5 to 8
move 1 from 6 to 9
move 3 from 2 to 7
move 27 from 7 to 4
move 2 from 2 to 4
move 4 from 8 to 4
move 1 from 9 to 8
move 3 from 1 to 6
move 1 from 3 to 5
move 3 from 8 to 3
move 1 from 1 to 4
move 1 from 8 to 1
move 3 from 1 to 4
move 2 from 8 to 2
move 2 from 6 to 2
move 8 from 4 to 9
move 1 from 7 to 1
move 1 from 5 to 4
move 1 from 7 to 3
move 4 from 2 to 7
move 1 from 8 to 6
move 8 from 9 to 7
move 1 from 6 to 3
move 3 from 3 to 4
move 37 from 4 to 1
move 1 from 4 to 5
move 13 from 7 to 8
move 6 from 8 to 4
move 5 from 8 to 3
move 1 from 7 to 6
move 4 from 1 to 5
move 1 from 6 to 5
move 2 from 8 to 4
move 32 from 1 to 5
move 1 from 1 to 4
move 5 from 3 to 5
move 1 from 3 to 2
move 1 from 2 to 9
move 19 from 5 to 2
move 1 from 9 to 1
move 16 from 5 to 1
move 7 from 5 to 6
move 1 from 3 to 1
move 11 from 1 to 2
move 18 from 2 to 4
move 1 from 5 to 9
move 8 from 6 to 1
move 10 from 2 to 6
move 7 from 4 to 9
move 2 from 2 to 1
move 7 from 4 to 2
move 5 from 4 to 5
move 2 from 9 to 6
move 9 from 6 to 3
move 5 from 5 to 3
move 8 from 4 to 9
move 7 from 9 to 8
move 4 from 2 to 9
move 10 from 3 to 1
move 6 from 8 to 1
move 2 from 6 to 3
move 5 from 3 to 8
move 3 from 2 to 7
move 1 from 9 to 5
move 1 from 3 to 5
move 2 from 7 to 8
move 1 from 8 to 9
move 1 from 6 to 1
move 23 from 1 to 4
move 2 from 5 to 3
move 1 from 8 to 2
move 2 from 8 to 5
move 2 from 5 to 6
move 1 from 2 to 7
move 1 from 7 to 5
move 4 from 9 to 7
move 1 from 7 to 5
move 1 from 3 to 6
move 3 from 7 to 4
move 1 from 3 to 8
move 1 from 4 to 6
move 6 from 1 to 8
move 4 from 6 to 4
move 2 from 9 to 1
move 1 from 5 to 1
move 19 from 4 to 2
move 2 from 9 to 3
move 1 from 9 to 3
move 9 from 1 to 8
move 1 from 5 to 8
move 1 from 9 to 3
move 2 from 3 to 9
move 3 from 8 to 4
move 1 from 4 to 9
move 1 from 9 to 5
move 2 from 3 to 4
move 6 from 4 to 7
move 3 from 9 to 5
move 4 from 4 to 7
move 1 from 5 to 6
move 18 from 2 to 7
move 13 from 7 to 9
move 3 from 5 to 1
move 1 from 2 to 1
move 1 from 6 to 5
move 3 from 1 to 7
move 1 from 1 to 5
move 7 from 9 to 6
move 8 from 7 to 4
move 11 from 7 to 6
move 5 from 9 to 2
move 17 from 6 to 1
move 2 from 5 to 1
move 11 from 8 to 1
move 20 from 1 to 2
move 3 from 8 to 1
move 1 from 9 to 8
move 1 from 6 to 1
move 11 from 1 to 7
move 18 from 2 to 3
move 12 from 4 to 8
move 11 from 7 to 3
move 7 from 2 to 3
move 2 from 1 to 5
move 1 from 1 to 3
move 1 from 8 to 1
move 1 from 5 to 9
move 1 from 9 to 6
move 1 from 8 to 7
move 1 from 5 to 3
move 1 from 6 to 7
move 2 from 8 to 1
move 8 from 3 to 2
move 7 from 2 to 9
move 6 from 8 to 6
move 1 from 9 to 3
move 2 from 6 to 4
move 5 from 9 to 6
move 7 from 6 to 2
move 8 from 2 to 9
move 2 from 1 to 9
move 2 from 7 to 2
move 2 from 4 to 8
move 1 from 2 to 7
move 25 from 3 to 7
move 7 from 9 to 7
move 1 from 2 to 5
move 1 from 1 to 4
move 3 from 8 to 1
move 3 from 1 to 8
move 3 from 7 to 8
move 15 from 7 to 3
move 10 from 8 to 3
move 1 from 5 to 7
move 1 from 8 to 5
move 3 from 9 to 2
move 1 from 6 to 4
move 2 from 2 to 7
move 1 from 2 to 5
move 14 from 7 to 9
move 1 from 6 to 2
move 1 from 7 to 1
move 1 from 5 to 4
move 3 from 4 to 3
move 1 from 7 to 6
move 1 from 2 to 7
move 1 from 1 to 2
move 3 from 9 to 1
move 1 from 6 to 2
move 2 from 2 to 6
move 17 from 3 to 6
move 1 from 8 to 3
move 1 from 5 to 4
move 2 from 7 to 2
move 9 from 9 to 8
move 1 from 9 to 3
move 16 from 3 to 2
move 1 from 7 to 5
move 5 from 6 to 5
move 1 from 1 to 6
move 1 from 4 to 1
move 1 from 9 to 3
move 9 from 8 to 6
move 3 from 1 to 5
move 1 from 9 to 1
move 16 from 2 to 1
move 2 from 2 to 7
move 2 from 3 to 9
move 2 from 7 to 4
move 2 from 9 to 3
move 3 from 3 to 5
move 1 from 4 to 5
move 1 from 4 to 2
move 1 from 1 to 7
move 1 from 7 to 1
move 1 from 3 to 6
move 2 from 5 to 1
move 3 from 6 to 2
move 2 from 5 to 8
move 8 from 5 to 4
move 1 from 5 to 3
move 1 from 3 to 2
move 1 from 8 to 3
move 1 from 3 to 8
move 4 from 1 to 7
move 9 from 1 to 7
move 6 from 1 to 8
move 3 from 7 to 4
move 7 from 6 to 7
move 11 from 4 to 3
move 2 from 3 to 8
move 8 from 3 to 8
move 4 from 6 to 1
move 1 from 7 to 4
move 2 from 1 to 2
move 8 from 7 to 2
move 1 from 4 to 8
move 10 from 8 to 2
move 2 from 6 to 1
move 1 from 1 to 4
move 1 from 4 to 8
move 2 from 1 to 4
move 6 from 6 to 5
move 1 from 1 to 9
move 2 from 6 to 8
move 1 from 4 to 5
move 1 from 6 to 9
move 4 from 8 to 9
move 1 from 7 to 1
move 6 from 8 to 6
move 1 from 6 to 1
move 1 from 4 to 9
move 2 from 9 to 5
move 5 from 5 to 9
move 8 from 9 to 5
move 2 from 8 to 5
move 3 from 6 to 9
move 8 from 5 to 7
move 5 from 5 to 6
move 1 from 9 to 2
move 1 from 3 to 1
move 1 from 6 to 7
move 1 from 5 to 6
move 24 from 2 to 4
move 3 from 9 to 7
move 16 from 4 to 5
move 2 from 1 to 3
move 12 from 5 to 6
move 1 from 9 to 5
move 4 from 5 to 9
move 1 from 1 to 6
move 1 from 5 to 2
move 2 from 9 to 8
move 1 from 8 to 1
move 5 from 4 to 5
move 2 from 3 to 5
move 1 from 8 to 3
move 1 from 1 to 6
move 3 from 5 to 7
move 1 from 9 to 1
move 1 from 2 to 8`;

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
