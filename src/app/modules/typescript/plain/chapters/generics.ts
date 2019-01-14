const obj = {
    name: 'Max',
    age: 30
};

// как пример превращения этой функции в функцию с generics
// function getProperty(obj: object, key: string) {
//     return obj[key];
// }
//
// getProperty(obj, 'name');

// K extends keyof T - K является сабтипом ключей объекта T
function getProperty<T, K extends keyof T>(obj: T , key?: K) {
    return obj[key];
}

const prop = getProperty(obj, 'name'); // если тут сделаю ошибку, например names вместо name, то ts подсветит теперь. Также ts подсветит, что prop это string
