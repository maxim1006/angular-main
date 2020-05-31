// Functions examples
/*
let sum: (num1: number, num2: number) => number;
sum = (x, y) => x + y;

let f: Function;

f = () => ({a: 1});

console.log(f());
*/

// Optional and default params
// дефолтные - либо параметр отсутствует, либо равен undefined, если
// использую пустую строку, ноль или null то параметр передан
/*
let sum: (num1: number, num2?: number) => number;
sum = (x, y = 2) => x + y;
console.log(sum(1));
*/
