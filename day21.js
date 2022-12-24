import * as fs from 'fs';
import * as utils from "./utils.js";

const input = fs.readFileSync("day21.input").toString();

let isPart2 = true;

class Node
{
    id = null;
    left = null;
    right = null;
    op = null;
    value = null;
    isRoot = false;
    parent = null;

    getValue() 
    {
        if (this.value != null)
        {
            //console.log("get value", this.id, this.value, "value");
            return this.value;
        }
        monkeys[this.left].parent = this;
        monkeys[this.right].parent = this;
        let leftValue = monkeys[this.left].getValue();
        let rightValue = monkeys[this.right].getValue();
        if (this.isRoot)
        {
            return leftValue == rightValue;
        }
        switch (this.op)
        {
            case "+":
                this.value = leftValue+rightValue;break;
            case "-":
                this.value = leftValue-rightValue;break;
            case "*":
                this.value = leftValue*rightValue;break;
            case "/":
                this.value = Math.ceil(leftValue/rightValue);break;

        }


        //console.log("get value", this.id, this.value, "result");
        return this.value;
    }
}

let monkeys = Object.fromEntries(input.split("\n").map(monkey => monkey.split(": ")).map(function(pair) { 
    let monkey = new Node();
    monkey.id = pair[0];
    if (pair[1].indexOf(" ") == -1)
    {
        monkey.value = parseInt(pair[1]);
    }
    else
    {
        let split = pair[1].split(" + ");
        if (split.length == 1) split = pair[1].split(" - ");
        if (split.length == 1) split = pair[1].split(" * ");
        if (split.length == 1) split = pair[1].split(" / ");
        if (split.length == 1) console.error("invalid monkey", pair[1]);

        monkey.left = split[0];
        monkey.right = split[1];

        split = pair[1].split(" ");
        monkey.op = split[1];
    }
    return [
        pair[0],
        monkey
    ];
}));
monkeys["root"].isRoot = true;

//maybe trace out the tree?
function find(monkey)
{
    console.log("find", monkey.id);
    if (monkey.id == "humn")
    {
        return [monkey];
    }
    if (monkey.left)
    {
        let search = find(monkeys[monkey.left]);
        if (search != null)
        {
            return [monkey, ...search];
        }
    }
    if (monkey.right)
    {
        let search = find(monkeys[monkey.right]);
        if (search != null)
        {
            return [monkey, ...search];
        }
    }
    return null;
}
console.log({find:find(monkeys["root"])});
/*

//set the value for "humn"
//brute for this shiz
let max = 1000000000000;
let logStep = 10000000;
for (var i = 0; i < max; i++)
{
    let m = monkeys["humn"];
    while(m != null)
    {
        m.value = null;
        m = m.parent;
    }
    monkeys["humn"].value = i;
    let result = monkeys["root"].getValue();
    if (result)  console.log("\n\n",{result, value:monkeys["humn"].value},"\n\n");

    if (i % logStep == 0) console.log({i, perc: i/max});
}*/