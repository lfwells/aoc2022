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
//part 1
for (var y = 0; y<= 100; y++)
{
    let line = [];
    for (var x = 0; x<= WIDTH; x++)
    {
        line.push(-1);
    }
    world.push(line);
}
//part 2
/*
for (var x = 0; x<= WIDTH; x++)
{
    world.push(-1);
}
*/

function printWorld(toMaxY)
{
    if (toMaxY == undefined) toMaxY = world.length-1;
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
                line.push(world[y][x] != -1 ? "#" : ".");
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
    //console.log({x,y,yO:y-offsetHeight,len:world.length,nextSpawnY, offsetHeight});
    return world[y-offsetHeight][x] != -1;
    
    //part 2
    //return y <= world[x];
}

let offsetHeight = 0;
function placeBlock()
{
    //part 1
    getTestingBlockPositions().forEach(block => {
        /*let a = world[block[1]-offsetHeight]
        console.log({
            len: world.length,
            a, b:a ? world[block[1]-offsetHeight][block[0]] : null, c:block[0], d:block[1]-offsetHeight
        });*/
        world[block[1]-offsetHeight][block[0]] = true;
    });
    
    //part 2
    //getTestingBlockPositions().forEach(block => world[block[0]] = Math.max(world[block[0]], block[1]));

    let prevnextSpawnY = nextSpawnY;
    nextSpawnY = Math.max(nextSpawnY, ...getTestingBlockPositions().map(block => block[1]+1));//todo: calc
    
    let size = nextSpawnY-prevnextSpawnY;
    //console.log("increase size", {size});
    world = world.slice(0, world.length - size);
    for (var y = 0; y < size; y++)
    {
        let line = [];
        for (var x = 0; x < WIDTH; x++)
            line.push(-1);
        world.push(line);
    }
    offsetHeight += size;
}

//if (!isPart2)
{
    
    let memo = {};
    function makeMemo() //TODO: this needs to memo the first say 15 rows
    {
        return world/*.slice(world.length - 15)*/.map(line => line.join("")).join("")+"|"+(windIndex%wind.length)+"|"+(blockCount%blocks.length);
        /*
        let maxY = Math.max(...world);
        //console.log(maxY);
        let horizon = world.slice(0, world.length-1).map(y => maxY-y);
        return (windIndex%wind.length * 100000000) + (blockCount%blocks.length * 10000000) + parseInt(horizon.join(""));
        */
    }

    let cycleFound = 0;
    let savedMemo = null;
    let savedNextYHeight = 0;
    let savedBlockCount = 0;
    let cycleSize = 0;
    let cycleSizeBlockCount = 0;
    let savedHeights = {};

    var blockCount = 0; 
    let totalBlocks = 1000000000000;
    do
    {
        /*
        if (nextSpawnY % 15 == 0 && nextSpawnY != 0) 
        {
            console.log("increase size", {nextSpawnY});
            let size = 50;
            world = world.slice(0, world.length - size);
            for (var y = 0; y < size; y++)
            {
                let line = [];
                for (var x = 0; x < WIDTH; x++)
                    line.push(-1);
                world.push(line);
            }
            offsetHeight += size;
            //nextSpawnY = nextSpawnY - size;
        }*/
        
        if (cycleFound == 2)
        {
            console.log({cycleSize, cycleSizeBlockCount});
    
            while (blockCount < totalBlocks)
            {
                if (blockCount+cycleSizeBlockCount > totalBlocks) break;
                blockCount+=cycleSizeBlockCount;
                nextSpawnY+=cycleSize;
            }
            
            console.log({blockCount, nextSpawnY});

            //now add on the saved remainder
            let remainder = totalBlocks - blockCount;
            blockCount += remainder;
            nextSpawnY += savedHeights[remainder];

            console.log({blockCount, nextSpawnY});

            cycleFound++;
            break;
        }
        
        spawnBlock(blockCount);
        let atRest = false;
        do
        {
            windBlock();
            if (dropBlock())
            {
                placeBlock();

                if (isPart2 && cycleFound < 3)
                {
                    //console.log(blockCount % blocks.length,windIndex % wind.length);
                    let memoOfThis = makeMemo();
                    //console.log({memoOfThis});
                    if (cycleFound == 0)
                    {
                        if (memo[memoOfThis] != undefined) 
                        {
                            console.log("FOUND A CYCLE", { blockCount, windIndex, memoOfThis, nextSpawnY });
                            savedMemo = memoOfThis;
                            savedNextYHeight = nextSpawnY;
                            savedBlockCount = blockCount;
                            cycleFound++;
                            printWorld();
                            break;
                        }
                        else
                        {
                            savedHeights[blockCount] = nextSpawnY;
                        }
                        memo[memoOfThis] = nextSpawnY;
                    }
                    else if (memoOfThis == savedMemo)
                    {
                        console.log("FOUND THE CYCLE REPEATED", { blockCount, windIndex, memoOfThis, nextSpawnY });
                        savedMemo = memoOfThis;
                        cycleSize = nextSpawnY - savedNextYHeight;
                        cycleSizeBlockCount = blockCount - savedBlockCount;
                        cycleFound++;
                        printWorld();
                        break;
                    }
                }

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
    
    /*FAILED THING
    let memo = {};
    function getMemoIndex()
    {
        let maxY = Math.max(...world);
        //console.log(maxY);
        let horizon = world.slice(0, world.length-1).map(y => maxY-y);
        return (windIndex%wind.length * 100000000) + (blockCount%blocks.length * 10000000) + parseInt(horizon.join(""));
    }

    let saved = {};

    var blockCount = 0; 
    let totalBlocks = 1000000000000;
    let cacheHits = 0;
    do
    {
        if (blockCount % 100000 == 0) console.log(blockCount/totalBlocks, {cacheHits});
        
        let memoIndex = getMemoIndex();
        let cache = saved[memoIndex];
        if (cache)
        {
            nextSpawnY += cache.fall;
            windIndex += cache.wind;
            blockCount++;
            cacheHits++;
            continue;
        }
        
        spawnBlock(blockCount);
        let atRest = false;
        let prevnextSpawnY = nextSpawnY;
        let prevwindIndex = windIndex;
        do
        {
            windBlock();
            if (dropBlock())
            {
                placeBlock();


                saved[memoIndex] = { 
                    fall: prevnextSpawnY - nextSpawnY , 
                    wind: prevwindIndex - windIndex 
                };

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
*/
    
printWorld();

    console.log({part1:nextSpawnY, blockCount});
}

//1542857142846 was TOO HIGH :(
//1528323699442 need to get this one
//aim for a cycle at 1957