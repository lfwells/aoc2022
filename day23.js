import * as fs from 'fs';
import * as utils from "./utils.js";

const input = fs.readFileSync("day23.input").toString();

class Elf
{
    x = 0;
    y = 0;
    firstPropose = 0;
    currentProposed = null;
    currentProposedPos = null;
    debugI = -1;
    str = "#";

    round1 = function()
    {
        this.str = "#";
        this.currentProposed = null;
        this.currentProposedPos = null;

        //todo: first check if we have NO neighbours
        let allNeighbours = Object.values(neighbours).map(n => this.doCheck(n)).filter(n => n == null).length;
        if (allNeighbours == 8) {
            //console.log("elf at",this.x,this.y,"no neighbours, dont move");
            return;
        }

        for (var i = this.firstPropose; i < this.firstPropose+proposals.length; i++)
        {
            this.debugI = i;
            let proposal = proposals[i % proposals.length];
            let result = proposal.check.some(proposal => this.doCheck(proposal));
            if (result == false)
            {
                this.str = i % proposals.length;
                this.currentProposed = proposal;
                this.currentProposedPos = [this.x + proposal.move[0], this.y + proposal.move[1]];
                break;
            }
        }
    }
    round2 = function()
    {
        if (this.currentProposedPos != null)
        {
            map[this.y][this.x] = null;
            this.x = this.currentProposedPos[0];
            this.y = this.currentProposedPos[1];
            map[this.y][this.x] = this;
        }
    }
    endRound = function()
    {
        this.str = "#";
        this.firstPropose = this.firstPropose+1;
    }
    doCheck = function(proposal)
    {
        return map[this.y + proposal[1]][this.x + proposal[0]];
    }
    toString = function()
    {
        return this.str;
    }
}

let neighbours = {
    n:[0,-1],
    ne:[1,-1],
    e:[1,0],
    se:[1,1],
    s:[0,1],
    sw:[-1,1],
    w:[-1,0],
    nw:[-1,-1]
}

let proposals = [
    {check:[neighbours.nw,neighbours.n,neighbours.ne], move: neighbours.n },
    {check:[neighbours.sw,neighbours.s,neighbours.se], move: neighbours.s },
    {check:[neighbours.nw,neighbours.w,neighbours.sw], move: neighbours.w },
    {check:[neighbours.ne,neighbours.e,neighbours.se], move: neighbours.e },
];

const OFFSET = 10000;
let elves = [];
let map = input.split("\n").map((line,y) => line.split("").map(function(place, x){
    if (place == "#")
    {
        let e = new Elf();
        e.x = x+OFFSET;
        e.y = y+OFFSET;
        elves.push(e);
        return e;
    }
    else return null;
} ));
const W = map[0].length;
map.forEach(line => { 
    for (var i = 0; i < OFFSET; i++) 
    {
        line.unshift(null); 
        line.push(null);
    }
});
for (var i = 0; i < OFFSET; i++) 
{
    let line = [];
    let line2 = [];
    for (var j = 0; j < OFFSET*2 + W; j++) 
    {
        line.push(null);
        line2.push(null);
    }
    map.unshift(line); 
    map.push(line2);
}

function getBounds()
{
    let minX = Math.min(...elves.map(e => e.x));
    let minY = Math.min(...elves.map(e => e.y));
    let maxX = Math.max(...elves.map(e => e.x));
    let maxY = Math.max(...elves.map(e => e.y));
    let topLeft = [minX, minY];
    let topRight = [maxX, minY];
    let bottomLeft = [minX, maxY];
    let bottomRight = [maxX, maxY];

    return { topLeft, topRight, bottomLeft, bottomRight, minX, minY, maxX, maxY };
}
function printMap()
{
    let bounds = getBounds();
    let toPrint = "";
    for (var y = bounds.minY; y <= bounds.maxY; y++)
    {
        for (var x = bounds.minX; x <= bounds.maxX; x++)
        {
            toPrint += map[y][x] == null ? "." : map[y][x].toString();
        }
        toPrint+="\n";
    }
    console.log(toPrint);
}
printMap();

for (var round = 0; round < 10000000; round++)
{
    console.log({round});
    elves.forEach(e => e.round1());
    //printMap();

    let proposedPositions = {};
    elves.forEach(e => {
        if (proposedPositions[e.currentProposedPos] == undefined)
            proposedPositions[e.currentProposedPos] = [];
        proposedPositions[e.currentProposedPos].push(e);
    });
    proposedPositions = Object.values(proposedPositions).filter(list => list.length == 1);
    proposedPositions.forEach(list => list.forEach(e => e.round2()));
    //console.log({proposedPositions});
    elves.forEach(e => e.endRound());

    //printMap();
    if (proposedPositions.length == 0)
        break;
}
printMap();

//part 1
let count = 0;
let bounds = getBounds();
let toPrint = "";
for (var y = bounds.minY; y <= bounds.maxY; y++)
{
    for (var x = bounds.minX; x <= bounds.maxX; x++)
    {
        count += map[y][x] == null ? 1 : 0;
    }
}
console.log({part1: count});
console.log({part2: round+1});