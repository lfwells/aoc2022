import * as fs from 'fs';

const input = fs.readFileSync("day10.input").toString();

let ops = input.split("\n").map(l => l.split(" "));

let registers = {
    x: 1
};

let cycle = 0;
let observedCycles = [];
let lastOp = [];

let part2 = "";

function observeCycle()
{
    //console.log({cycle, registers, lastOp});
    if ((cycle + 20) % 40 == 0)
    {
        let signalStrength = registers.x * cycle;
        observedCycles.push(signalStrength);
        console.log(`observed cycle at ${cycle}, ${registers.x}, ${signalStrength}, ${lastOp}`);
    }
}

function drawPixel()
{
    let xPos = (cycle) % 40;
    let spritePos = registers.x;

    //doing this if statement the dumb way, don't @ me lol
    if (xPos == spritePos || xPos == spritePos+1 || xPos == spritePos+2 )
    {
        part2 += "#";
    }
    else 
    {
        part2 += " ";
    }
    if (cycle % 40 == 0) part2 += "\n";
}

ops.forEach(line => {
    lastOp = line;
    let op = line[0];
    let operand = line.length > 1 ? parseInt(line[1]) : null;

    if (op == "noop")
    {
        //do nothing;
        cycle++;
        drawPixel();
        observeCycle();
    } 
    else if (op.startsWith("add"))
    {
        cycle++;
        drawPixel();
        observeCycle();

        //part1
        cycle++;
        drawPixel();
        observeCycle();
        registers.x += operand;
    }
});

//part 1
let part1 = observedCycles.reduce((prev, curr) => prev+curr);
console.log({part1});

//part 2
console.log(part2); //this isn't 100% correct, but I can still see the letters