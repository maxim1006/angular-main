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
        //         return (sum += sumObj(o.a));
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

// На входе массив
// var arr = [
//     {name: 'width', value: 10},
//     {name: 'height', value: 20}
// ];
// На выходе объект {width: 10, height: 20}
function convertToObject(arr) {
    const obj = {};

    arr.forEach(({ name, value }) => {
        obj[name] = value;
    });

    return obj;
}

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
