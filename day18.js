import * as fs from 'fs';
import * as utils from "./utils.js";

const input = fs.readFileSync("day18.input").toString();

let points = input.split("\n").map(side => utils.parseInts(side.split(",")));

let neighbours = [
    [1,0,0],
    [0,1,0],
    [0,0,1],
    [-1,0,0],
    [0,-1,0],
    [0,0,-1],
]

let neighboursDiag = [
    [-1, -1, -1],
           [-1, -1,  0],
           [-1, -1,  1],
           [-1,  0, -1],
           [-1,  0,  0],
           [-1,  0,  1],
           [-1,  1, -1],
           [-1,  1,  0],
           [-1,  1,  1],
           [ 0, -1, -1],
           [ 0, -1,  0],
           [ 0, -1,  1],
           [ 0,  0, -1],
           [ 0,  0,  0],
           [ 0,  0,  1],
           [ 0,  1, -1],
           [ 0,  1,  0],
           [ 0,  1,  1],
           [ 1, -1, -1],
           [ 1, -1,  0],
           [ 1, -1,  1],
           [ 1,  0, -1],
           [ 1,  0,  0],
           [ 1,  0,  1],
           [ 1,  1, -1],
           [ 1,  1,  0],
           [ 1,  1,  1]
]

function index(x,y,z)
{
    return x + y * 1000 + z * 1000 * 1000;
}

let pointsCache = {};
points.forEach(point => {
    pointsCache[index(...point)] = true;
});

function isAdjacent(point, n)
{
    n = [point[0]+n[0], point[1]+n[1], point[2]+n[2]];
    return (pointsCache[index(...n)]);
}

function computeSides()
{
    let sides = points.length * 6;
    points.forEach(function(point) {
        let adjacentNeighbours = neighbours.filter(n => isAdjacent(point, n)).length;
        sides -= adjacentNeighbours;
    });
    return sides;
}

console.log({part1:computeSides()});

//part 2

let outsideCells = {};
let wrongCells = {};
//didn't work

let minZ = Math.min(...points.map(point => point[2]));
let maxZ = Math.max(...points.map(point => point[2]));
let minY = Math.min(...points.map(point => point[1]));
let maxY = Math.max(...points.map(point => point[1]));
let minX = Math.min(...points.map(point => point[0]));
let maxX = Math.max(...points.map(point => point[0]));

let memo = {};
for (var z = minZ; z <= maxZ; z++)
{
    if (z != 8) continue;

    console.log({z, maxZ});
    let zSlice = points.filter(point => point[2] == z);
    let minY = Math.min(...zSlice.map(point => point[1]));
    let maxY = Math.max(...zSlice.map(point => point[1]));
    for (var y = minY; y <= maxY; y++)
    {
        if (y != 8) continue;

        let ySlice = zSlice.filter(point => point[1] == y);
        let minX = Math.min(...ySlice.map(point => point[0]));
        let maxX = Math.max(...ySlice.map(point => point[0]));
        for (var x = minX; x <= maxX; x++)
        {
            console.log({x,maxX});
            
            let isHole = pointsCache[index(x,y,z)] == undefined;
            let found = {};
            if (isHole)
            {
                //this isnt right yet...
                function check(point, itr)
                {
                    console.log("check", point);
                    if (memo[index(...point)] != undefined) { /*console.log("MEMO", point);*/ return memo[index(...point)];}
                    
                    if (pointsCache[index(...point)]) {
                        found[index(...point)] = true;
                        memo[index(...point)] = true;
                        wrongCells[index(...point)] = "#";//itr%10;
                        return true;
                    }
                    if (itr >= 500) { 
                        found[index(...point)] = false;
                        memo[index(...point)] = false;
                        wrongCells[index(...point)] = "X";//itr%10;
                        return false;
                    }

                    /*let dirs = neighbours.map(function(dir) {
                        let newX = point[0]+dir[0]; let newY = point[1]+dir[1]; let newZ = point[2]+dir[2];
                        return check([newX,newY,newZ], itr + 1);
                    });

                    let result = dirs.every(d => d);
*/
console.log("---");
                    let result = true;
                    for (var i = 0; i < neighbours.length; i++)
                    {
                        let dir = neighbours[i];
                        if (dir[2] != 0) continue;
                        let newX = point[0]+dir[0]; let newY = point[1]+dir[1]; let newZ = point[2]+dir[2];
                        console.log({point, dir, newX,newY,newZ, found:found[index(newX,newY,newZ)]});
                        if (found[index(newX,newY,newZ)] != undefined) { continue; }

                        let c = check([newX,newY,newZ], itr + 1);
                        if (c === false)
                        {
                            result = false;
                            wrongCells[index([newX,newY,newZ])] = itr % 10;
                            //wrongCells[index(...point)] = (wrongCells[index(...point)] ?? 0) +1;
                            break;
                        }
                    }

                    found[index(...point)] = result;
                    memo[index(...point)] = result;
                    if (result) wrongCells[index(...point)] = "A";

                    return result;
                }
                isHole = isHole && check([x,y,z], 0);

                //but also need to check that if we head out in all directions we eventually find a thing
                /*
                let directions = neighbours.map(function(dir) {
                    let newX = x; let newY = y; let newZ = z;
                    for (var i = 0; i < 500; i++)
                    {
                        found.push([x,y,z]);
                        newX += dir[0]; newY += dir[1]; newZ += dir[2];
                        if (pointsCache[index(newX,newY,newZ)]) 
                        {
                            return true;
                        }
                    }
                    return false;
                });
                isHole = isHole && directions.every(dir => dir);*/
            }
            if (isHole)
            {
                //console.log("hole at: ",{x,y,z});
                //let adjacentNeighbours = neighbours.filter(n => isAdjacent([x,y,z], n)).length;
                //sides -= adjacentNeighbours;
                pointsCache[index(x,y,z)] = true;
                Object.values(found).forEach(f => {
                    pointsCache[index(f[0],f[1],f[2])] = true;
                    outsideCells[index(f[0],f[1],f[2])] = true;
                });
                outsideCells[index(x,y,z)] = true;
/*
                let arr = {};
                try
                {
                    addOutsideCells(x,y,z, 0, arr);
                }
                catch (Exception) {
                    continue;
                }
                //outsideCells = Object.assign(outsideCells, arr);
                pointsCache[index(x,y,z)] = true;*/
            }
        }
    }
}
//debugging hell

