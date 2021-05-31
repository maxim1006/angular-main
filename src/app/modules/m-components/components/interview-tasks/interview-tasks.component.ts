import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";

@Component({
    selector: "m-interview-tasks",
    templateUrl: "./interview-tasks.component.html",
    styleUrls: ["./interview-tasks.component.less"],
})
export class InterviewTasksComponent implements OnInit {
    ngOnInit() {
        // task
        // function sum(num) {
        //     let currentSum = num;
        //
        //     function f(arg) {
        //         currentSum += arg;
        //         return f;
        //     }
        //
        //     f.toString = () => {
        //         return currentSum;
        //     };
        //
        //     return f;
        // }
        //
        // console.log(sum(0)(1)(2)(3)(4)(5));
        // task
        // const initString = "ar2ya Jo3hn Deyne1ris";
        //
        // const matchAllString = initString["matchAll"](/\d/g);
        // for (const item of matchAllString) {
        //     // ["2", index: 2, input: "ar2ya Jo3hn Deyne1ris", groups: undefined]
        //     // ["3", index: 8, input: "ar2ya Jo3hn Deyne1ris", groups: undefined]
        //     // ["1", index: 17, input: "ar2ya Jo3hn Deyne1ris", groups: undefined]
        //     console.log(item);
        // }
        //
        // const arr = initString.split(" ").sort((a, b) => {
        //     const aNumber = +a.match(/\d/)[0];
        //     const bNumber = +b.match(/\d/)[0];
        //
        //     console.log(aNumber, bNumber);
        //
        //     return aNumber - bNumber;
        // });
        //
        // console.log(arr.join(" "));
        // task
        // const obj = {
        //     a: {
        //         num: 1,
        //         a: {
        //             num: 2,
        //             a: {
        //                 num: 3,
        //                 a: {
        //                     num: 4,
        //                 },
        //             },
        //         },
        //     },
        // };
        //
        // function sumObj(o) {
        //     let sum = 0;
        //
        //     if (o.a) {
        //         sum += o.a.num;
        //         sum += sumObj(o.a);
        //     }
        //
        //     return sum;
        // }
        // or
        // function sum(obj) {
        //
        //     let sum = 0;
        //
        //     while (obj.a) {
        //         sum += cur.a.num;
        //         obj.a = obj.a.a;
        //     }
        //
        //     return sum;
        // }
        //
        // console.log(sumObj(obj));
    }
}

// Дана строка, состоящая из букв A-Z:
// AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB
//
// Нужно написать функцию RLE, которая на выходе даст строку вида:
//     A4B3C2XYZD4E3F3A6B28
//
// И сгенерирует ошибку, если на вход пришла невалидная строка.
//     Пояснения:
// Если символ встречается 1 раз, он остается без изменений;
// Если символ повторяется более 1 раза, к нему добавляется количество повторений.
// console.log(RLE("ABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB"));  // "AB3C2XYZD4E3F3A6B28"

// function RLE(str) {
//     if (typeof str !== "string"
//         || !/[A-Z]/.test(str)) throw "Not valid argument!";
//
//     let previousSymbol = str[0];
//     let result = '';
//     let counter = 0;
//
//     for (let i = 0; i <= str.length; i++) {
//         if (previousSymbol !== str[i]) {
//             result += previousSymbol + (counter > 1 ? counter : "");
//             previousSymbol = str[i];
//             counter = 1;
//         } else {
//             counter++;
//         }
//     }
//
//     return result;
// }
//
// console.log(RLE("ABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB"));  // "AB3C2XYZD4E3F3A6B28"

// На входе массив
var arr = [
    { name: "width", value: 10 },
    { name: "height", value: 20 },
];
// На выходе объект {width: 10, height: 20}
function convertToObject(arr) {
    const obj = {};

    arr.forEach(({ name, value }) => {
        obj[name] = value;
    });

    return obj;
}

// function convertToObject(arr) {
//     const obj = {};
//
//     for (let i = 0; i < arr.length; i++) {
//         const {name, value} = arr[i];
//         obj[name] = value;
//     }
//
//     return obj;
// }

// function convertToObject(arr) {
//     const obj = {};
//
//     for (let {name, value} of arr) {
//         obj[name] = value;
//     }
//
//     return obj;
// }

