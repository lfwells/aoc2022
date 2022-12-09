import * as fs from 'fs';

const input = fs.readFileSync("day9.input").toString();

let moves = input.split("\n").map(l => l.split(" "));

let actions = {
    R: [1,0],
    U: [0, -1],
    L: [-1, 0],
    D: [0, 1]
};

let ropeSize = 10;

let heads = [];
for (var i = 0; i < ropeSize; i++)
    heads.push([0,0]);
    
let tail = [0,0];//part 1

let tailPositions = {};//part 1

function moveHead(action)
{
    let head = heads[0];
    let delta = actions[action];
    head[0] += delta[0];
    head[1] += delta[1];
}

function moveTail(index)
{
    let head = heads[index-1];
    let tail = heads[index];
    if (head[0] - tail[0] >= 2 && head[1] == tail[1])
    {
        tail[0]++;
    }
    else if (head[1] - tail[1] >= 2 && head[0] == tail[0])
    {
        tail[1]++;
    }
    else if (tail[0] - head[0] >= 2 && head[1] == tail[1])
    {
        tail[0]--;
    }
    else if (tail[1] - head[1] >= 2 && head[0] == tail[0])
    {
        tail[1]--;
    }
    else if (tail[0] != head[0] && tail[1] != head[1] && (Math.abs(tail[0]-head[0]) > 1  || Math.abs(tail[1]-head[1]) > 1))
    {
        tail[0] += Math.sign(head[0] - tail[0]);
        tail[1] += Math.sign(head[1] - tail[1]);
    }

    if (index == 9)
    {
        let key = `${tail[0]}-${tail[1]}`;
        if (tailPositions[key] == undefined)
            tailPositions[key] = 0;
        tailPositions[key]++;
    }
}

function parseMove(action, count)
{
    console.log(`== ${action} ${count} ==`);
    for (let i = 0; i < count; i++) {
        moveHead(action);
        for (var h = 1; h < heads.length; h++)
        {
            moveTail(h);  
        }
        printMap();
        console.log("\n");  
    }
}

moves.forEach(m => parseMove(m[0], m[1]));

//part 1 (36 mins inc. nappy change lol)
let part1 = Object.keys(tailPositions).length;
console.log({part1});

for (var y = -4; y <= 0; y++)
{
    let line = [];
    for (var x = 0; x <= 5; x++)
    {
        if (tailPositions[`${x}-${y}`] == undefined)
            line.push(".");
        else
            line.push("#");
    }
    console.log(line.join(""));
}

function printMap()
{
    console.log("");
for (var y = -4; y <= 0; y++)
{
    let line = [];
    for (var x = 0; x < 5; x++)
    {
        let char = ".";
        for (var h = 0; h < heads.length; h++)
        {
            let head = heads[h];
            if (head[0] == x && head[1] == y)
            {
                char = h == 0 ? "H" : h == heads.length-1 ? "T" : h;
                break;
            }
        }
        line.push(char);
    }
    console.log(line.join(""));
}
}

//testing some cases
/*
console.log("\n\n---testing down");
head = [1,-4];
tail = [2,-4];
printMap();
moveHead("D");
moveTail();
printMap();
*/