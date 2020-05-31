// Spread operator in method example
/*
function sumAll(arr) {
    return arr.reduce((acc, current) => acc + current, 0);
}

const arr = [1, 2, 3, 4, 5];

console.log(sumAll(arr)); // 15

function sumAll(...arr: number[]) {
    return arr.reduce((acc, current) => acc + current, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15
*/
/***************************************/

// Spread operator in array example
/*
const arr1 = [1];
const newArr1 = [...arr1];
const arr2 = [2];
const arr3 = [3];
const arr4 = [...arr1, ...arr2, ...arr3];
console.log(arr4);
*/
/***************************************/

// Destructuring
/*
const arr = [1, 2];
const [one, two] = arr;
console.log(one, two);

function f([one, two]: number[]) {
    console.log(one, two);
}

f(arr);
*/
/***************************************/

// Apply
/*
function f(...arr: any[]) {console.log(arr);}

f.apply(null, [1,2,3]); // [1,2,3]
*/
/***************************************/
