import * as fs from 'fs';
import * as utils from "./utils.js";

const isPart2 = true;

const input = fs.readFileSync("day15.input").toString();

function distance(x1,x2,y1,y2)
{
    return Math.abs(x1-x2)+Math.abs(y1-y2)
}

let sensors = input.split("\n").map(line => line
    .replace("Sensor at ", "")
    .replace(" closest beacon is at ", "")
    .replaceAll("x=", "")
    .replaceAll("y=", "")
    .split(":").map(pair => utils.parseInts(pair.split(", ")))
);

let minX = Number.MAX_SAFE_INTEGER;
let minY = Number.MAX_SAFE_INTEGER;
let maxX = Number.MIN_SAFE_INTEGER;
let maxY = Number.MIN_SAFE_INTEGER;
let sensorInfos = sensors.map(function(sensorInfo) 
{
    let x = sensorInfo[0][0];
    let y = sensorInfo[0][1];
    let beaconX = sensorInfo[1][0];
    let beaconY = sensorInfo[1][1]; 
    
    let radius = distance(x,beaconX,y,beaconY);

    minX = Math.min(minX, x-radius);
    minY = Math.min(minY, y-radius);
    maxX = Math.max(maxX, x+radius);
    maxY = Math.max(maxY, y+radius);
    
    return {
        x,
        y,
        beaconX,
        beaconY,
        radius
    }
});

if (!isPart2)
{
    minY = 2000000; // or 10 when using test data
    maxY = minY;


    let counts = [];
    for (var y = minY; y <= maxY; y++)
    {
        let testY = y;
        let count = 0;
        let foundX = 0;
        for (var x = minX; x <= maxX; x++)
        {
            let close = false;
            for (var i = 0; i < sensorInfos.length; i++)
            {
                let sensor = sensorInfos[i];
                //first check if a beacon
                if (distance(x, sensor.beaconX, testY, sensor.beaconY) > 0)
                {
                    //then check if its within range of sensor
                    let d = distance(x, sensor.x, testY,sensor.y);
                    if (d <= sensor.radius && d != 0) 
                    {
                        close = true;
                        //console.log({x,y:testY,d, r:sensor.radius, i});
                        break;
                    }
                    else if (isPart2 && d == 0)
                    {
                        close = true;
                        break;
                    }
                }
                else
                {
                    close = true;
                    break;
                }
            }
            if (!isPart2)
            {
                if (close) count++;
            }
            else
            {
                if (!close) {
                    count++;
                    foundX= x;
                }
            }
        }
        if (!isPart2 || count > 0)
            counts.push({foundX, y,count});

        if (y % 1000 == 0)
            console.log({y, perc:y/4000000});
    }
    counts.sort((a,b) => b.count-a.count);
    console.log({counts, part2:BigInt(counts[0].foundX)*BigInt(4000000) + BigInt(counts[0].y)});
}
else
{
    //part 2
    //find the outer edges of a circle?
    minX = 0; maxX = 4000000;
    minY = 0; maxY = 4000000;
    let testMap = [];
    for (var y = -5; y <= 25; y++)
    {
        let line = [];
        for (var x = -5; x <= 25; x++)
        {
            line.push(".");
        }
        testMap.push(line);
    }
    function testPoint(x,y,sensor)
    {
        console.log({x,y});
        return distance(x,sensor.x,y,sensor.y) <= sensor.radius;
    }
    let pointsToTest = [];
    sensorInfos.forEach((sensor, i) => 
    {
        console.log("doing sensor", i, "of", sensorInfos.length, "points to test length: ", pointsToTest.length);
        for (var dy = -sensor.radius-1; dy <= sensor.radius+1; dy++)
        {
            let yVal = Math.abs(dy);
            let dx = 0; let x = 0; let y = 0;
            /*
            //#
            let dx = -yVal+sensor.radius;
            let x = sensor.x + dx;
            let y = sensor.y + dy;
            testMap[y][x] = testPoint(x,y,sensor) ? "#" : "!";

            //#
            dx = yVal-sensor.radius;
            x = sensor.x + dx;
            y = sensor.y + dy;
            testMap[y][x] = testPoint(x,y,sensor) ? "#" : "!";*/
            
            //!
            dx = -yVal+sensor.radius;
            x = sensor.x + dx + 1;
            y = sensor.y + dy;
            if (x >= minX && x <= maxX && y >= minY && y <= maxY)
            {
                pointsToTest.push([x,y]);
            }
            //testMap[y][x] = testPoint(x,y,sensor) ? "#" : "!";
            
            //!
            dx = yVal-sensor.radius;
            x = sensor.x + dx - 1;
            y = sensor.y + dy;
            //testMap[y][x] = testPoint(x,y,sensor) ? "#" : "!";
            if (x >= minX && x <= maxX && y >= minY && y <= maxY)
            {
                pointsToTest.push([x,y]);
            }
        }
    });
    console.log(pointsToTest.length);
    //console.log(testMap.map(line => line.join("")).join("\n"));
    let validPoints = []
    console.log(pointsToTest.forEach( function (point, i)  {
        if (i % 100000 == 0) console.log("testing point", i, "of", pointsToTest.length, Number(i)/Number(pointsToTest.length), "%", validPoints);
        let result = sensorInfos.every(sensor => distance(point[0], sensor.x, point[1], sensor.y) > sensor.radius);
        if (result)
            validPoints.push(point);
    }));
    console.log({part2:BigInt(validPoints[0][0]) * BigInt(4000000) + BigInt(validPoints[0][1])});
}