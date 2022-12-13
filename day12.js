import * as fs from 'fs';
import aStar from 'a-star';
//BFS DUMB
import { bfs } from 'breadth-first-search';
import  { sortProperty }  from './utils.js';

const input = fs.readFileSync("day12.input").toString();

let startChar = "S".charCodeAt(0);
let endChar = "E".charCodeAt(0);

let maze = input.split("\n").map(l => l.split("").map(c => c.charCodeAt(0)));

//turn all the maze items into objects
let start = null;
let end = null;
maze = maze.map((line, y) => line.map(function(location, x)  {
    let obj = { 
        value:location, 
        x, 
        y, 
        isStart: location == startChar, 
        isEnd: location == endChar, 
        visited: false,
        onPath: false,
        letter:String.fromCharCode(location) 
    };
    if (location == startChar) { obj.value = "a".charCodeAt(0); start = obj; }
    if (location == endChar){ obj.value = "z".charCodeAt(0); end = obj; }
    return obj;
}));

let width = maze[0].length;
let height = maze.length;
function get(x,y)
{
    if (x >= 0 && x < width && y >= 0 && y < height)
    {
        return maze[y][x];
    }
    return null;
}

let neighbours = [
    [0,-1],//up
    [0,1],//down
    [1,0],//left
    [-1,0]//right
];
function getNeighbors(node)
{
    let neighbors = neighbours.map(n => get(node.x-n[0], node.y-n[1]))
        .filter(n => n != null && (n.value - node.value) <= 1) ;
neighbors.forEach(node => {
    node.visited = true; 
});
    return neighbors;
}
function getDistanceToEnd(node)
{
    return Math.abs(end.x-node.x) + Math.abs(end.y-node.y)
    //return 0.0001;
    return Math.sqrt(Math.pow(end.x-node.x,2)+Math.pow(end.y-node.y,2));
}

//A-STAR
let aStarOptions = {
    start,
    isEnd:function(node) { return node.isEnd },
    neighbor: getNeighbors,
    distance:(a,b) =>1,//b.value - a.value,//expecting this to change for part 2
    heuristic:(node) => 0,//getDistanceToEnd,
    hash: (node) => `${node.x},${node.y}`, 
    //                        ^ THIS LITTLE BASTARD HERE WAS THE PROBLEM
    //timeout:
};
let path = aStar(aStarOptions);
console.log({
    path, 
    //realPath:path.path.map(location => `${location.x}${location.y} ${String.fromCharCode(location.value)}\n`).join(""),
    length: path.path.length
});


//bfs dumb
/*
function dumb(node) { return `${node.x},${node.y}` }
let connections = [];
for (var y = 0; y < height; y++)
{
    for (var x = 0; x < width; x++)
    {
        let node = get(x,y);
        let neighbors = getNeighbors(node);
        neighbors.forEach(n => {
            connections.push({nodeOne:dumb(node), nodeTwo:dumb(n)});
        });
    }
}
let search = {nodeOne:dumb(start), nodeTwo:dumb(end)};

let path = bfs(connections, search);
console.log(path);
*/
  



//VISITED PATH
console.log(maze.map(line => line.map(node => node.visited ? node.letter : ".").join("")).join("\n"));

//PATH
path.path.forEach(node => {
    node.onPath = true;
});
console.log(maze.map(line => line.map(node => node.onPath ? node.letter : ".").join("")).join("\n"));

//part 2 (le brute force hehe)
let allAs = [start,  ...maze.flatMap(line => line.filter(node => node.letter == "a"))];
allAs.forEach(a => a.path=aStar(Object.assign(aStarOptions, {start:a})))
allAs = allAs.filter(node => node.path.status != "noPath")
allAs.forEach(a => a.pathLength = a.path.path.length-1);
sortProperty(allAs, a=>a.pathLength);
allAs.reverse();
console.log(allAs[0]);
