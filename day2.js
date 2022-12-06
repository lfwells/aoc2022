import * as fs from 'fs';

const input = fs.readFileSync("day2.input").toString();

let games = input.split("\n").map(g => g.split(" "));

const scores = {
    A:1,//rock
    B:2,//paper
    C:3,//scissors
    X:1,//rock
    Y:2,//paper
    Z:3 //scissors
};

function outcome(them, us)
{
    switch (them)
    {
        case "A":
            switch(us)
            {
                case "X": return 3;//ugh i see a pattern here
                case "Y": return 6;
                case "Z": return 0;
            }
        case "B":
            switch(us)
            {
                case "X": return 0;
                case "Y": return 3;
                case "Z": return 6;
            }

        case "C":
            switch(us)
            {
                case "X": return 6;
                case "Y": return 0;
                case "Z": return 3;
            }
    }
}

let allOutcomes = games.map(g => outcome(g[0], g[1]) + scores[g[1]]);

//part 1
console.log(allOutcomes.reduce((prev,curr) => prev+curr));

//part 2
let outcomeScores = {
    "X":0,
    "Y":3,
    "Z":6
}
function neededMove(them, outcome)
{
    switch (them)
    {
        case "A":
            switch(outcome)
            {
                case "X": return "C";
                case "Y": return "A";
                case "Z": return "B";
            }

        case "B":
            switch(outcome)
            {
                case "X": return "A";
                case "Y": return "B";
                case "Z": return "C";
            }

        case "C":
            switch(outcome)
            {
                case "X": return "B";
                case "Y": return "C";
                case "Z": return "A";
            }

    }
}


let allOutcomes2 = games.map(function(g) 
{
    let move = neededMove(g[0], g[1]);
    return outcomeScores[g[1]] + scores[move];
});


//part 2
console.log(allOutcomes2.reduce((prev,curr) => prev+curr));