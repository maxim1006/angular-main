// запись метода в объекте
/*
let o = {
    m: function () {console.log(this)} // m
};


let o1 = {
    m() {console.log(this)} // m
};

let o2 = {
    m: () => {console.log(this)} // window
};

o.m(); o1.m(); o2.m();
*/
/*********************************/


// destructuring
/*
const obj = {
    prop1: 1,
    prop2: 2
};

function get({prop1: one, prop2: two}) {
    console.log(one);
    console.log(two);
    return {one, two};
}

const {one} = get(obj);
console.log(one);
*/
/*********************************/



