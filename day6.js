import * as fs from 'fs';

const input = fs.readFileSync("day6.input").toString();

let markerSize = 14; //for part 1, change to 4;

let signals = input.split("");
let last = signals.slice(0,markerSize);

let i = 0;
for (i = 4; i < signals.length; i++)
{
    last.shift();
    last.push(signals[i]);

    //let lastString = last.join("");

    let repeats = new Set(last);
    //console.log({lastString, repeats, size: repeats.size});
    
    if (repeats.size == markerSize) { i++; break; }
}

console.log(i);