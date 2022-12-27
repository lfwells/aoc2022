import * as fs from 'fs';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import * as utils from "./utils.js";

const input = fs.readFileSync("day22.input").toString();

const isSample = false;
const isPart2 = true;
const visualize = false;

const WALL = "#";
const TILE = ".";
const TELEPORT = " ";
const BLANK = " ";

const CLOCKWISE = "R";
const COUNTERCLOCKWISE = "L";

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;
const FACINGS = {
    0: [1,0],
    1: [0,1],
    2: [-1, 0],
    3: [0, -1]
}

function oppositeFacing(facing)
{
    switch (facing)
    {
        case RIGHT: return LEFT;
        case LEFT: return RIGHT;
        case UP: return DOWN;
        case DOWN: return UP;
    }
}

function facingArrow(facing)
{
    switch (facing)
    {
        case UP: return "^"; 
        case DOWN: return "\\"; 
        case LEFT: return "<"; 
        case RIGHT: return ">"; 
    }
}

let inputParts = input.split("\n\n");
let map = inputParts[0].split("\n").map(line => line.split(""));
let movesRaw = inputParts[1].split("");
let moves = [];
let currentMove = "";
movesRaw.forEach((e,i) => {
    if (e == "R" || e == "L")
    {
        if (currentMove != "")
            moves.push(currentMove);
        currentMove = "";
        moves.push(e);
    }
    else
    {
        currentMove += e;
    }
});
if (currentMove != "")
    moves.push(currentMove);
//console.log({moves});
const WIDTH = Math.max(...map.map(l =>l.length));
const HEIGHT = map.length;

let path = [];
for (var y = 0; y < HEIGHT; y++)
{
    let line = [];
    for (var x = 0; x < WIDTH; x++)
    {
        let got = get(x,y) ;
        line.push(got == null || got == TELEPORT ? " " : got == WALL ? "#" : ".");
    }
    line.push("|");
    path.push(line);
}
function printPath(rows)
{
    let allLines = path.map(line => line.map(p => p =="." ? " " : p).join(""));
    if (rows != undefined)
        allLines = allLines.splice(rows, rows);
    
    console.log(allLines.join("\n"));
}

function getV(vec)
{
    return get(vec[0], vec[1]);
}
function get(x,y)
{
    if (x < 0 || x >= WIDTH) return null;
    if (y < 0 || y >= HEIGHT) return null;
    return map[y][x];
}

let facing = 0;
let position = [0,0];
while (getV(position) != TILE)
{
    position[0] = position[0] + 1;
    if (position[0] == WIDTH)
    {
        position[0] = 0;
        position[1] = position[1] + 1;
    }
}
//cube stuff
let cubeSize = isSample ? 4 : 50;//4 for sample
let currentSide = 0;
let cubeInfo = [];
for (var y = 0; y < HEIGHT; y+=cubeSize)
{
    for (var x = 0; x < WIDTH; x+=cubeSize)
    {
        let inPlace = get(x,y);
        if (inPlace != BLANK && inPlace != null)
        {
            cubeInfo[currentSide++] = { topLeft: [x,y] }
        }
    }
}

cubeInfo = cubeInfo.map(function(cube) {
    return {
        topLeft:cube.topLeft,
        topRight:[cube.topLeft[0] + cubeSize-1, cube.topLeft[1]],
        bottomLeft:[cube.topLeft[0], cube.topLeft[1] + cubeSize-1],
        bottomRight:[cube.topLeft[0] + cubeSize-1, cube.topLeft[1] + cubeSize-1],
    }
} )
console.assert(cubeInfo.length == 6);
//console.log(cubeInfo[0]);
//console.log("\n",cubeInfo.map(c => c.topLeft+" "+c.topRight+" "+c.bottomRight+" "+c.bottomLeft).join("\n"));