// function convertToObject(arr) {
//     return arr.reduce((acc, item) => ({...acc, [item.name]: item.value}), {});
// }

// var i = 10;
// var array = [];
//
//
// while (i--) {
//     array.push(function() {
//         return i + i;
//     });
// }

let i = 10;
const array = [];

// while (i--) {
//     ((i) => {
//         array.push(function() {
//             return i + i;
//         });
//     })(i);
// }

while (i--) {
    const currentI = i;

    array.push(function () {
        return currentI + currentI;
    });
}

// console.log(array[0](), array[1]());

// Задача на микротаски и макротаски
function inNextTick(): Observable<void> {
    const timer = new Subject<void>();
    Promise.resolve().then(() => timer.next());
    return timer.pipe(take(1));
}

console.log(1);
Promise.resolve("resolve").then(a => console.log(a));

// eslint-disable-next-line rxjs/no-ignored-subscription
inNextTick().subscribe(() => {
    console.log("tick");
    // также тут не забыть вызвать this.cdr.markForCheck();
});

requestAnimationFrame(() => console.log("raf"));
console.log(2);
setTimeout(() => console.log("setTimeout"), 0);

// 1 затем 2 затем resolve, tick, raf, затем setTimeout

// debounce, throttle
// document.addEventListener("mousemove", debounce(() => {
//     console.log(123);
// }, 1000));
//
// function throttle(f, t) {
//     let id;
//
//     return function (...args) {
//         if (!id) {
//             id = setTimeout(() => {
//                 id = null;
//                 console.log(this);
//                 f.apply(this, args);
//             }, t);
//         }
//     };
// }
//
// function debounce(f, t) {
//     let id;
//
//     return function(...args) {
//         clearTimeout(id);
//         id = setTimeout(f, t, ...args);
//     }
// }
//
// document.onmousemove = debounce((...args) => console.log(...args), 1000);

/////////// Task
var book1, book2;

// 1
function Book(_name) {
    this.name = _name;
}

// 2
Book.prototype.getName = function () {
    return this.name;
};
Book.prototype.getUpperName = function () {
    return this.getName().toLowerCase();
};

// 3
book1 = new Book("JavaScript with Promises"); // book = {name: 'JavaScript with Promises'}; book.__proto__ = {getName, getUpperName}

// 4
Book.prototype.getUpperName = function () {
    return this.getName().toUpperCase();
};

// 5
Book.prototype = {
    getName: function () {
        return '"' + this.name + '"';
    },
};

// 6
book2 = new Book("JavaScript: The Definitive Guide, 6th Edition");

// 7
// console.log(book1.getName()); // "JavaScript with Promises"
// console.log(book1.getUpperName()); // upperCase
// console.log(book2.getName()); // "JavaScript: The Definitive Guide, 6th Edition"
// console.log(book2.getUpperName()); // error

/////////// Task
/**
 * Нужно написать функцию get. На вход функция принимает объект и путь до поля объекта.
 * Путь – это строка, разделенная точкой. Функция должна вернуть соответствующее поле объекта.
 * Запрашиваемого поля в объекте может не быть.
 */

function get(obj, path) {
    const pathArray = path.split(".");
    let result = obj;

    for (let i = 0; i < pathArray.length; i++) {
        if (typeof result[pathArray[i]] === "undefined") return;
        result = result[pathArray[i]];
    }

    return result;
}

const obj = {
    a: {
        b: {
            c: "d",
        },
        e: "f",
    },
};

console.log(get(obj, "a.b")); // { c : 'd' }
console.log(get(obj, "a.b.c")); // 'd'
console.log(get(obj, "a.e")); // 'f'
console.log(get(obj, "a.x.e")); // undefined

/**
 * Необходимо написать функцию, которая на вход принимает урл,
 * асинхронно ходит по этому урлу GET запросом и возвращает данные (json).
 * Для получении данных можно использовать $.get или fetch.
 * Если во время запроса произошла ошибка, то пробовать запросить ещё 5 раз.
 * Если в итоге информацию получить не удалось, вернуть ошибку "Заданный URL недоступен".
 */
// function get(url) {
//     return privateGet(url, 0);
// }
//
// function privateGet(url, attempt){
//     return fetch(url).catch(()=>{
//         if (attempt === 5) {
//             throw "Заданный URL недоступен";
//         } else {
//             return privateGet(url, attempt+1);
//         }
//     });
// }
//
// get(url)
//     .then(res => console.log(res))
//     .catch(err => console.error(err))

