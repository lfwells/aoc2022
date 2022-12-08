import * as fs from 'fs';

const input = fs.readFileSync("day8.input").toString();

let trees = input.split("\n").map(l => l.split("").map(t => parseInt(t)));


//pad the input ((NOTE, I DIDNT NEED TO DO THIS, AND IT WAS THE SOURCE OF MOST OF MY PROBLEMS))
let pad = 0;

let width = trees[0].length;
let height = trees.length;
let paddedLine = [];
for (var i = 0; i < width; i++)
    paddedLine.push(pad);
trees = [paddedLine, ...trees, paddedLine];
trees = trees.map(line => [pad, ...line, pad]);

//console.log(trees.map(r => r.join("")).join("\n"));

width = trees[0].length; 
height = trees.length;

function get(x, y)
{
    return trees[y][x];
}

//oops this is not anything to do with the solution lol
let neighbours = [
    [0, -1, "top"],
    [-1, 0, "left"],
    [0, 1, "bottom"],
    [1, 0, "right"]

]
function surroundingHeights(x,y)
{
    return neighbours.map(n => {
        let xN = x + n[0];
        let yN = y + n[1];
        return get(xN,yN);
    });
}
function visibleWRONG(x,y)
{
    let ourHeight = get(x,y);
    return surroundingHeights(x,y).every(h => h < ourHeight);
}

function visibleDirection(x,y, dirX, dirY, originalHeight)
{
    if (x == 1 || y == 1 || x == width-2 || y == height-2) {
        //console.log("\t","TRUE");
        return true;
    }

    let neighbour = get(x+dirX, y+dirY);
    //if (neighbour == 0) return true; //not sure why this was really needed but w/e
    
    //console.log("checkvisible direction", { x, y, dirX, dirY, originalHeight, neighbour, result: neighbour < originalHeight });
    return neighbour < originalHeight && visibleDirection(x+dirX, y+dirY, dirX, dirY, originalHeight);
}
function visible(x, y)
{    
    let ourHeight = get(x,y);
    return neighbours.filter(n => {
        return visibleDirection(x,y, n[0], n[1], ourHeight);
        //console.log("----", {n, result});
        //return [n[2], result];
    }).length;
}
let count = 0;
for (let x = 1; x < width-1; x++) {
    let row = [];
    for (let y = 1; y < height-1; y++) {
        if (visible(x,y) > 0) count++;
        row.push(visible(x,y) > 0 ? "X": " ");
    }
    console.log(row.join(""));
}
console.log(count);


//part 2

function scoreDirection(x,y, dirX, dirY, originalHeight)
{
    if (x == 1 || y == 1 || x == width-2 || y == height-2) {
        return 0;
    }

    let neighbour = get(x+dirX, y+dirY);
    //if (neighbour == 0) return true; //not sure why this was really needed but w/e
    
    if (neighbour >= originalHeight) {
        //console.log("stopped at tree", neighbour);
        return 1;
    }

    //console.log("checkvisible direction", { x, y, dirX, dirY, originalHeight, neighbour, result: neighbour < originalHeight });
    return 1 + scoreDirection(x+dirX, y+dirY, dirX, dirY, originalHeight);
}
function score(x, y)
{    
    let ourHeight = get(x,y);
    let scores = neighbours.map(n => {
        let result = scoreDirection(x,y, n[0], n[1], ourHeight);
        //console.log("----", {n, result});
        return [n[2], result];
    });

    return scores.map(s => s[1]).reduce((prev, curr) => prev*curr);
}


let allScores = [];
for (let x = 1; x < width-1; x++) {
    let row = [];
    for (let y = 1; y < height-1; y++) {
        row.push(score(x,y));
        allScores.push(score(x,y));
    }
    console.log(row.join(""));
}
console.log((allScores.sort((a,b) => b-a)));