//part 2
let connections = {};
let seamID = 0;
function createSeam(line1A, line1B, line2A, line2B, startFacing, endFacing)
{
    //console.log("\n---");
    let dx1 = Math.sign(line1B[0] - line1A[0]);
    let dy1 = Math.sign(line1B[1] - line1A[1]);
    let dx2 = Math.sign(line2B[0] - line2A[0]);
    let dy2 = Math.sign(line2B[1] - line2A[1]);
    let seam1 = line1A;
    let seam2 = line2A;
    for (var i = 0; i < cubeSize; i++)
    {
        if (getV(seam1) == WALL || getV(seam2) == WALL) {
            try
            {
                //path[seam1[1]][seam1[0]] = seamID;//"S";
                //path[seam2[1]][seam2[0]] = seamID;//"S";

                //path[seam1[1]][seam1[0]] = "W";//"S";
                //path[seam2[1]][seam2[0]] = "W";//"S";
            } catch (e) {}
        }
        else
        {
            //console.log({seam1, seam2});
            if (connections[seam1] == undefined) connections[seam1] = {};
            if (connections[seam2] == undefined) connections[seam2] = {};
            connections[seam1][oppositeFacing(startFacing)] = {teleportTo:seam2,newFacing:endFacing};
            connections[seam2][oppositeFacing(endFacing)] = {teleportTo:seam1,newFacing:startFacing};

            try
            {
                //path[seam1[1]][seam1[0]] = seamID;//"S";
                //path[seam2[1]][seam2[0]] = seamID;//"S";
                
                //path[seam1[1]][seam1[0]] = i % 10;//"S";
                //path[seam2[1]][seam2[0]] = i % 10;//"S";
            } catch (e) {}
        }
        

        seam1 = [seam1[0] + dx1, seam1[1] + dy1];
        seam2 = [seam2[0] + dx2, seam2[1] + dy2];

    }

    seamID++;
    
}

if (isSample)
{
    //seams for sample input
    createSeam(cubeInfo[3].topRight, cubeInfo[3].bottomRight, cubeInfo[5].topRight,cubeInfo[5].topLeft, RIGHT, DOWN);
    createSeam(cubeInfo[4].bottomLeft, cubeInfo[4].bottomRight, cubeInfo[1].bottomRight,cubeInfo[1].bottomLeft, DOWN, UP);
    createSeam(cubeInfo[2].topLeft, cubeInfo[2].topRight, cubeInfo[0].topLeft,cubeInfo[0].bottomLeft, UP, RIGHT);
}
else
{

    createSeam(cubeInfo[0].topLeft,     cubeInfo[0].topRight,       cubeInfo[5].topLeft,        cubeInfo[5].bottomLeft,            DOWN, RIGHT);
    createSeam(cubeInfo[0].bottomLeft,  cubeInfo[0].topLeft,        cubeInfo[3].topLeft,        cubeInfo[3].bottomLeft,         RIGHT, RIGHT);


    createSeam(cubeInfo[1].topLeft,     cubeInfo[1].topRight,       cubeInfo[5].bottomLeft,        cubeInfo[5].bottomRight,            DOWN, UP);
    createSeam(cubeInfo[1].topRight,    cubeInfo[1].bottomRight,    cubeInfo[4].bottomRight,    cubeInfo[4].topRight,         LEFT, LEFT);
    createSeam(cubeInfo[1].bottomLeft,  cubeInfo[1].bottomRight,        cubeInfo[2].topRight,        cubeInfo[2].bottomRight,         UP, LEFT);


    createSeam(cubeInfo[2].topLeft,  cubeInfo[2].bottomLeft,        cubeInfo[3].topLeft,        cubeInfo[3].topRight,         RIGHT, DOWN);
    //createSeam(cubeInfo[2].topLeft,  cubeInfo[2].bottomLeft,        cubeInfo[3].bottomLeft,        cubeInfo[3].topLeft,         RIGHT, RIGHT);


    createSeam(cubeInfo[4].bottomLeft,  cubeInfo[4].bottomRight,        cubeInfo[5].topRight,        cubeInfo[5].bottomRight,         UP, LEFT);

}

//console.log({connections});
console.log(connections[[150,49]]);
//console.log(connections[[11,5]]);


path[position[1]][position[0]] = "S";
/*
let debug = cubeInfo[4].bottomLeft;
path[debug[1]][debug[0]] = "D";
debug = cubeInfo[4].bottomRight;
path[debug[1]][debug[0]] = "D";*/

