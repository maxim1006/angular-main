// typeof - могу использовать для задания четкого типа
/*
const person = {
    name: 'Max',
    age: 30
};

type Person = typeof person;

const me: Person = {
    name: 'Max',
    age: 30
};

const wife: Person = {
    name: 'Aliya',
    age: 31
};

const dog: typeof person = {
    name: 'fluffy',
    age: 5
};
*/
/***************************************/



// keyof
/*
const person = {
    name: 'Max',
    age: 30
};

type Person = typeof person; // создает что-то вроде интерфейса Person, те {name: string, age, number}
type PersonKeys = keyof Person; // создает "name" | "age", причем надо указать конкретно значения name или age
type PersonTypes = Person[PersonKeys]; // string | number - могу указать теперь эти типы, смотри пример ниже

const string1: PersonKeys = 'name';
const string: PersonTypes = 'name';
const number: PersonTypes = 123;
*/

// const me: Person = {
//     name: 'Max',
//     age: 30
// };
//
// const wife: Person = {
//     name: 'Aliya',
//     age: 31
// };
//
// const dog: typeof person = {
//     name: 'fluffy',
//     age: 5
// };

/***************************************/

