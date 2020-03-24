
const sudoku = require('sudoku');

let puzzle = sudoku.makepuzzle();
console.log(puzzle);

let solved = sudoku.solvepuzzle(puzzle);
console.log(solved);

const _ = require('underscore');
console.log(_.contains([1, 2, 3], 6));

const lion = require('lion-lib-prabutdr');
console.log(lion.add(1, 2));
console.log(lion.multiply(3, 4));