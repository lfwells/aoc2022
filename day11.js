import * as fs from 'fs';

let isPart2 = true;

const input = fs.readFileSync("day11.input").toString();

class Monkey {
    items = [];
    operation = [];
    test = 0;
    testTrue = 0;
    testFalse = 0;

    inspectCount = 0;

    debug = false;

    inspectItems()
    {
        while (this.items.length > 0)
            this.inspect(this.items.shift());
    }
    inspect(item)
    {
        this.inspectCount++;

        if (this.debug) console.log(`\tMonkey inspects an item with a worry level of ${item}`);
        let old = item;
        let thisOp = [...this.operation];
        for (var i = 0; i < thisOp.length; i++)
        {
            if (thisOp[i] == "old")
                thisOp[i] = old;
            else if (["+", "-", "*", "/"].includes(thisOp[i]) == false)  
                thisOp[i] = BigInt(thisOp[i]);
        }
        let action = thisOp[1];
        switch (action)
        {
            case "+":
                item = thisOp[0] + thisOp[2]; 
                if (this.debug) console.log(`\t\tWorry level is increased by ${thisOp[2]} to ${item}`);
                break;
            case "-":
                item = thisOp[0] - thisOp[2]; break;
            case "*":
                item = thisOp[0] * thisOp[2]; 
                if (this.debug) console.log(`\t\tWorry level is multiplied by ${thisOp[2]} to ${item}`);
                break;
            case "/":
                item = thisOp[0] / thisOp[2]; break;
        }

        //magic part 2 stuff
        item = item % REDDIT_CHEATY_CHEATS;

        //divide by three 
        if (isPart2 == false)
        {
            item = Math.floor(item / 3);
            if (this.debug) console.log(`\t\tMonkey gets bored with item, Worry divided by 3 to ${item}`);
        }

        //test
        if (item % this.test == 0)
        {
            monkeys[this.testTrue].recieveItem(item);
        }
        else
        {
            if (this.debug) console.log(`\t\tCurrent worry level is not divisible by ${this.test}`);
            if (this.debug) console.log(`\t\tItem with worry level ${item} is thrown to monkey ${this.testFalse}`);
            monkeys[this.testFalse].recieveItem(item);
        }
    }
    recieveItem(item) {
        this.items.push(item);
    }
}

let monkeys = input.split("\n\n").map(function(m) {
    let info = m.split("\n").slice(1).map(l => l.split(": ")[1]);
    let monkey = new Monkey();
    monkey.items = info[0].split(", ").map(n => BigInt(n));
    monkey.operation = info[1].replace("new = ", "").split(" ");
    monkey.test = BigInt(info[2].replace("divisible by ", ""));
    monkey.testTrue = parseInt(info[3].replace("throw to monkey ", ""));
    monkey.testFalse = parseInt(info[4].replace("throw to monkey ", ""));
    return monkey;
});


//for part 2, ngl, went to reddit for help
//https://www.reddit.com/r/adventofcode/comments/zihouc/2022_day_11_part_2_might_need_to_borrow_a_nasa/
let REDDIT_CHEATY_CHEATS = monkeys.map(monkey => monkey.test).reduce((prev, curr) => prev*curr, BigInt(1));
console.log(REDDIT_CHEATY_CHEATS);

function printMonkeys()
{
    console.log(monkeys.map((m, i) => `Monkey ${i} (${m.inspectCount}):\t${m.items.join(", ")}`).join("\n"));
}
function printActiveMonkeys()
{
    console.log(monkeys.map((m, i) => `Monkey ${i} (${m.inspectCount})`).join("\n"));
}
printMonkeys();

let round = 0;
for (var i = 0; i < 10000; i++)
{
    monkeys.forEach((monkey,j) => {
        if (monkey.debug) console.log(`--Monkey ${j}--`);
        monkey.inspectItems() 
    } );
    round++;

    
    //printMonkeys();
    if (round % 1000 == 0 || round == 1 || round == 20) 
    {
        console.log("Round", i+1);
        printActiveMonkeys();
    }
}
let activeMonkeys = monkeys.map(m => m.inspectCount).sort((a,b) => b-a);
let part1 = activeMonkeys[0] * activeMonkeys[1];
console.log({part1});//and part2