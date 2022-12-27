const UP = [[1, 0, 0], [0, 0, 1], [0, -1, 0]];
const DOWN = [[1, 0, 0], [0, 0, -1], [0, 1, 0]];
const LEFT = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]];
const RIGHT = [[0, 0, -1], [0, 1, 0], [1, 0, 0]];

const rotate = (cube, rot) => {
  let rotated = new Map();

  for (let key of cube.keys()) {
    let { value, x, y, z, px, py } = cube.get(key);
    let [cx, cy, cz] = mul([x, y, z], rotMatrix(rot));

    rotated.set(coords(cx, cy, cz), {
      value: value,
      x: cx,
      y: cy,
      z: cz,
      px: px,
      py: py
    });
  }
  return rotated;
}

const mul = (vec3, mat3) => {
  let res = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      res[i] += vec3[j] * mat3[j][i];
    }
  }
  return res;
}

const rotMatrix = rot => {
  switch (rot) { // 1 - UP, 2 - DOWN, 3 - LEFT, 4 - RIGHT
    case 1: return UP;
    case 2: return DOWN;
    case 3: return LEFT;
    case 4: return RIGHT;
  }
}

const coords = (x, y, z) => `${x}#${y}#${z}`;

const print = (cube, size, px, py) => {
  let rr = '';
  for (let dy = 0; dy < size; dy++) {
    for (let dx = 0; dx < size; dx++) {
      if (px == dx && py == dy) {
        rr += '@';
      } else {
        rr += get(cube, size, dx, dy).value;
      }
    }
    rr += '\n';
  }
  console.clear();
  console.log(rr);

}

const get = (cube, size, fx, fy) => {
  let offset = 0.5;
  let half = size / 2 + offset;

  let cx = fx - (half - 1);
  let cy = fy - (half - 1);
  let cz = half;

  return cube.get(coords(cx, cy, cz));
}

const eq = (s1, s2) => {
  for (let dy = 0; dy < s1.length; dy++) {
    for (let dx = 0; dx < s1.length; dx++) {
      if (s1[dy][dx] != s2[dy][dx]) {
        return false;
      }
    }
  }
  return true;
}

const rotLeft = side => {
  let res = new Array(side.length);
  for (let dy = 0; dy < side.length; dy++) {
    res[dy] = new Array(side.length);

    for (let dx = 0; dx < side.length; dx++) {
      res[dy][dx] = side[dx][side.length - 1 - dy];
    }
  }
  return res;
}

import * as fs from 'fs';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import * as utils from "./utils.js";

const input = fs.readFileSync("day22.input").toString();

