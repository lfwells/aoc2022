import * as fs from 'fs';
import * as utils from "./utils.js";

let isPart2 = true;

const input = fs.readFileSync("day17.input").toString();

let blocks = [
    //####
    [
        [0,0],
        [1,0],
        [2,0],
        [3,0]
    ],

    //.#.
    //###
    //.#.
    [
        [1,0],
        [0,1],
        [1,1],
        [2,1],
        [1,2]
    ],

    //..#
    //..#
    //###
    [
        [0,0],
        [1,0],
        [2,0],
        [2,1],
        [2,2]
    ],

    //#
    //#
    //#
    //#
    [
        [0,0],
        [0,1],
        [0,2],
        [0,3]
    ],

    //##
    //##
    [
        [0,0],
        [1,0],
        [0,1],
        [1,1]
    ],
];

let WIDTH = 7;
let SPAWN_OFFSET = [2,3];

let wind = input.split("");

//maybe some fancy part 2 maths
console.log(wind.length);

let nextSpawnY = 0;
let windIndex = 0;
let currentTestingBlock = [];
let currentTestingBlockPos = [0,0];

let world = [];
for (var x = 0; x<= WIDTH; x++)
{
    world.push(-1);
}


function printWorld(toMaxY)
{
    console.log("\n");

    let lines = [];
    for (var y = toMaxY; y >= 0; y--)
    {
        let line = [];
        line.push("|");
        for (var x = 0; x < WIDTH; x++)
        {
            let isTestingBlock = currentTestingBlock != null && currentTestingBlock.some(blockOffset => x == currentTestingBlockPos[0]+blockOffset[0] && y == currentTestingBlockPos[1]+blockOffset[1]);

            if (isTestingBlock)
                line.push("@");
            else
                line.push(world[y][x] ? "#" : ".");
        }
        line.push("|");
        lines.push(line);
    }
    
    let floor = [];
    for (var x = -1; x < WIDTH; x++)
        floor.push("-");
    lines.push(floor);

    console.log(lines.map(line => line.join("")).join("\n"));
}

function spawnBlock(blockCount)
{
    currentTestingBlock = blocks[blockCount % blocks.length];
    currentTestingBlockPos = [...SPAWN_OFFSET];
    currentTestingBlockPos[1] = currentTestingBlockPos[1] + nextSpawnY;
}
function windBlock()
{
    let windAmount = wind[windIndex % wind.length] == ">" ? 1 : -1;
    currentTestingBlockPos[0] = currentTestingBlockPos[0] + windAmount;
    let coll =  getTestingBlockPositions().some(collision);
    if (coll)
    {
        currentTestingBlockPos[0] = currentTestingBlockPos[0] - windAmount;
        return true;
    }
    return false;
}
function dropBlock()
{
    currentTestingBlockPos[1] = currentTestingBlockPos[1] - 1;
    let coll =  getTestingBlockPositions().some(collision);
    if (coll)
    {
        currentTestingBlockPos[1] = currentTestingBlockPos[1] + 1;
        return true;
    }
    return false;
}
function getTestingBlockPositions()
{
    return currentTestingBlock.map(block => [ currentTestingBlockPos[0]+block[0], currentTestingBlockPos[1]+block[1] ]);
}
function collision(xy)
{
    let x = xy[0];
    let y = xy[1];
    if (x < 0 || x >= WIDTH || y < 0) { /*console.log("foud coll ground",x,y);*/return true; }
    //if (world[y][x]) { console.log("foud coll",x,y);}
    
    //part 1
    //return world[y][x];
    return y <= world[x];
}
function placeBlock()
{
    //part 1
    //getTestingBlockPositions().forEach(block => world[block[1]][block[0]] = true);
    
    //part 2
    getTestingBlockPositions().forEach(block => world[block[0]] = Math.max(world[block[0]], block[1]));

    nextSpawnY = Math.max(nextSpawnY, ...getTestingBlockPositions().map(block => block[1]+1));//todo: calc
}

//if (!isPart2)
{
    let memo = {};
    function makeMemo()
    {
        let maxY = Math.max(...world);
        let horizon = world.map(y => maxY-y);
        return (windIndex * 100000000) + (blockCount * 10000000) + parseInt(horizon.join(""));
    }


    var blockCount = 0; 
    let totalBlocks = 1000000000000;
    do
    {
        if (blockCount % 1000000 == 0) console.log(blockCount/1000000000000);
        spawnBlock(blockCount);
        let atRest = false;
        do
        {
            windBlock();
            if (dropBlock())
            {
                placeBlock();


                //console.log(blockCount % blocks.length,windIndex % wind.length);
                let memoOfThis = makeMemo();
                //console.log({memoOfThis});
                if (memo[memoOfThis] != undefined) console.log("FOUND A CYCLE", blockCount, memo[memoOfThis] );
                memo[memoOfThis] = nextSpawnY;

                atRest = true;
                currentTestingBlock = null;


            }
            //printWorld(8);

            windIndex++;
        }
        while (atRest== false);
        blockCount++;


    }
    while (blockCount < totalBlocks);

    console.log({part1:nextSpawnY});
}