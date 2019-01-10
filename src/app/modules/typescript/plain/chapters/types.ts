// в этом случае переменная будет с типом any
let variable;

variable = 1;
variable = '1';
variable = true;

type numberOrString = number | string;

let a: numberOrString = 1;
a = 'a';

// тут будет ошибка
/*
    function f(a: 1 | 2| 3) {
        console.log(a);
    }

    f(4);
*/
///////////////////////////


// Type Assertions
// так могу превращать что угодно во что угодно
// type Pizza = {name: string, toppings: number};


// обернув в скобки ts сразу подсказывает нормально
// это новая запись
// function getPizza(pizza: Pizza): string {
//    return  (pizza as Pizza).name;
// }

// это старая запись
// function getPizza(pizza: Pizza): string {
//     return  (<Pizza>pizza).name;
// }
