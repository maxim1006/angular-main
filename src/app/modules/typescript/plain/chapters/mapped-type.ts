// Readonly<T> - mapped interface example

// Object freeze - делает иммутабельными свойства объекта и их нельзя менять
// Object seal - делает невозможным добавление новых свойств
/**/
interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: "Max",
    age: 31,
};

// const frozePerson = Object.freeze(person);
// frozePerson.name = 'Aliya'; // ошибка, так как frozePerson имеет тип Readonly<Person>

// const sealedPerson = Object.seal(person);
// sealedPerson.name = 'Aliya'; // норм
// sealedPerson.occupation = 'accounting'; // ошибка

// const readonlyPerson: Readonly<Person> = {
//     name: 'Max',
//     age: 31
// };
//
// readonlyPerson.name = 'Aliya'; // ошибка

// функция для получения readonly объекта
// function freeze<T>(obj: T): Readonly<T> {
//     return Object.freeze(obj);
// }
//
// const readonlyByFreezPerson = freeze(person);

// проходимся по всем пропертям T и делаем их readonly
// type MyReadonly<T> = {
//     readonly [P in keyof T]: T[P]
// };
//
// const newReadonlyPerson: MyReadonly<Person> = {
//     name: 'Max',
//     age: 31
// };
//
// newReadonlyPerson.name = 'Aliya'; // ошибка
/////////////////////////////////////////////////

// Partial type (Partial<T>)
// обычно чтобы победить добавление проперти в существующий интерфейс мы делаем новый интерфейс с дублированием
// interface PartialPerson {
//     name: string;
//     age?: number;
// }
//
// function updatePerson(person: Person, prop: PartialPerson) {
//     return {...person, ...prop};
// }
//
// updatePerson(person, {name: 'Aliya'});

// есть выход, сделать все ключи опциональными через mapped type
// type MyPartial<T> = {
//     [P in keyof T]?: T[P]
// };
//
// function updatePerson(person: Person, prop: MyPartial<Person>) {
//     return {...person, ...prop};
// }
//
// updatePerson(person, {name: 'Aliya'});

// для этой операции есть встроенный mapped type - Partial
// function updatePerson(person: Person, prop: Partial<Person>) {
//     return {...person, ...prop};
// }
//
// updatePerson(person, {name: 'Aliya'});

// Required type (Required<T>)

// type MyRequired<T> = {
//     // [P in keyof T]+?: T[P] - ровно тоже самое что и [P in keyof T]?: T[P]
//     // +readonly [P in keyof T]+?: T[P] - добавляю свойствам ридонли
//     // -readonly [P in keyof T]+?: T[P] - удаляю из свойств ридонли
//     [P in keyof T]-?: T[P] // когда итерируется по свойствам объекта в случае если у них ?, т.е. они optional, удали знак вопроса
// };
//
// // function printName(person: MyRequired<Person>) {
// //     return `${person.name} ${person.age}`;
// // }
//
// // есть встроенный Required<T> mapped type
// function printName(person: Required<Person>) {
//     return `${person.name} ${person.age}`;
// }
//
//
// const printablePerson: Required<Person> = {name: 'Max', age: 31};
//
// printName(printablePerson); // должен еще передать age, даже несмотря на то что в оригинальном интерфейсе он optional

// Pick<T, K> - могу работать с отдельным свойством в интерфейсе, этим оно удобнее чем Partial
// interface PickedPerson {
//     name: string;
//     age: number;
//     address: string;
// }
//
// type MyPick<T, K extends keyof T> = {
//     // если P есть в K
//     [P in K]: T[P]
// };
//
// const pickablePerson: MyPick<PickedPerson, 'name' | 'age'> = {
//     name: 'Max',
//     age: 31,
// }; // ошибки не будет несмотря на то, что не указал address, могу навыбирать пропертей какие хочу.
//
// // есть встроенный тип
// const pickablePerson1: Pick<PickedPerson, 'name' | 'age'> = {
//     name: 'Max',
//     age: 31,
// };

// Record

// let dictionary: { [key: string]: any } = {}; // обычно так разрешаю добавлять любое свойство, но это не очень удобно.
const dictionary: Record<string, TrackStates> = {};
const dictionary1: Record<string, typeof item> = {}; // могу указать не конкретный интерфейс TrackStates как выше, а взять тип у item

interface TrackStates {
    current: string;
    next: string;
}

// говорю что item имеет свойства 'current' | 'next' которые равны строкам
const item: Record<keyof TrackStates, string> = {
    current: "id1",
    next: "id2",
};

// пример добавления записи в словарик
dictionary[0] = item;
dictionary1[0] = item;
