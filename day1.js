import * as fs from 'fs';

const input = fs.readFileSync("day1.input").toString();

//Original solution for this was effectively a one-liner
//I have expanded it out in this version to make it easier to read
//let elves = input.split("\n\n").map(e => e.split("\n").map(n => parseInt(n)).reduce((prev,curr) => prev+curr)).sort((a,b) => b-a);

//Each elf is denoted in the input by a an extra blank line, so split them by \n\n
let elves = input.split("\n\n");

//For each elf, calculate the sum of their things
let sums = elves.map(function(elf) 
{
    //get each of the values in an array, using split
    let values = elf.split("\n");
    
    //these values need to be turned into ints, so do that
    let intValues = values.map(n => parseInt(n));
    
    //now sum them together, using reduce
    //this is the most complicated part here, heres what happens:
    // reduce iterates over each element in the array, keeping a track of a running value of some kind, and returns that value
    // (i.e. it reduces the array down to a single value, in this case a sum)
    // the loop starts on the second element, with prev = the first element
    // each time through the loop, the result of the function is what prev is set to
    //    in this case the function is prev+curr
    // so for an array of sums like [ 5, 10, 2 ]
    // it would do this:    prev    curr    result (next prev)
    //                      5       10      5+10 = 15
    //                      15      2       15+2 = 17
    //                                              array reduced to 17
    let sum = intValues.reduce((prev,curr) => prev+curr);

    //return this sum for the map, so that each elf in the new `sums` array is the sum of its values
    return sum;
});

//to get the most valuable elf, we can sort these and return the top one
//(this approach makes part 2 easier, else we could just use Math.max)
//note the sorting function returns descending order, Google was my friend here
//because normal sort() is just alphabetical
let sortedSums = sums.sort((a,b) => b-a);
console.log(sortedSums); //log it for a sanity check

//part 1, first element in the array is the biggest
console.log({ topElf: sortedSums[0] });

//part 2, first three elements in the array are the biggest, lets just lazy add them together
//going for speed, no need to use a loop 0..2 here
console.log({ topThreeElfs: sortedSums[0]+sortedSums[1]+sortedSums[2] });