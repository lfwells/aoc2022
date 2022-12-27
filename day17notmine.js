const isValid = (grid, tile, x, y) => {
  for (let ty = 0; ty < tile.length; ty++) {
    for (let tx = 0; tx < tile[ty].length; tx++) {
      if (tile[ty][tx] && (x + tx < 0 || x + tx > 6 || y + ty < 0 || grid[y + ty][x + tx])) {
        return false;
      }
    }
  }
  return true;
}

const getHighest = grid => {
  let highest = -1;
  for (highest = grid.length - 1; highest >= 0; highest--) {
    if (grid[highest].includes(1)) {
      break;
    }
  }
  return highest;
}

let target = 1000000000000;
import * as fs from 'fs';
const input = fs.readFileSync("day17.input").toString();
/*module.exports = (input, target) =>*/ {
  let grid = [];
  let tiles = [
    [[1, 1, 1, 1]],
    [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
    [[1, 1, 1], [0, 0, 1], [0, 0, 1]],
    [[1], [1], [1], [1]],
    [[1, 1], [1, 1]]
  ];

  let commands = [...input].map(c => c == '<' ? -1 : 1);

  let tile = 0;
  let command = 0;
  let states = new Map();

  let offsetHeight = 0;

  for (let stone = 0; stone < target; stone++) {
    let highest = getHighest(grid);
    let size = (highest + 8) - grid.length;

    for (let i = 0; i < size; i++) {
      grid.push([0, 0, 0, 0, 0, 0, 0]);
    }

    let px = 2;
    let py = highest + 4;

    while (true) {
      if (isValid(grid, tiles[tile], px + commands[command], py)) {
        px += commands[command];
      }

      command = (command + 1) % commands.length;

      if (isValid(grid, tiles[tile], px, py - 1)) {
        py -= 1;
      } else {
        break;
      }
    }

    for (let ty = 0; ty < tiles[tile].length; ty++) {
      for (let tx = 0; tx < tiles[tile][ty].length; tx++) {
        if (tiles[tile][ty][tx]) {
          grid[py + ty][px + tx] = 1;
        }
      }
    }

    tile = (tile + 1) % tiles.length;

    if (offsetHeight == 0) {
      let top = grid.slice(grid.length - 15).map(r => r.join(',')).join('#')
      let state = top + '#' + tile + '#' + command;
      let currHeight = getHighest(grid) + 1;

      if (states.get(state)) {
        let [prevStone, prevHeight] = states.get(state)
        let period = stone - prevStone;

        offsetHeight = (currHeight - prevHeight) * Math.floor((target - stone) / period);
        console.log({stone});
        stone = target - ((target - stone) % period)
        console.log({stone, period});
      } else {
        states.set(state, [stone, currHeight]);
      }
    }
  }

  console.log({part2: offsetHeight + getHighest(grid) + 1});
}