/**
 * Есть функция и объект. Необходимо, чтобы функция в консоли вывела значение 'yandex'.
 * Как добиться желаемого, не изменяя тело функции?
 */
// function f() { console.log(this.x); }
// var obj = {x: 'yandex'};
//
//
// const a = f.bind(obj);
//
//
// a();

///////////////////////////////////////////////////////////////////// Task
// function retry(attempts) {...}

// const promises = [
//     delay(50).then(() => 42),
//     delay(75).then(() => { throw 'nope'; })
// ];
//
// function getResult(promises) {
//     return Promise.all(promises.map((promise)=>{
//         return promise.then((v) => {
//             return {status: "resolved", "value": v};
//         }).catch((e)=>{
//             return {"status": "rejected", "value": e};
//         })
//     }));
//     // return Promise.resolve([{"status": "resolved", "value": 42}, {"status": "rejected", "reason": "nope"}]);
// }

// function getResult(promises) {
//     return Promise.all(
//         promises.map(async item => {
//             try {
//                 const value = await item;
//                 return { status: "resolved", value };
//             } catch (e) {
//                 return { status: "rejected", reason: e };
//             }
//         })
//     );
//     // return Promise.resolve([{"status": "resolved", "value": 42}, {"status": "rejected", "reason": "nope"}]);
// }
// const getResult = promises =>
//     Promise.all(
//         promises.map(item =>
//             item.then(
//                 value => ({ status: "resolved", value }),
//                 e => ({ status: "rejected", reason: e })
//             )
//         )
//     );
//
// getResult(promises).then((e) => console.log(e));
///////////////////////////////////////////////////////////////////// End

///////////////////////////////////////////////////////////////////// Task
// Дан набор отрезков - пожалуйста напишите функцию convert() которая объеденяет вхождения
// const input = [
//     [ 1,  3  ],
//     [ 12, 16 ],
//     [ 9,  15 ],
//     [ 4,  4  ],
//     [ 18, 18 ],
//     [ 8,  11 ],
// ]
//
// =>
//
// const output = [
//     [ 1,   4 ]
//     [ 8,  16 ]
//     [ 18, 18 ]
// ]

function convert(input) {
    if (!input.length) {
        return input;
    }
    const sorted = input.sort((a, b) => a[0] - b[0]);
    const result = [sorted[0]];
    let j = 0;
    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i];
        if (current[0] <= result[j][1] + 1) {
            //пересечение
            result[j] = [result[j][0], Math.max(result[j][1], current[1])];
        } else {
            //нет пересечения
            j++;
            result[j] = current;
        }
    }
    return result;
}

///////////////////////// deep copy

const str = "....";

const val = JSON.parse(str);

function deepCopy(val) {
    if (Array.isArray(val)) {
        return val.map(i => deepCopy(i));
    }

    // null, undefined
    if (val == null) return val;

    if (typeof val === "object") {
        const result = {};
        for (let i in val) {
            if (val.hasOwnProperty(i)) {
                result[i] = deepCopy(val[i]);
            }
        }
        return result;
    }

    return val;
}

JSON.stringify({ a: undefined }); // {}

////////////////////////////
////////////////////////////
// // Goods
const goods = [
    { model: "iPhone", color: "black", memory: 64 },
    { model: "iPhone", color: "white" },
    { model: "iPhone", color: "silver" },
    { model: "macBook", color: "silver" },
    { model: "iPod", abc: 0 },
];
//
// // Filters
const filters = [
    { key: "color", value: "silver" },
    { key: "abc", value: 0 },
    { key: "model", value: "macBook" },
];
//
// // Expected output
const result = [
    { model: "iPhone", color: "black", memory: 64 },
    { model: "iPhone", color: "white" },
];
//
// function filterProducts(goods, filters) {
//     return goods.filter(item => {
//         let accepted = true;
//
//         filters.forEach(({ key, value }) => {
//             if (typeof item[key] !== "undefined" && item[key] === value) {
//                 accepted = false;
//             }
//         });
//
//         return accepted;
//     });
// }

const filterProducts = (goods, filters) => goods.filter(good => !filters.some(({ key, value }) => good[key] === value));