for (var z = minZ-1; z <= maxZ+1; z++)
{
    if (z != 8) continue;
    console.log({z});
    let grid = [];
    for (var y = minY-1; y <= maxY+1; y++)
    {
        let line = [];
        for (var x = minX-1; x <= maxX+1; x++)
        {
            //let aN = neighbours.filter(n => isAdjacentToOutsidePoint([x,y,z], n)).length;
            //line.push(aN > 0 ? aN : ".");
            //line.push(wrongCells[index(x,y,z)] != undefined ? wrongCells[index(x,y,z)] : outsideCells[index(x,y,z)] ? "@" : pointsCache[index(x,y,z)] ? "#" : ".")
            line.push(wrongCells[index(x,y,z)] != undefined ? wrongCells[index(x,y,z)] : ".")
        }
        grid.push(line.join(""));
    }
    console.log(grid.join("\n")+"\n");
}

console.log({part2:computeSides()}); //2031 too low


/*
let minZ = Math.min(...points.map(point => point[2]));
let maxZ = Math.max(...points.map(point => point[2]));
let minY = Math.min(...points.map(point => point[1]));
let maxY = Math.max(...points.map(point => point[1]));
let minX = Math.min(...points.map(point => point[0]));
let maxX = Math.max(...points.map(point => point[0]));

function addOutsideCells(x,y,z, count, dir)
{
    if (count == undefined) count = 0;
    if (count > 600) return;
    if (x < minX || y < minY || z < minZ || x > maxX || y > maxY || z > maxZ)
        return;
    if (outsideCells[index(x,y,z)]) 
        return;    
    if (pointsCache[index(x,y,z)])
        return;
    
    //console.log({x,y,z,what:index(x,y,z)});
    //arr[index(x,y,z)] = true;
    outsideCells[index(x,y,z)] = [x,y,z];
    
    //neighbours.forEach(n => addOutsideCells(x+n[0], y+n[1], z+n[2], count+1, arr));
    addOutsideCells(x+dir[0], y+dir[1], z+dir[2], count+1, dir);
}*/
/*
addOutsideCells(minX, minY, minZ);
addOutsideCells(minX, maxY, minZ);
addOutsideCells(minX, minY, maxZ);
addOutsideCells(maxX, maxY, minZ);
addOutsideCells(minX, maxY, maxZ);
addOutsideCells(maxX, maxY, maxZ);
*/

/*
for (var z = minZ; z <= maxZ; z++)
{
    for (var y = minY; y <= maxY; y++)
    {
        addOutsideCells(minX, y, z, 0, [1,0,0]);
        addOutsideCells(maxX, y, z, 0, [-1,0,0]);
    }
}


for (var x = minX; x <= maxX; x++)
{
    for (var y = minY; y <= maxY; y++)
    {
        addOutsideCells(x, y, minZ, 0, [0,0,1]);
        addOutsideCells(x, y, maxZ, 0, [0,0,-1]);
    }
}

for (var x = minX; x <= maxX; x++)
{
    for (var z = minZ; z <= maxZ; z++)
    {
        addOutsideCells(x, minY, z, 0, [0,1,0]);
        addOutsideCells(x, maxY, z, 0, [0,-1,0]);
    }
}
*/

//console.log({outsideCells, len:Object.values(outsideCells).length, minX, minY, minZ, maxX, maxY, maxZ});

function isAdjacentToOutsidePoint(point, n)
{
    n = [point[0]+n[0], point[1]+n[1], point[2]+n[2]];

    let x = n[0]; let y = n[1]; let z = n[2];
    if (x < minX || y < minY || z < minZ || x > maxX || y > maxY || z > maxZ) return true;
    
    return (outsideCells[index(...n)] != undefined);
}

let sides = points.length * 6;//computeSides();
points.forEach(function(point) {
    let adjacentNeighbours = neighbours.filter(n => !isAdjacentToOutsidePoint(point, n)).length;
    //console.log({point, adjacentNeighbours});
    sides -= adjacentNeighbours;
});
/*
let sides = 0
Object.values(outsideCells).forEach(function(point){
    
    let adjacentNeighbours = neighbours.filter(n => isAdjacent(point, n)).length;
    console.log({point, adjacentNeighbours});
    sides += adjacentNeighbours;
} )*/
//console.log({part2:sides, k:Object.values(outsideCells).length});//3530 too high