//printPath();

//working part 1 (should be able to be repurposed for part 2)
function shouldShowPath(moves)
{
    return moves > 465 && moves < 473;
}
//moves = moves.slice(0,473);
for (var i = 0; i < moves.length; i++)
{
    let move = moves[i];
    if (shouldShowPath(i)) console.log({move});
    if (move == "R")
    {
        facing = utils.mod((facing + 1), 4);
        //console.log({facing});
                        if (shouldShowPath(i)) path[position[1]][position[0]] = facingArrow(facing);//"*";
    }
    else if (move == "L")
    {
        facing = utils.mod((facing - 1), 4);
        //console.log({facing});
                        if (shouldShowPath(i)) path[position[1]][position[0]] = facingArrow(facing);//"*";
    }
    else
    {
        let num = parseInt(move);
        for (var j = 0; j < num; j++)
        {
            let x = position[0] + FACINGS[facing][0];
            let y = position[1] + FACINGS[facing][1];

            let inPlace = get(x,y);
            if (inPlace == WALL)
            {
                //console.log("hit wall",{x,y});
                break;
            }
            else if (inPlace == null || inPlace == TELEPORT)
            {
                console.log("hit tele",{x,y, facing});
                

                if (isPart2 == false)
                {
                    x = x - (WIDTH+1)*Math.sign(FACINGS[facing][0]);
                    y = y - (HEIGHT+1)*Math.sign(FACINGS[facing][1]);
                
                    while( inPlace == TELEPORT ||inPlace == null) 
                    {
                        x = x + FACINGS[facing][0];
                        y = y + FACINGS[facing][1];
                        //console.log("\ttele", {x,y});
                        inPlace = get(x,y);
                    }
                    if (inPlace == WALL) //teleported into wall, deal with it
                    {
                        //console.log("\tteleported into wall", {x,y});
                        break;
                    }
                    position = [x,y];
                }
                else
                {
                    let info = connections[[position[0],position[1]]]
                    if (info != null) info = info[facing];
                    if (info == null)
                    {
                        console.error("teleport doesnt exist that way from", position);
                        if (shouldShowPath(i)) path[position[1]][position[0]] = "W";
                        //printPath();
                        //throw "teleport fail";
                        break;
                    }

                    try
                    {
                        //path[y][x] = "T";
                        //if (shouldShowPath(i)) path[position[1]][position[0]] = "T";
                    } catch (e) {}

                    let teleportTo = info.teleportTo;
                    let newFacing = info.newFacing;
                    console.log("\t", {teleportTo});
                    inPlace = getV(teleportTo);
                    if (inPlace == WALL) //teleported into wall, deal with it
                    {
                        console.log("\tteleported into wall", {x,y});
                        try
                        {
                            if (shouldShowPath(i)) path[y][x] = "W";
                            //path[position[1]][position[0]] = facingArrow(facing);//"W";
                        } catch (e) {}
                        break;
                    }
                    position = [teleportTo[0],teleportTo[1]];
                    facing = newFacing;
                    
                    try
                    {
                        //path[y][x] = "T";
                        //if (shouldShowPath(i)) path[position[1]][position[0]] = "E";
                        if (shouldShowPath(i)) path[position[1]][position[0]] = facingArrow(facing);//"*";
                    } catch (e) {}
                }
                console.log("hit tele2",{position, facing});
            }
            else
            {
                //console.log("hit noth",{x,y});
                position = [x,y];
                if (shouldShowPath(i)) path[position[1]][position[0]] = facingArrow(facing);//"*";
            }

            if (visualize)
            {
                console.clear();
                printPath(50);
            }
        }
    }
}
path[position[1]][position[0]] = "@";
printPath();

//off-by-one-garbage
position[0]++;
position[1]++;
console.log({position, facing});
console.log({part1: 1000 * position[1] + 4 * position[0] + facing});

//18206 is too low :(
//150289 is too high :(
//196151 is too high (duh lol)
//106297 is incorreeect

//86382 is correct, now to get that answer