{

  let lines = input.split(/\r?\n/);
  let instructionsRaw = lines[lines.length - 1]

  let size = lines.length > 50 ? 50 : 4;
  let offset = 0.5;
  let half = size / 2 + offset;

  let grid = lines.slice(0, lines.length - 2).map(r => [...r]);
  let maxWidth = Math.max(...grid.map(r => r.length));
  for (let row of grid) {
    if (row.length < maxWidth) {
      let diff = maxWidth - row.length
      for (let i = 0; i < diff; i++) {
        row.push(' ');
      }
    }
  }

  let cube = new Map();

  let pos = [grid[0].indexOf('.'), 0];
  let dir = [1, 0, 0];

  let x = pos[0];
  let y = 0;

  let stack = [{ r: 0, p: [x, y] }]; // 1 - UP, 2 - DOWN, 3 - LEFT, 4 - RIGHT
  let queue = [[pos, null, stack]];
  while (queue.length) {
    let [[px, py], prev, mid] = queue.pop();

    if (prev != 4 && px + size < maxWidth && grid[py][px + size] != ' ') {
      let m = [];
      mid.push({ r: 3, p: [px + size, py] });
      mid.push(m);
      mid.push({ r: 4 });
      queue.push([[px + size, py], 3, m]); // LEFT
    }

    if (prev != 3 && px - size >= 0 && grid[py][px - size] != ' ') {
      let m = [];
      mid.push({ r: 4, p: [px - size, py] });
      mid.push(m);
      mid.push({ r: 3 });
      queue.push([[px - size, py], 4, m]); // RIGHT
    }

    if (prev != 2 && py + size < grid.length && grid[py + size][px] != ' ') {
      let m = [];
      mid.push({ r: 1, p: [px, py + size] });
      mid.push(m);
      mid.push({ r: 2 });
      queue.push([[px, py + size], 1, m]); // UP
    }

    if (prev != 1 && py - size >= 0 && grid[py - size][px] != ' ') {
      let m = [];
      mid.push({ r: 2, p: [px, py - size] });
      mid.push(m);
      mid.push({ r: 1 });
      queue.push([[px, py - size], 2, m]);//DOWN
    }
  }

  const flat = list => Array.isArray(list) ? list.reduce((res, a) => [...res, ...flat(a)], []) : [list];
  let rots = flat(stack);

  while (rots.length) {
    let r = rots.shift();
    if (r.r) {
      cube = rotate(cube, r.r);
    }

    if (r.p == null) {
      continue;
    }

    let [x, y] = r.p;

    for (let dy = 0; dy < size; dy++) {
      for (let dx = 0; dx < size; dx++) {
        let cx = dx - (half - 1);
        let cy = dy - (half - 1);
        let cz = half;

        cube.set(coords(cx, cy, cz), {
          value: grid[y + dy][x + dx],
          x: cx,
          y: cy,
          z: cz,
          px: x + dx,
          py: y + dy
        });
      }
    }
  }

  let ip = 0;
  let curr = 0;
  let instructions = [];
  while (ip < instructionsRaw.length) {
    if (isNaN(instructionsRaw.charAt(ip))) {
      instructions.push(instructionsRaw.charAt(ip));
      ip++;
      curr = 0;
    } else {
      let num = '';
      while (ip + curr < instructionsRaw.length && !isNaN(instructionsRaw.charAt(ip + curr))) {
        num += instructionsRaw.charAt(ip + curr);
        curr++;
      }
      instructions.push(+num);
      ip += curr;
      curr = 0;
    }
  }

  pos = [0, 0];

  instructions = instructions.slice(0, 473);

  for (let instr of instructions) {
    console.log({instr});
    if (instr == 'L') {
      dir = [dir[1], -dir[0]];
    } else if (instr == 'R') {
      dir = [-dir[1], dir[0]];
    } else {
      for (let i = 0; i < instr; i++) {
        let rotated = cube;
        let [x, y] = [pos[0] + dir[0], pos[1] + dir[1]];
        if (dir[0] < 0) {
          if (x < 0) {
            rotated = rotate(cube, 4);
            x = size - 1;
          }
        } else if (dir[0] > 0) {
          if (x > size - 1) {
            rotated = rotate(cube, 3);
            x = 0;
          }
        } else if (dir[1] < 0) {
          if (y < 0) {
            y = size - 1;
            rotated = rotate(cube, 2);
          }
        } else if (dir[1] > 0) {
          if (y > size - 1) {
            y = 0;
            rotated = rotate(cube, 1);
          }
        }

        if (get(rotated, size, x, y).value == '.') {
          pos = [x, y];
          console.log({pos});
          cube = rotated;
        } else {
            console.log("break");
          break;
        }
      }
    }
  }
  let val = get(cube, size, pos[0], pos[1]);
  pos = [val.px, val.py];

  let sx = Math.floor(val.px / size) * size;
  let sy = Math.floor(val.py / size) * size;

  let side1 = [];
  let side2 = [];
  for (let dy = 0; dy < size; dy++) {
    side1.push([]);
    side2.push([]);
    for (let dx = 0; dx < size; dx++) {
      side1[dy].push(grid[sy + dy][sx + dx]);
      side2[dy].push(get(cube, size, dx, dy).value);
    }
  }

  while (!eq(side1, side2)) {
    side2 = rotLeft(side2);
    dir = [dir[1], -dir[0]];
  }

  let dd = 0;
  if (dir[0] == 1) {
    dd = 0;
  } else if (dir[0] == -1) {
    dd = 2;
  } else if (dir[1] == 1) {
    dd = 1;
  } else {
    dd = 3;
  }
  console.log({part2:1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dd});
}