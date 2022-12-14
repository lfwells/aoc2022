import * as fs from 'fs';
import * as utils from "./utils.js";

let isPart2 = true;

const input = fs.readFileSync("day14.input").toString();

let lines = input.split("\n").map(line => line.split(" -> ").map(pair => utils.parseInts(pair.split(","))));
console.log(lines);

const EMPTY = ".";
const ROCK  = "#";
const SAND  = "o";
const SOURCE= "+";

let minX = Math.min(...lines.map(line => Math.min(...line.map(line => line[0]))));
let minY = Math.min(...lines.map(line => Math.min(...line.map(line => line[1]))));
let maxX = Math.max(...lines.map(line => Math.max(...line.map(line => line[0]))));
let maxY = Math.max(...lines.map(line => Math.max(...line.map(line => line[1]))));
minY = 0;

maxY = maxY + 2;//part 2
minX = 480;
maxX = 510

let sources = [
    [500, 0]
];

let world = [];
for (var y = 0; y <= 1000; y++)
{
    let emptyLine = [];
    for (var x = 0; x <= 1000; x++)
        emptyLine.push(EMPTY);
    world.push(emptyLine);
}

//add the lines
function drawLine(start, end)
{
    //ugh didnt work whatever
    /*
    let curr = [...start];
    while (curr[0] != end[0] || curr[1] != end[1])
    {
        //console.log({curr, end, dx:Math.sign(end[0] - curr[0]), dy:Math.sign(end[1] - curr[1])});
        world[curr[1]][curr[0]] = ROCK;
        curr = [
            curr[0] + Math.sign(end[0] - curr[0]),
            curr[1] + Math.sign(end[1] - curr[1])
        ];
    }*/
    if (start[0] < end[0]) //horiontal
    {
        y = start[1];
        for (var x = start[0]; x <= end[0]; x++)
            world[y][x] = ROCK;
    }
    else if (start[0] > end[0]) //horiontal
    {
        y = start[1];
        for (var x = end[0]; x <= start[0]; x++)
            world[y][x] = ROCK;
    }
    else if (start[1] < end[1]) //vertical
    {
        x = start[0];
        for (var y = start[1]; y <= end[1]; y++)
        {
            world[y][x] = ROCK;
        }
    }
    else if (start[1] > end[1]) //vertical
    {
        x = start[0];
        for (var y = end[1]; y <= start[1]; y++)
            world[y][x] = ROCK;
    }
}
lines.forEach(pairs => {
    let prev = pairs[0];
    for (var i = 1; i < pairs.length; i++)
    {
        drawLine(prev, pairs[i]);
        prev = pairs[i];
    }
});

function printWorld()
{
    let allLines = [];
    for (var y = minY; y <= maxY; y++)
    {
        let line = [];
        for (var x = minX; x <= maxX; x++)
        {
            if (y == maxY)
            {
                line.push(ROCK);
                continue;
            }
            let isPrinted = false;
            for (var s of sources)
            {
                if (x == s[0] && y == s[1])
                {
                    isPrinted = true;
                    line.push(SOURCE);
                    break;
                }
            }
            if (!isPrinted)
            {
                line.push(world[y][x]);
            }
        }
        allLines.push(line.join(""));
    }
    console.log(allLines.join("\n"));
}

printWorld();

function sandFall(sand, stack, source)
{
    if (!isPart2 && stack == 10000)
    {
        console.error("AT INFINITY");
        return null;
    }
    if (world[sand[1]][sand[0]] != EMPTY)
    {
        return false;
    }

    //check for the ground
    let belowY = sand[1]+1;
    if (!isPart2 && belowY >= world.length)
    {
        console.error("AT INFINITY");
        return null;
    }
    if (isPart2 && belowY == maxY)
    {
        return sand;
    }

    //let it fall
    let below = world[belowY][sand[0]];
    if (below == EMPTY)
    {
        return sandFall([sand[0], belowY], stack+1, source);
    }
    /*else if (isPart2 && sand[0] == source[0] && sand[1] == source[1])
    {
        console.error("AT SOURCE");
        return null;
    }*/

    if (below == SAND || below == ROCK || belowY == maxY)
    {
        //try down-left
        let belowX = sand[0]-1;
        let belowLeftResult = sandFall([belowX, belowY], stack+1, source);
        if (belowLeftResult != false) return belowLeftResult;
        
        belowX = sand[0]+1;
        let belowRightResult = sandFall([belowX, belowY], stack+1, source);
        if (belowRightResult != false) return belowRightResult;

        return sand;//hit walls on all sides, give up
    }
}

let atInfinity = false;
let cycle = 0;
do
{
    sources.forEach(source => {   
        let sand = [...source];
        let result = sandFall(sand, 0, source);
        if (result != null && result != false)
        {
            world[result[1]][result[0]] = SAND;
        }
        else
        {
            atInfinity = true;
        }
    });
    //printWorld();
    cycle++;
}
while (atInfinity == false);
//printWorld();

console.log({part1:cycle-1});